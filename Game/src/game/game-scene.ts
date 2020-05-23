import * as Phaser from 'phaser';
import { StoryManager } from './story-managers/story-manager';
import { IScene, IEvent, IStory, IPlayerType } from '../utils/interfaces';
import { isWebGLRenderer } from '../utils/type-predicates';
import { Vignette } from './shaders/pipeline.js';
import { Actor } from './actor';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Game',
};

declare const STORYVIEWER_DEBUGGING: boolean;

export class GameScene extends Phaser.Scene {

    public static MAX_DEPTH = 128;
    public static MIN_DEPTH = 0;
    public static cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    public static interactKey: Phaser.Input.Keyboard.Key;

    private map: Phaser.Tilemaps.Tilemap;
    private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];

    private storyManager: StoryManager;
    private vignette: Vignette;
    private doneDomElem: HTMLElement;
    private endEvent: Event;
    private sentEvent: boolean = false;

    constructor() {
        super(config);
    }

    public init() {

        let story: IStory = this.registry.get('story');
        let playerType: IPlayerType = this.registry.get('playerType');
        
        this.doneDomElem = this.registry.get('doneDomElem');
        this.endEvent = new Event('endGame');

        if (STORYVIEWER_DEBUGGING) {
            let storyId: string = this.registry.get('storyId');
            this.storyManager = new StoryManager(this, story, playerType, storyId);
        } else {
            this.storyManager = new StoryManager(this, story, playerType);
        }
    }

    public create() {

        let currScene: IScene = this.storyManager.getCurrScene();
        this.map = this.initMap(currScene);
        GameScene.cursors = this.input.keyboard.createCursorKeys();
        GameScene.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        this.storyManager.start();

        // if(isWebGLRenderer(this.game.renderer)) {
        //     this.vignette = this.game.renderer.addPipeline('Vignette', new Vignette(this.game));
        //     this.applyPipeline();
        // }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.roundPixels = true;
    }

    public update(time: number, delta: number) {

        if(this.storyManager.isDone()) {

            if(!this.sentEvent && this.doneDomElem) {
                this.sentEvent = true;
                console.log("dispatching end event");
                this.doneDomElem.dispatchEvent(this.endEvent);
            }
            return;
        }

        let keysPressed: Phaser.Input.Keyboard.Key[] = this.parseUserInput();
        this.storyManager.act(time, delta, keysPressed);
    }

    public setActorCollisionsWithMap(actor: Actor) {
        for (let layer of this.obstacles) {
            actor.setCollisionWith(layer, this);
        }
    }

    public getMap(): Phaser.Tilemaps.Tilemap {
        return this.map;
    }

    private parseUserInput(): Phaser.Input.Keyboard.Key[] {

        let keysPressed: Phaser.Input.Keyboard.Key[] = [];

        if (Phaser.Input.Keyboard.JustDown(GameScene.interactKey)) {
            keysPressed.push(GameScene.interactKey);
        }

        if (GameScene.cursors.left.isDown) {
            keysPressed.push(GameScene.cursors.left);
        }

        if (GameScene.cursors.right.isDown) {
            keysPressed.push(GameScene.cursors.right);
        }

        if (GameScene.cursors.up.isDown) {
            keysPressed.push(GameScene.cursors.up);
        }

        if (GameScene.cursors.down.isDown) {
            keysPressed.push(GameScene.cursors.down);
        }

        return keysPressed;
    }

    private initMap(currScene: IScene): Phaser.Tilemaps.Tilemap {

        let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: currScene.name });

        let tilesets: Phaser.Tilemaps.Tileset[] = [];

        for (let tilesetData of map.tilesets) {
            tilesets.push(map.addTilesetImage(tilesetData.name));
        }

        for (let layerData of map.layers) {

            let depth: number = (layerData.properties as Array<object>).find(i => i['name'] === 'depth')['value'];

            if (depth > 0) {
                depth += GameScene.MAX_DEPTH + 1;
            } else {
                depth += GameScene.MIN_DEPTH - 1;
            }

            let collidable: boolean = (layerData.properties as Array<object>).find(i => i['name'] === 'collidable')['value'];

            let layer: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(layerData.name, tilesets).setDepth(depth);

            if (collidable) {
                layer.setCollisionByExclusion([-1]);
                this.obstacles.push(layer);
            }
        }

        return map;
    }

    private applyPipeline() {
        this.vignette.setFloat2('resolution', this.game.config.width, this.game.config.height);
        this.vignette.setFloat1('r', 0.3);
        this.vignette.setFloat1('b', 0.6);
        this.vignette.setFloat1('tx', 0.5);
        this.vignette.setFloat1('ty', 0.5);
        this.vignette.setFloat1('bright', 1.0);
        this.vignette.setFloat1('red', 1.0);
        this.vignette.setFloat1('green', 1.0);
        this.vignette.setFloat1('blue', 1.0);
        this.vignette.setFloat1('bgred', 1.0);
        this.vignette.setFloat1('bggreen', 1.0);
        this.vignette.setFloat1('bgblue', 1.0);
        this.cameras.main.setRenderToTexture(this.vignette);
    }

}