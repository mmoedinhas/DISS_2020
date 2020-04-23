import { Action } from "./action";
import { GameScene } from "../../game-scene";

export class Walk extends Action {

    private x: integer;
    private y: integer;

    private started: boolean;
    private emitter: Phaser.Events.EventEmitter; 
    
    constructor(scene: GameScene, actorId: string, x: integer, y: integer) {
        super(scene, actorId);

        this.x = x;
        this.y = y;
        this.started = false;
        this.emitter = new Phaser.Events.EventEmitter();

        this.emitter.on('stopWalking', this.stopWalkingHandler, this);
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        if(!this.started) {
            this.started = true;

            this.actor.move(this.scene, this.x, this.y, this.emitter);
            this.actor.getCameraToFollow(this.scene);
        }
    }

    public stopWalkingHandler() {
        this.done = true;
    }
}