import * as Phaser from 'phaser';
import { StoryManager, EventType } from './story-managers/story-manager';
import { IScene, IEvent, IBodySpecs, IStory, IPlayerType } from '../utils/interfaces';
import { isWebGLRenderer } from '../utils/type-predicates';
import { Player } from './player';
import { Vignette } from './shaders/pipeline.js';
import { Actor } from './actor';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Game',
};

export class GameScene extends Phaser.Scene {

    private map: Phaser.Tilemaps.Tilemap;
    private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];
    
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private storyManager: StoryManager; 
    private vignette: Vignette;

    constructor() {
        super(config);
    }

    public init() {
        
        let story: IStory = this.registry.get('story');
        let playerType: IPlayerType = this.registry.get('playerType');

        this.storyManager = new StoryManager(this, story, playerType);
    }

    public create() {
        
        let currScene: IScene = this.storyManager.getCurrScene();
        let currEvent: IEvent = this.storyManager.getEventAt(0, 1);
        this.map = this.initMap(currScene);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.storyManager.start();
        
        //this.player = this.initPlayer(currEvent);

        // if(isWebGLRenderer(this.game.renderer)) {
        //     this.vignette = this.game.renderer.addPipeline('Vignette', new Vignette(this.game));
        //     this.applyPipeline();
        // }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.roundPixels = true;
    }

    public update(time: number, delta: number) {

        let keysPressed:Phaser.Input.Keyboard.Key[]  = this.parseUserInput();
        this.storyManager.act(time, delta, keysPressed);
    }

    public setActorCollisionsWithMap(actor: Actor) {
        for(let layer of this.obstacles) {
            actor.setCollisionWith(layer, this);
        }
    }

    // public getActorWithId(actorId: string): Actor {
    //     return this.actors.find(actor => actor.getId() == actorId);
    // }

    public getMap(): Phaser.Tilemaps.Tilemap {
        return this.map;
    }

    private parseUserInput(): Phaser.Input.Keyboard.Key[] {

        let keysPressed: Phaser.Input.Keyboard.Key[] = [];

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            keysPressed.push(this.cursors.space);
        }

        if (this.cursors.left.isDown) {
            keysPressed.push(this.cursors.left);
        }

        if (this.cursors.right.isDown) {
            keysPressed.push(this.cursors.right);
        }

        if (this.cursors.up.isDown) {
            keysPressed.push(this.cursors.up);
        }

        if (this.cursors.down.isDown) {
            keysPressed.push(this.cursors.down);
        }

        return keysPressed;
    }

    private initMap(currScene: IScene): Phaser.Tilemaps.Tilemap {
        
        let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({key: currScene.name});

        let tilesets: Phaser.Tilemaps.Tileset[] = [];

        for(let tilesetData of map.tilesets) {
            tilesets.push(map.addTilesetImage(tilesetData.name));
        }

        for(let layerData of map.layers) {

            let depth: number = (layerData.properties as Array<object>).find(i => i['name'] === 'depth')['value'];
            let collidable: boolean = (layerData.properties as Array<object>).find(i => i['name'] === 'collidable')['value'];

            let layer: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(layerData.name, tilesets).setDepth(depth);

            if(collidable) {
                layer.setCollisionByExclusion([-1]);
                this.obstacles.push(layer);
            }
        }

        return map;
    }

    private applyPipeline() {
        this.vignette.setFloat2('resolution', this.game.config.width, this.game.config.height);
        this.vignette.setFloat1('r',0.3);
        this.vignette.setFloat1('b',0.6);
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