import * as Phaser from 'phaser';
import { DanceHallScene } from './dance-hall-scene';

const BootSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'BootScene',
};

export class BootScene extends Phaser.Scene {

    constructor() {
        super(BootSceneConfig);
    }

    public preload() {
        // map tiles
        this.load.image('castle-tiles', 'assets/tileset/castle.png');
        this.load.image('stairs-tiles', 'assets/tileset/stairs.png');

        // map in json format
        this.load.tilemapTiledJSON('dance-hall-map', 'assets/map/dance_hall.json');
    }

    public create() {
        this.scene.start('DanceHallScene');
    }
}

const renderConfig: Phaser.Types.Core.RenderConfig = {
    pixelArt: true,
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 800,
    height: 800,
    zoom: 1,
    render: renderConfig,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        BootScene,
        DanceHallScene
    ]
}

export const game = new Phaser.Game(gameConfig);