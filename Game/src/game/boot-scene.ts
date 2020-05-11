import * as Phaser from 'phaser';
import WebfontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js'; 
import { GameScene } from './game-scene';
import { IPlayerType, IStory } from '../utils/interfaces';
import * as paths from '../utils/paths';
import { DialogueScene } from './dialogue-scene';
import { getAssetIdFromPath } from '../utils/paths';

declare const FRAMEWORK_URL: string;
declare const DEBUG: boolean;

const physicsDebug: boolean = false;

const BootSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'BootScene',
};

export const playerType: IPlayerType = {
    anger: 4,
    disgust: 4,
    fear: 5,
    anxiety: 10,
    sadness: 8,
    desire: 14,
    relaxation: 6,
    happiness: 10
}

export let graph;

const frameworkUrl: string = FRAMEWORK_URL + "/";

const overallNarrativeFile: string = paths.storyPath + 'overall_narrative.json';
const actorsFile: string = paths.storyPath + 'actors.json';
const playableCharactersFile: string = paths.storyPath + 'playable_characters.json';
const tilesetsFile: string = paths.tilesetPath + 'tilesets.json';

const dialogueBox: string = paths.uiPath + 'text-box.png';
const dialogueArrow: string = paths.uiPath + 'dialogue-arrow.png';
const zKey: string = paths.uiPath + 'ZKey.png';

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

        // ui
        this.load.image('dialogue_box', dialogueBox);
        this.load.image('dialogue_arrow', dialogueArrow);
        this.load.spritesheet('zkey', zKey, { frameWidth: 16, frameHeight: 15 });

        (this.load as any).rexWebFont({
            custom: {
                families: ['MatchupPro', 'EquipmentPro'],
                urls: ['assets/fonts/fonts.css']
            }
        });

        if(DEBUG) {
            this.load.on('webfontactive', function (fileObj, familyName) {
                console.log('loaded font: ' + familyName)
            });
    
            this.load.on('webfontinactive', function (fileObj, familyName) {
                console.log('couldn\'t load font: ' + familyName)
            });
        }
        
    }

    public create() {

        this.getStory().then((response) => {

            if(DEBUG) {
                console.log(response);
                graph = response['graph'];
                let debugViewButton: HTMLInputElement = document.getElementById("storyViewLink") as HTMLInputElement;
                debugViewButton.disabled = false;
            }

            this.registry.set('story', response['story']);
            this.registry.set('playerType', playerType);
            this.loadAllEventFiles(response['story'] as IStory);

            let scene: Phaser.Scenes.ScenePlugin = this.scene;

            this.load.on('complete', () => {
                if(DEBUG) {
                    console.log("load complete for " + this.load.totalComplete + " files");
                }
                scene.start('Game');
            });

            this.load.start();

        }).catch((response) => {
            if(DEBUG) {
                console.log(response);
                let errorText: HTMLElement = document.getElementById("error");
                errorText.style.display = "block";
            }
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
                    this.loadDialogue(npc.dialogue);
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

    private loadDialogue(filename: string) {
        let key: string = getAssetIdFromPath(filename);
        this.load.json(key, paths.dialoguePath + filename);
    }
}

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