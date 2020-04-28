import { GameScene } from "../../game-scene";
import { Actor } from "../../actor";

export abstract class Action {

    protected done: boolean;
    protected scene: GameScene;
    protected actor: Actor;

    constructor(scene: GameScene, actor: Actor) {
        this.scene = scene;
        this.done = false;

        this.actor = actor;
    }

    public abstract act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]);
    
    public isDone() {
        return this.done;
    }

    public getActor(): Actor {
        return this.actor;
    }
}