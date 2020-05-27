import * as Phaser from 'phaser';
import WebfontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { GameScene } from './game/game-scene';
import { BootScene } from './game/boot-scene';
import { DialogueScene } from './game/dialogue-scene';

declare const DEBUG: boolean;

const physicsDebug: boolean = false;

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

let game: Phaser.Game;

export function newGame(options: {doneDomElem?: HTMLElement, parent?: string, playerProfile?: Object} = {playerProfile: {}}) {

    gameConfig.scale.parent = options.parent ? options.parent : gameConfig.scale.parent;
    game = new Phaser.Game(gameConfig);
    let playerProfile = options.playerProfile ? options.playerProfile : {};

    game.registry.set("doneDomElem", options.doneDomElem);
    game.registry.set("playerType", playerProfile);
    game.input.enabled = true;
}

export function endGame() {
    //game.destroy(false);
    game.input.enabled = false;
}

export function getLogs(): string[] {
    
    if(game) {
        let logs: string[] = game.registry.get("logs");
        if(!logs) {
            return [];
        }
        return logs;
    }

    return [];
}