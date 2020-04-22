import * as Phaser from 'phaser';
import { StoryManager } from './story-manager';
import { IScene, IEvent, IBodySpecs } from '../utils/interfaces';
import { isWebGLRenderer } from '../utils/type-predicates';
import { Player } from './player';
import { Vignette } from './shaders/pipeline.js';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Game',
};

export class Game extends Phaser.Scene {

    public player: Player;
    public map: Phaser.Tilemaps.Tilemap;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private storyManager: StoryManager; 
    private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];
    private vignette: Vignette;

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
        //this.player = this.initPlayer(currEvent);

        // if(isWebGLRenderer(this.game.renderer)) {
        //     this.vignette = this.game.renderer.addPipeline('Vignette', new Vignette(this.game));
        //     this.applyPipeline();
        // }
        

        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // this.cameras.main.startFollow(this.player.sprite);
        // this.cameras.main.roundPixels = true;
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

        return new Player(this, x, y, actor.tilesetId, actor.defaultFrame, bodySpecs);
    }

    private applyPipeline() {
        this.vignette.setFloat2('resolution', this.game.config.width, this.game.config.height);
        this.vignette.setFloat1('r',0.3);
        this.vignette.setFloat1('b',0.6);
        this.vignette.setFloat1('tx', 0.5);
        this.vignette.setFloat1('ty', 0.5);
        this.vignette.setFloat1('bright', 1.0);
        this.vignette.setFloat1('red', 1.0);
        this.vignette.setFloat1('green', 1.0);
        this.vignette.setFloat1('blue', 1.0);
        this.vignette.setFloat1('bgred', 1.0);
        this.vignette.setFloat1('bggreen', 1.0);
        this.vignette.setFloat1('bgblue', 1.0);
        this.cameras.main.setRenderToTexture(this.vignette);
    }
    
}