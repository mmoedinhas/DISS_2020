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

        // character tiles
        this.load.spritesheet('girls', 'assets/tileset/girls.png', { frameWidth: 39, frameHeight: 54 });
    }

    public create() {
        this.scene.start('DanceHallScene');
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    scale: {
        parent: 'content',
        mode: Phaser.Scale.FIT,
        width: 640,
        height: 360,
        min: {
            width: 320,
            height: 240
        },
        max: {
            width: 640,
            height: 360
        }
    },
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true,
        }
    },
    scene: [
        BootScene,
        DanceHallScene
    ]
}

export const game = new Phaser.Game(gameConfig);