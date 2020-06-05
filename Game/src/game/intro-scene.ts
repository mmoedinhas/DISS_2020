import * as Phaser from 'phaser';
import {
	TextBox,
	Label,
} from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';

const config: Phaser.Types.Scenes.SettingsConfig = {
	key: 'Introduction',
};

export class IntroScene extends Phaser.Scene {
	// CONSTS
	private fontFamily: string = 'MatchupPro';
	private fontSize: string = '30px';
	private stroke: string = '#000000';
	private strokeThickness: number = 2;

	private textBox: TextBox;
	private text: string;

	private interactKey: Phaser.Input.Keyboard.Key;

	constructor() {
		super(config);
	}

	public init() {
		this.interactKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.Z
		);

		this.text =
			'You are Clara, the daughter of a wealthy family.\nToday is Christmas and your parents are hosting a party with a lot of guests. As the eldest daughter of the family, it is expected that you attend the party and interact with the guests.\n\nHow is Clara going to handle this responsibility?';
		this.text = this.text =
			`[stroke=` + this.stroke + `]` + this.text + `[/stroke]`;
	}

	public create() {
		let background = this.add
			.image(
				this.cameras.main.centerX,
				this.cameras.main.centerY,
				'dialogue_box_big'
			)
			.setOrigin(0.5, 0.5);

		this.textBox = this.createTextBox(
			this.cameras.main.centerX,
			this.cameras.main.centerY,
			{
				wrapWidth: 500,
				fixedWidth: 500,
				fixedHeight: 300,
			}
		).start(this.text, 30);

		this.createLabel(40, 330, 'Press Z or SPACE to continue...', {
			wrapWidth: 500,
		});
	}

	private createTextBox(x: number, y: number, config: any) {
		const GetValue = Phaser.Utils.Objects.GetValue;

		let wrapWidth = GetValue(config, 'wrapWidth', 0);
		let fixedWidth = GetValue(config, 'fixedWidth', 0);
		let fixedHeight = GetValue(config, 'fixedHeight', 0);

		let textBox = new TextBox(this, {
			x: x,
			y: y,

			text: this.getBBcodeText(this, wrapWidth, fixedWidth, fixedHeight),

			action: this.getArrow(),

			space: {
				left: 40,
				right: 20,
				top: 60,
				bottom: 20,
				icon: 10,
				text: 60,
			},
		})
			.setOrigin(0.5, 0.5)
			.layout();

		textBox.on(
			'pageend',
			function () {
				var icon = textBox.getElement('action').setVisible(true);
				textBox.resetChildVisibleState(icon);
				icon.x -= 30;
				let tween: Phaser.Tweens.Tween = this.tweens.add({
					targets: icon,
					x: '+=10', // '+=100'
					ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
					duration: 700,
					repeat: -1, // -1: infinity
					yoyo: true,
				});
			},
			this
		);

		return textBox;
	}

	private getBBcodeText(
		scene: Phaser.Scene,
		wrapWidth: number,
		fixedWidth: number,
		fixedHeight: number
	) {
		let txt = new BBCodeText(scene, 0, 0, '', {
			fixedWidth: fixedWidth,
			fixedHeight: fixedHeight,

			fontFamily: this.fontFamily,
			fontSize: this.fontSize,

			wrap: {
				mode: 'word',
				width: wrapWidth,
			},
			maxLines: 14,
			strokeThickness: this.strokeThickness,
			stroke: this.stroke,
		});

		txt.depth = 9999;

		return scene.add.existing(txt);
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
			if (this.textBox.isTyping) {
				this.textBox.stop(true);
			} else {
				if (this.textBox.isLastPage) {
					this.cameras.main.fade(
						500,
						0,
						0,
						0,
						false,
						function (camera, progress) {
							if (progress >= 1) {
								this.scene.start('Tutorial');
							}
						},
						this
					);
				} else {
					this.textBox.typeNextPage();
				}
			}
		}
	}
}
