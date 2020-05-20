import * as Phaser from 'phaser';
import * as Framework from '../framework/story-framework';
import WebfontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { GameScene } from './game-scene';
import { IPlayerType, IStory } from '../utils/interfaces';
import * as paths from '../utils/paths';
import { DialogueScene } from './dialogue-scene';
import { getAssetIdFromPath } from '../utils/paths';

declare const STORYVIEWER_URL: string;
declare const STORYVIEWER_DEBUGGING: boolean;
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

export let storyId;

const overallNarrativeFile: string = paths.storyPath + 'overall_narrative.json';
const actorsFile: string = paths.storyPath + 'actors.json';
const tilesetsFile: string = paths.tilesetPath + 'tilesets.json';

const dialogueBox: string = paths.uiPath + 'text-box.png';
const dialogueArrow: string = paths.uiPath + 'dialogue-arrow.png';
const zKey: string = paths.uiPath + 'ZKey.png';

export class BootScene extends Phaser.Scene {

    private fileValidations: Promise<boolean>[] = [];
    private loadedFiles: string[] = [];

    constructor() {
        super(BootSceneConfig);
    }

    public preload() {
        //load main story files
        this.load.json('overall_narrative', overallNarrativeFile);
        this.load.json('actors', actorsFile);
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

        if (DEBUG) {
            this.load.on('webfontactive', function (fileObj, familyName) {
                console.log('loaded font: ' + familyName)
            });

            this.load.on('webfontinactive', function (fileObj, familyName) {
                console.log('couldn\'t load font: ' + familyName)
            });
        }

    }

    public async create() {

        if (!await this.areMainStoryFilesValid()) {
            return;
        }

        let response;
        try {
            response = this.getStory();
        } catch (err) {
            if (DEBUG) {
                this.writeErrorToConsole(JSON.stringify(err));
            }
            return;
        }

        let story = response;

        if (DEBUG) {
            console.log(response);

            if (STORYVIEWER_DEBUGGING) {
                try {
                    await this.sendDebugInfo(response['graph']);
                } catch (err) {
                    if (err) {
                        this.writeErrorToConsole(JSON.stringify(err));
                    }
                }

                this.registry.set('storyId', storyId);
                story = response['story'];
            }
        }

        this.registry.set('story', story);
        this.registry.set('playerType', playerType);
        this.loadAllEventFiles(story as IStory);

        let scene: Phaser.Scenes.ScenePlugin = this.scene;

        this.load.on('complete', async () => {
            if (DEBUG) {
                console.log("load complete for " + this.load.totalComplete + " files");
            }
            
            let validationResults: boolean[] = await Promise.all(this.fileValidations);

            if(DEBUG) {
                console.log(validationResults);
            }
            
            if (!validationResults.includes(false)) {
                scene.start('Game');
            }
        });

        this.load.start();
    }

    private getStory(): any {
        let overallNarrativeObj = this.cache.json.get('overall_narrative');

        let response = Framework.createStoryLine(playerType, overallNarrativeObj, STORYVIEWER_DEBUGGING);
        if (response['error'] !== undefined) {
            throw response;
        }

        return response;
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

        if(this.loadedFiles.includes(key)) {
            return;
        }

        this.loadedFiles.push(key);
        this.load.json(key, paths.eventsPath + filename).on('filecomplete', async function (givenKey) {
            if (givenKey === key) {

                let validFile = this.validateFile(key, "cutscene", key);
                this.fileValidations.push(validFile);
                if (!await validFile) {
                    return;
                }

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
        
        if(this.loadedFiles.includes(key)) {
            return;
        }

        this.loadedFiles.push(key);
        this.load.json(key, paths.eventsPath + filename).on('filecomplete', async function (givenKey) {
            if (givenKey === key) {

                let validFile = this.validateFile(key, "gameplay", key);
                this.fileValidations.push(validFile);
                if (!await validFile) {
                    return;
                }

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
        
        if(this.loadedFiles.includes(key)) {
            return;
        }

        this.loadedFiles.push(key);
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

        if(this.loadedFiles.includes(tilesetKey)) {
            return;
        }

        this.loadedFiles.push(tilesetKey);

        let tileset = tilesetsArray.find(tileset => tileset.id == tilesetKey);

        if (!tileset) {
            if (DEBUG) {
                this.writeErrorToConsole("Tileset " + tilesetKey + " is not defined in tilesets file.")
                this.fileValidations.push(new Promise<boolean>(resolve => resolve(false)));
                return;
            }
        }

        this.load.spritesheet(tilesetKey, paths.tilesetPath + tileset.filename, { frameWidth: tileset.frameWidth, frameHeight: tileset.frameHeight });       
    }

    private loadDialogue(filename: string) {
        let key: string = getAssetIdFromPath(filename);
        
        if(this.loadedFiles.includes(key)) {
            return;
        }

        this.loadedFiles.push(key);
        
        this.load.json(key, paths.dialoguePath + filename).on('filecomplete', async function (givenKey) {
            if(givenKey === key) {
                
                let validFile = this.validateFile(key, "dialogue", key);
                this.fileValidations.push(validFile);
                if (!await validFile) {
                    return;
                }
            }
        }, this);
    }

    private validateFile(fileName: string, fileType: string, fileKey: string): Promise<boolean> {
        let fileContent = this.cache.json.get(fileKey);
        const writeErrorToConsole = this.writeErrorToConsole;
        return new Promise<boolean>(function (resolve, reject) {
            try {
                let response = Framework.validateNarrativeFile(fileType, fileContent);
                if (response !== 'valid') {
                    if (DEBUG) {
                        writeErrorToConsole("error in file " + fileName + ".json\n" + JSON.stringify(response));
                    }
                    resolve(false);
                } else {
                    resolve(true);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    private areMainStoryFilesValid(): Promise<boolean> {
        let mainStoryFilesValidations: Promise<Object>[] = [
            this.validateFile("actors", "actors", "actors"),
            this.validateFile("tilesets", "tilesets", "tilesets")
        ];

        return Promise.all(mainStoryFilesValidations).then(function (responses) {

            if (responses.includes(false)) {
                return false;
            } else {
                return true;
            }

        }).catch(function (err) {
            if (DEBUG) {
                this.writeErrorToConsole(err);
                return false;
            }
        });
    }

    private sendDebugInfo(graph: any): Promise<Object> {
        let debugViewButton: HTMLInputElement = document.getElementById("storyViewLink") as HTMLInputElement;

        let request: XMLHttpRequest = new XMLHttpRequest();

        return new Promise<Object>(function (resolve, reject) {
            request.open("POST", STORYVIEWER_URL + "/debug");
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            request.responseType = 'json';

            let body = {
                playerType: playerType,
                graph: graph,
                id: storyId
            };
            request.send(JSON.stringify(body));

            request.onreadystatechange = function () {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        storyId = request.response.id;
                        debugViewButton.disabled = false;
                        resolve();
                    } else {
                        reject(request.response);
                    }
                }
            }
        })
    }

    private writeErrorToConsole(error: string) {
        console.log(error);
        let errorText: HTMLElement = document.getElementById("error");
        errorText.style.display = "block";
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