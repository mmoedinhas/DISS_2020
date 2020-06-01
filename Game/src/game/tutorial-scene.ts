import * as Phaser from 'phaser';
import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';
import { ActionBox } from './ui/action-box';

const config: Phaser.Types.Scenes.SettingsConfig = {
	key: 'Tutorial',
};

export class TutorialScene extends Phaser.Scene {
	// CONSTS
	private fontFamily: string = 'MatchupPro';
	private fontSize: string = '30px';
	private stroke: string = '#000000';
	private strokeThickness: number = 2;

	private interactKey: Phaser.Input.Keyboard.Key;

	constructor() {
		super(config);
	}

	public init() {
		this.interactKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.Z
		);
	}

	public create() {
		this.add
			.image(
				this.cameras.main.centerX,
				this.cameras.main.centerY,
				'dialogue_box_big'
			)
			.setOrigin(0.5, 0.5);

		this.createLabel(50, 50, 'Controls', {
			fontSize: '40px',
			fontFamily: 'EquipmentPro',
			color: '#e8c840',
		});

		this.anims.create({
			key: 'walk_example',
			frames: this.anims.generateFrameNumbers('girls', {
				frames: [1, 2, 1, 0],
			}),
			frameRate: 5,
			repeat: -1,
		});

		let exampleClara = this.add.sprite(50, 120, 'girls', 0).setOrigin(0, 0.5);

		exampleClara.anims.play('walk_example');

		this.createLabel(110, 110, 'Walking - Arrow Keys', {});

		let arrow = this.add.image(60, 172, 'dialogue_arrow');

		this.tweens.add({
			targets: arrow,
			x: '+=10', // '+=100'
			ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 700,
			repeat: -1, // -1: infinity
			yoyo: true,
		});

		this.createLabel(110, 160, 'Go to next page - Z Key', {
			wrapWidth: 500,
		});

		new ActionBox(this, 'Talk', 70, 233, false);
		this.createLabel(110, 210, 'Talk to other characters - Z Key', {
			wrapWidth: 500,
		});

		this.createLabel(420, 283, 'Start Game', {
			fontFamily: 'EquipmentPro',
			color: '#e8c840',
		});
		let arrow2 = this.add.image(560, 300, 'dialogue_arrow');

		this.tweens.add({
			targets: arrow2,
			x: '+=10', // '+=100'
			ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
			duration: 700,
			repeat: -1, // -1: infinity
			yoyo: true,
		});
	}

	private createLabel(x: number, y: number, text: string, config?: any): Label {
		const GetValue = Phaser.Utils.Objects.GetValue;

		let wrapWidth: number = GetValue(config, 'wrapWidth', 0);
		let fixedWidth: number = GetValue(config, 'fixedWidth', 0);
		let fixedHeight: number = GetValue(config, 'fixedHeight', 0);
		let fontFamily: string = GetValue(config, 'fontFamily', this.fontFamily);
		let fontSize: string = GetValue(config, 'fontSize', this.fontSize);
		let color: string = GetValue(config, 'color', '#ffffff');

		let label = new Label(this, {
			x: x,
			y: y,

			text: this.getText(
				this,
				text,
				wrapWidth,
				fixedWidth,
				fixedHeight,
				fontFamily,
				fontSize,
				color
			),

			// space: {
			// 	left: 10,
			// 	right: 10,
			// 	top: 10,
			// 	bottom: 10,
			// },
		})
			.setOrigin(0, 0)
			.layout();

		return label;
	}

	private getText(
		scene: Phaser.Scene,
		text: string,
		wrapWidth: number,
		fixedWidth: number,
		fixedHeight: number,
		fontFamily: string,
		fontSize: string,
		color: string
	): Phaser.GameObjects.Text {
		return scene.add.text(0, 0, text, {
			fontSize: fontSize,
			fontFamily: fontFamily,
			fixedWidth: fixedWidth,
			fixedHeight: fixedHeight,
			wordWrap: {
				width: wrapWidth,
			},
			color: color,
			stroke: this.stroke,
			strokeThickness: this.strokeThickness,
		});
	}

	private getArrow() {
		let image: Phaser.GameObjects.Image = this.add
			.image(0, 0, 'dialogue_arrow')
			.setVisible(false);
		image.depth = 9999;
		return image;
	}

	public update(time: number, delta: number) {
		if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
			this.scene.start('Introduction');
		}
	}
}
