import { Action } from "./action";
import { GameScene } from "../../game-scene";
import { Actor } from "../../actor";

export class Walk extends Action {

    private x: integer;
    private y: integer;

    private started: boolean;
    private emitter: Phaser.Events.EventEmitter; 
    
    constructor(scene: GameScene, actor: Actor, x: integer, y: integer) {
        super(scene, actor);

        this.x = x;
        this.y = y;
        this.started = false;
        this.emitter = new Phaser.Events.EventEmitter();

        this.emitter.on('stopWalking', this.stopWalkingHandler, this);
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        if(!this.started) {
            this.started = true;
            
            this.actor.moveAuto(this.scene, this.x, this.y, this.emitter);
            this.actor.getCameraToFollow(this.scene);
        }
    }

    public stopWalkingHandler() {
        this.done = true;
    }
}