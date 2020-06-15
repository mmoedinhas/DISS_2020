import * as Phaser from 'phaser';
import { DialogueBox } from './ui/dialogue-box';
import { IDialogueLine } from '../utils/interfaces';

const config: Phaser.Types.Scenes.SettingsConfig = {
	key: 'Dialogue',
};

export class DialogueScene extends Phaser.Scene {
	private dialogueBox: DialogueBox;
	private spaceKey: Phaser.Input.Keyboard.Key;
	private zKey: Phaser.Input.Keyboard.Key;

	private dialogue: IDialogueLine[];

	private emitter: Phaser.Events.EventEmitter;

	constructor() {
		super(config);
	}

	public init(data) {
		this.dialogue = data.dialogue;
		this.emitter = data.emitter;

		this.spaceKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE
		);
		this.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
	}

	public create() {
		this.dialogueBox = new DialogueBox(this, this.dialogue);
	}

	public update() {
		if (this.dialogueBox.isDone()) {
			if (this.emitter !== undefined) {
				this.emitter.emit('dialogueEnded');
			}
			return;
		}

		if (
			Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
			Phaser.Input.Keyboard.JustDown(this.zKey)
		) {
			this.dialogueBox.parseInput();
		}
	}
}
