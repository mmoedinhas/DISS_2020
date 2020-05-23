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

export const gameConfig: Phaser.Types.Core.GameConfig = {
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

export function newGame(doneDomElem?: HTMLElement, parent?: string) {

    gameConfig.scale.parent = parent ? parent : gameConfig.scale.parent;
    let game: Phaser.Game = new Phaser.Game(gameConfig);

    game.registry.set("doneDomElem", doneDomElem);
}
