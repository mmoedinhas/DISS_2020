import * as Phaser from 'phaser';
import { DanceHallScene } from './dance-hall-scene';
import { IPlayerType, IGraph, INode } from '../utils/interfaces';
import { StoryGraph } from '../utils/story-graph';

const BootSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'BootScene',
};

const playerType: IPlayerType = {
    anger: 4,
    disgust: 4,
    fear: 5,
    anxiety: 15,
    sadness: 8,
    desire: 14,
    relaxation: 6,
    happiness: 10
}

export class BootScene extends Phaser.Scene {

    constructor() {
        super(BootSceneConfig);
    }

    public preload() {

        // TODO gather all files to load them here
        this.load.json('overall_narrative', 'assets/story/overall_narrative.json');

        // // map tiles
        // this.load.image('castle-tiles', 'assets/tileset/castle.png');
        // this.load.image('stairs-tiles', 'assets/tileset/stairs.png');

        // // map in json format
        // this.load.tilemapTiledJSON('dance-hall-map', 'assets/map/dance_hall.json');

        // // character tiles
        // this.load.spritesheet('girls', 'assets/tileset/girls.png', { frameWidth: 39, frameHeight: 54 });
    }

    public create() {

        this.getStoryGraph().then((response) => {
            console.log(response['errors']);
            console.log(response['graph']);

            let storyGraph = new StoryGraph(response['graph'] as IGraph, playerType);
            this.registry.set('story-graph', storyGraph);

            let currScene: INode = (this.registry.get('story-graph') as StoryGraph).start();
            console.log(currScene);

            //this.scene.start('Scene');
        }).catch((response) => {
            console.log(response);
        })
    }

    private getStoryGraph(): Promise<Object> {
        let overallNarrativeObj = this.cache.json.get('overall_narrative');

        let request: XMLHttpRequest = new XMLHttpRequest();

        return new Promise<Object>(function (resolve, reject) {
            let url: string = "http://localhost:3000/json/";
            request.open("POST", url);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.responseType = 'json';
            request.send(JSON.stringify(overallNarrativeObj));

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    if (request.response['graph'] !== undefined) {
                        resolve(request.response);
                    } else {
                        reject(request.response);
                    }
                }
            }
        })
    }

    private loadFirstSceneAssets() {

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