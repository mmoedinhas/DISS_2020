import * as Phaser from 'phaser';
import { DanceHallScene } from './dance-hall-scene';
import { IPlayerType, IStory, IFileBundle, IFile } from '../utils/interfaces';
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
const actorsFile: string = paths.storyPath + 'actors.json';
const playableCharactersFile: string = paths.storyPath + 'playable_characters.json';
const tilesetsFile: string = paths.tilesetPath + 'tilesets.json';

export class BootScene extends Phaser.Scene {

    constructor() {
        super(BootSceneConfig);
    }

    public preload() {

        //load main story files
        this.load.json('overall_narrative', overallNarrativeFile);
        this.load.json('actors', actorsFile);
        this.load.json('playable_characters', playableCharactersFile);
        this.load.json('tilesets', tilesetsFile);

        // // map tiles
        // this.load.image('castle-tiles', 'assets/tileset/castle.png');
        // this.load.image('stairs-tiles', 'assets/tileset/stairs.png');

        // // character tiles
        // this.load.spritesheet('girls', 'assets/tileset/girls.png', { frameWidth: 39, frameHeight: 54 });
    }

    public create() {

        this.getStory().then((response) => {
            //console.log(response);

            let storyManager = new StoryManager(response as IStory, playerType);
            this.registry.set('storyManager', storyManager);

            this.loadAllEventFiles(response as IStory);

            this.load.on('complete', () => {
                //this.scene.switch('OpeningTitle')
                console.log("load complete");
            });

            this.load.start();

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

    private loadAllEventFiles(story: IStory) {

        for (let scene of story.scenes) {

            this.loadMap(scene.name, scene.map);

            for (let event of scene.events) {
                if (event.type === 'cutscene') {
                    this.loadCutsceneFiles(event.name, event.name + '.json');
                } else if (event.type === 'gameplay') {
                    this.loadGameplayFiles(event.name, event.name + '.json');
                }
            }
        }

    }

    private loadCutsceneFiles(key: string, filename: string) {
        this.load.json(key, paths.eventsPath + filename).on('filecomplete', function (givenKey) {
            if(givenKey === key) {
                console.log("loaded cutscene file " + key);
            }
        }, this);
    }

    private loadGameplayFiles(key: string, filename: string) {
        this.load.json(key, paths.eventsPath + filename).on('filecomplete', function (givenKey) {
            if(givenKey === key) {
                console.log("loaded gameplay file " + key);
            }
        }, this);
    }

    private loadMap(key: string, filename: string) {
        this.load.tilemapTiledJSON(key, paths.mapsPath + filename).on('filecomplete', function (givenKey) {
            if(givenKey === key) {
                console.log("loading map " + key);

                let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({key: key});
                console.log(map);
                for(let tileset of map.tilesets) {
                    let filename = paths.mapTilesPath + tileset.name + '.png';
                    
                    this.load.image(tileset.name + '_tiles', filename).on('filecomplete', function (givenKey2) {
                        if(givenKey2 === tileset.name + '_tiles') {
                            console.log("loaded map tileset " + tileset.name);
                        }
                    }, this);
                }

                console.log("loaded map " + key);

            }
        }, this);
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