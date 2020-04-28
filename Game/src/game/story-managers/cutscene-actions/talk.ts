import { Action } from "./action";
import { GameScene } from "../../game-scene";
import { Actor } from "../../actor";
import { IDialogueLine } from "../../../utils/interfaces";
import { tilesetPath } from "../../../utils/paths";

export class Talk extends Action {

    private onScreen: boolean;
    private dialogue: IDialogueLine[];

    private emitter: Phaser.Events.EventEmitter; 

    constructor(scene: GameScene, actor: Actor, dialogue: IDialogueLine[]) {
        super(scene, actor);
        this.onScreen = false;

        this.dialogue = dialogue;

        this.actor = actor;

        this.emitter = new Phaser.Events.EventEmitter();

        this.emitter.on('dialogueEnded', this.dialogueEnded, this);
    }
    
    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {

        if(!this.onScreen) {
            this.actor.getCameraToFollow(this.scene);
            this.onScreen = true;

            this.scene.scene.wake('Dialogue');
            this.scene.scene.launch('Dialogue',{ dialogue: this.dialogue, emitter: this.emitter});
            return;
        }
    }

    public dialogueEnded() {
        this.scene.scene.sleep('Dialogue');
        this.done = true;
    }
}