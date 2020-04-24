import * as Phaser from 'phaser';
import { DialogueBox } from './ui/dialogue-box';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Dialogue',
};

export class DialogueScene extends Phaser.Scene {

    private dialogueBox: DialogueBox; 
    private spaceKey: Phaser.Input.Keyboard.Key;

    private text: string;
    private actorName: string;

    private emitter: Phaser.Events.EventEmitter;

    constructor() {
        super(config);
    }

    public init(data) {
        this.text = data.text;
        this.actorName = data.actor;
        this.emitter = data.emitter;

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    public create() {
        this.dialogueBox = new DialogueBox(this, this.text, this.actorName);
    }

    public update() {
        if(this.dialogueBox.isDone()) {
            this.emitter.emit('dialogueEnded');
            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.dialogueBox.parseSpace();
        }
    }
}