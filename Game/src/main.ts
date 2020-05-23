import * as Phaser from 'phaser';
import WebfontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { GameScene } from './game/game-scene';
import { DialogueScene } from './game/dialogue-scene';
import { BootScene } from './game/boot-scene';

declare const DEBUG: boolean;
const physicsDebug: boolean = false;

const playerType = {
    anger: 4,
    disgust: 4,
    fear: 5,
    anxiety: 10,
    sadness: 8,
    desire: 14,
    relaxation: 6,
    happiness: 10
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
            debug: DEBUG && physicsDebug,
        }
    },
    scene: [
        BootScene,
        GameScene,
        DialogueScene
    ],
    plugins: {
        scene: [
            {
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            }
        ],
        global: [
            {
                key: 'rexWebfontLoader',
                plugin: WebfontLoaderPlugin,
                start: true
            },
        ]
    }
}

export function newGame(options: {doneDomElem?: HTMLElement, parent?: string, playerProfile?: Object} = {}) {

    if(!options.playerProfile) options.playerProfile = playerType;

    gameConfig.scale.parent = options.parent ? options.parent : gameConfig.scale.parent;
    let game: Phaser.Game = new Phaser.Game(gameConfig);

    game.registry.set("doneDomElem", options.doneDomElem);
    game.registry.set("playerType", options.playerProfile);
}