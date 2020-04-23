import * as Phaser from 'phaser';
import { GameScene } from '../game-scene';

export abstract class EventManager {
    
    protected jsonObj: any;

    constructor(scene: GameScene, name: string) {
        this.jsonObj = scene.cache.json.get(name);
        this.populateActors(scene);
    }

    public abstract act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]);
    public abstract populateActors(scene: GameScene);
}