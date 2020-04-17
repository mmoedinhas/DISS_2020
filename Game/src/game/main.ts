import * as Phaser from 'phaser';
import { DanceHallScene } from './dance-hall-scene';
import { IPlayerType, IStory } from '../utils/interfaces';
import { StoryManager } from '../utils/story-manager';
import * as paths from '../utils/paths';

const BootSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'BootScene',
};

const playerType: IPlayerType = {
    anger: 4,
    disgust: 4,
    fear: 5,
    anxiety: 4,
    sadness: 8,
    desire: 14,
    relaxation: 6,
    happiness: 10
}

const frameworkUrl: string = "http://localhost:3000/json/";

const overallNarrativeFile: string = paths.storyPath + 'overall_narrative.json';
let overallNarrativeId: string;

export class BootScene extends Phaser.Scene {

    constructor() {
        super(BootSceneConfig);
    }

    public preload() {

        // TODO gather all files to load them here
        overallNarrativeId = paths.getAssetIdFromFilename(overallNarrativeFile);
        this.load.json(overallNarrativeId, overallNarrativeFile);

        // // map tiles
        // this.load.image('castle-tiles', 'assets/tileset/castle.png');
        // this.load.image('stairs-tiles', 'assets/tileset/stairs.png');

        // // map in json format
        // this.load.tilemapTiledJSON('dance-hall-map', 'assets/map/dance_hall.json');

        // // character tiles
        // this.load.spritesheet('girls', 'assets/tileset/girls.png', { frameWidth: 39, frameHeight: 54 });
    }

    public create() {

        this.getStory().then((response) => {
            console.log(response);

            let storyManager = new StoryManager(response['story'] as IStory, playerType);
            this.registry.set('storyManager', storyManager);

            //this.scene.start('Scene');
        }).catch((response) => {
            console.log(response);
        })
    }

    private getStory(): Promise<Object> {
        let overallNarrativeObj = this.cache.json.get('overall_narrative');

        let request: XMLHttpRequest = new XMLHttpRequest();

        return new Promise<Object>(function (resolve, reject) {
            request.open("POST", frameworkUrl);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.responseType = 'json';
            
            let body = {
                playerType: playerType,
                data: overallNarrativeObj
            };
            request.send(JSON.stringify(body));

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    if (request.response['error'] !== undefined) {
                        reject(request.response);
                    } else {
                        resolve(request.response);
                    }
                }
            }
        })
    } 

    private loadStoryFiles() {

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