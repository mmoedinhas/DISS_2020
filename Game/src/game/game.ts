import * as Phaser from 'phaser';
import { StoryManager } from './story-manager';
import { IScene, IEvent, IBodySpecs } from '../utils/interfaces';
import { Player } from './player';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Game',
};

export class Game extends Phaser.Scene {

    public player: Player;
    public map: Phaser.Tilemaps.Tilemap;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private storyManager: StoryManager; 
    private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];

    constructor() {
        super(config);
    }

    public init() {
        this.storyManager = this.registry.get('storyManager');
    }

    public create() {
        
        let currScene: IScene = this.storyManager.getCurrScene();
        let currEvent: IEvent = this.storyManager.getEventAt(0, 1);
        this.map = this.initMap(currScene);
        this.player = this.initPlayer(currEvent);

        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.roundPixels = true;
    }

    public update(time, delta) {

        
    }

    private initMap(currScene: IScene): Phaser.Tilemaps.Tilemap {
        
        let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({key: currScene.name});

        let tilesets: Phaser.Tilemaps.Tileset[] = [];

        for(let tilesetData of map.tilesets) {
            tilesets.push(map.addTilesetImage(tilesetData.name));
        }

        for(let layerData of map.layers) {

            let depth: number = (layerData.properties as Array<object>).find(i => i['name'] === 'depth')['value'];
            let collidable: boolean = (layerData.properties as Array<object>).find(i => i['name'] === 'collidable')['value'];

            let layer: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(layerData.name, tilesets).setDepth(depth);

            if(collidable) {
                layer.setCollisionByExclusion([-1]);
                this.obstacles.push(layer);
            }
        }

        return map;
    }

    private initPlayer(currEvent: IEvent): Player {

        let actorsObj = this.cache.json.get('actors');
        let eventObj = this.cache.json.get(currEvent.name);

        let actor = actorsObj.actors.find(actor => actor.id == eventObj.player.actorId);
        let x = eventObj.player.startPosition[0];
        let y = eventObj.player.startPosition[1];

        let bodySpecs: IBodySpecs = {
            width: actor.body.width,
            height: actor.body.height,
            anchor: actor.body.anchor
        };

        console.log(this.map.tileWidth);

        return new Player(this, this.map.tileWidth * x, this.map.tileHeight * y, actor.tilesetId, actor.defaultFrame, bodySpecs);
    }
    
}