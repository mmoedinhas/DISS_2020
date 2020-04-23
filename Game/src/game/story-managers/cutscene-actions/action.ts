import { GameScene } from "../../game-scene";
import { Actor } from "../../actor";

export abstract class Action {

    protected done: boolean;
    protected scene: GameScene;
    protected actor: Actor;

    constructor(scene: GameScene, actorId: string) {
        this.scene = scene;
        this.done = false;

        this.actor = this.scene.actors.find(actor => actor.getId() == actorId);
    }

    public abstract act();
    
    public isDone() {
        return this.done;
    }
}