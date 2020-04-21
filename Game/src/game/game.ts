import * as Phaser from 'phaser';
import { StoryManager } from '../utils/story-manager';
import { IScene } from '../utils/interfaces';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Game',
};

export class Game extends Phaser.Scene {

    private player: Phaser.GameObjects.Sprite;
    private map: Phaser.Tilemaps.Tilemap;
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
        this.map = this.initMap(currScene);
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
    
}