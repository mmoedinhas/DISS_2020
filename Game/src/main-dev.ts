import * as Phaser from 'phaser';
import { storyId, BootScene } from './game/boot-scene';
import WebfontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { GameScene } from './game/game-scene';
import { DialogueScene } from './game/dialogue-scene';
import * as querystring from 'querystring';

declare const DEBUG: boolean;
declare const STORYVIEWER_URL: string;

const debugUrl: string = STORYVIEWER_URL + "/debug";
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

const debugButton: HTMLInputElement = document.getElementById('storyViewLink') as HTMLInputElement;

debugButton.onclick = function () {
    let linkToStoryViewer: HTMLElement = document.getElementById("linkToStoryViewer");
    let queryString: string = '?' + querystring.stringify({ id: storyId })
    linkToStoryViewer.setAttribute("href", debugUrl + queryString);
    linkToStoryViewer.click();
}

let game: Phaser.Game;

export function newGame(options: {doneDomElem?: HTMLElement, parent?: string, playerProfile?: Object} = {playerProfile: {}}) {

    gameConfig.scale.parent = options.parent ? options.parent : gameConfig.scale.parent;
    game = new Phaser.Game(gameConfig);
    let playerProfile = options.playerProfile ? options.playerProfile : {};

    game.registry.set("doneDomElem", options.doneDomElem);
    game.registry.set("playerType", playerProfile);
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
