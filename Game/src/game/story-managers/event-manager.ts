import * as Phaser from 'phaser';
import { GameScene } from '../game-scene';
import { ICoordinates } from '../../utils/interfaces';

export abstract class EventManager {
    
    protected jsonObj: any;
    protected scene: GameScene;
    protected done: boolean;

    constructor(scene: GameScene, name: string) {
        this.jsonObj = scene.cache.json.get(name);
        this.scene = scene;
        this.done = false;
    }

    public abstract act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]);
    public abstract populateActors();
    public abstract getPlayerPosition(): ICoordinates;
    public abstract destroy();

    public isDone(): boolean {
        return this.done;
    }
}