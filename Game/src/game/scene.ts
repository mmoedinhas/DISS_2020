import * as Phaser from 'phaser';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Scene',
};

export class Scene extends Phaser.Scene {

    private player: Phaser.GameObjects.Sprite;
    private map: Phaser.Tilemaps.Tilemap;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];

    constructor() {
        super(config);
    }

    public create() {
        
        
    }

    public update(time, delta) {

        
    }
    
}