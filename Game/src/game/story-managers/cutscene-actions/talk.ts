import { Action } from "./action";
import { GameScene } from "../../game-scene";
import { Actor } from "../../actor";
import { IDialogueLine } from "../../../utils/interfaces";

export class Talk extends Action {

    private onScreen: boolean;
    private dialogue: IDialogueLine[];
    private actorName: string;

    private emitter: Phaser.Events.EventEmitter; 

    constructor(scene: GameScene, actor: Actor, text: string) {
        super(scene, actor);
        this.onScreen = false;

        this.dialogue = [
            {
                author: actor.getName(),
                text: text
            }
        ]

        this.emitter = new Phaser.Events.EventEmitter();

        this.emitter.on('dialogueEnded', this.dialogueEnded, this);
    }
    
    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {

        if(!this.onScreen) {
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