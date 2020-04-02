import * as Phaser from 'phaser';
import { WorldScene } from './world-scene';

const BootSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'BootScene',
};

export class BootScene extends Phaser.Scene {

    constructor() {
        super(BootSceneConfig);
    }

    public preload() {

    }

    public create() {
        this.scene.start('WorldScene');
    }
}

const renderConfig: Phaser.Types.Core.RenderConfig = {
    pixelArt: true,
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    render: renderConfig,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        BootScene,
        WorldScene
    ]
}

export const game = new Phaser.Game(gameConfig);