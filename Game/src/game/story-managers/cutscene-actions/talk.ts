import { Action } from "./action";
import { GameScene } from "../../game-scene";
import { DialogueScene } from "../../dialogue-scene";

export class Talk extends Action {

    private onScreen: boolean;
    private text: string;
    private actorName: string;

    private emitter: Phaser.Events.EventEmitter; 

    constructor(scene: GameScene, actorId: string, text: string) {
        super(scene, actorId);
        this.onScreen = false;

        this.actorName = this.actor.getName();
        this.text = text;

        this.emitter = new Phaser.Events.EventEmitter();

        this.emitter.on('dialogueEnded', this.dialogueEnded, this);
    }
    
    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {

        if(!this.onScreen) {
            this.onScreen = true;

            this.scene.scene.wake('Dialogue');
            this.scene.scene.launch('Dialogue',{ text: this.text, actor: this.actorName, emitter: this.emitter});
            return;
        }
    }

    public dialogueEnded() {
        this.scene.scene.sleep('Dialogue');
        this.done = true;
    }
}