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
    }

    public create() {

        this.getStory().then((response) => {
            console.log(response);

            let storyManager = new StoryManager(response as IStory, playerType);
            this.registry.set('storyManager', storyManager);

            this.loadAllEventFiles(response as IStory);

            this.load.on('complete', () => {
                //this.scene.switch('OpeningTitle')
                console.log("load complete for " + this.load.totalComplete + " files");
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
            if (givenKey === key) {
                let cutsceneObj = this.cache.json.get(key);
                let actorsObj = this.cache.json.get('actors');
                let tilesetsArray = this.cache.json.get('tilesets');

                for (let actor of cutsceneObj.actors) {
                    this.loadActorTileset(actorsObj, tilesetsArray, actor.actorId);
                }
            }
        }, this);
    }

    private loadGameplayFiles(key: string, filename: string) {
        this.load.json(key, paths.eventsPath + filename).on('filecomplete', function (givenKey) {
            if (givenKey === key) {
                let gameplayObj = this.cache.json.get(key);
                let actorsObj = this.cache.json.get('actors');
                let tilesetsArray = this.cache.json.get('tilesets');

                this.loadActorTileset(actorsObj, tilesetsArray, gameplayObj.player.actorId);
                // TODO load enemy tilesets

                for (let npc of gameplayObj.npcs) {
                    this.loadActorTileset(actorsObj, tilesetsArray, npc.actorId);
                }

                //TODO load item tilesets
            }
        }, this);
    }

    private loadMap(key: string, filename: string) {
        this.load.tilemapTiledJSON(key, paths.mapsPath + filename).on('filecomplete', function (givenKey) {
            if (givenKey === key) {

                let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: key });
                for (let tileset of map.tilesets) {
                    let filename = paths.mapTilesPath + tileset.name + '.png';

                    this.load.image(tileset.name, filename);
                }

            }
        }, this);
    }

    private loadActorTileset(actorsObj: any, tilesetsArray: any, actorId: string) {
        let actor = actorsObj.actors.find(actor => actor.id == actorId);
        let tilesetKey = actor.tilesetId;

        let tileset = tilesetsArray.find(tileset => tileset.id == tilesetKey);

        this.load.spritesheet(tileset.id, paths.tilesetPath + tileset.filename, { frameWidth: tileset.frameWidth, frameHeight: tileset.frameHeight });
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