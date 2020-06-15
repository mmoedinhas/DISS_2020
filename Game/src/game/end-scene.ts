import * as Phaser from 'phaser';
import { Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import { ActionBox } from './ui/action-box';

const config: Phaser.Types.Scenes.SettingsConfig = {
	key: 'End',
};

export class EndScene extends Phaser.Scene {
	// CONSTS
	private fontFamily: string = 'MatchupPro';
	private fontSize: string = '30px';
	private stroke: string = '#000000';
	private strokeThickness: number = 2;

	private interactKey: Phaser.Input.Keyboard.Key;
	private endEvent: Event;
	private doneDomElem: HTMLElement;
	private sentEvent: boolean = false;

	constructor() {
		super(config);
	}

	public init() {
		this.doneDomElem = this.registry.get('doneDomElem');
		this.endEvent = new Event('endGame');
	}

	public create() {
		this.createLabel(
			this.cameras.main.centerX,
			this.cameras.main.centerY - 30,
			'The End',
			{
				fontSize: '50px',
				fontFamily: 'EquipmentPro',
				color: '#e8c840',
				align: 'center',
			}
		);

		this.createLabel(
			this.cameras.main.centerX,
			this.cameras.main.centerY + 10,
			'Thank you for playing!',
			{
				align: 'center',
				fontSize: '40px',
			}
		);

		this.createLabel(
			this.cameras.main.centerX,
			320,
			'Please press the Next button to continue to the next questionnaire',
			{
				align: 'center',
				wrapWidth: 500,
				fontSize: '25px',
			}
		);

		this.cameras.main.fadeFrom(500);
	}

	private createLabel(x: number, y: number, text: string, config?: any): Label {
		const GetValue = Phaser.Utils.Objects.GetValue;

		let wrapWidth: number = GetValue(config, 'wrapWidth', 0);
		let fixedWidth: number = GetValue(config, 'fixedWidth', 0);
		let fixedHeight: number = GetValue(config, 'fixedHeight', 0);
		let fontFamily: string = GetValue(config, 'fontFamily', this.fontFamily);
		let fontSize: string = GetValue(config, 'fontSize', this.fontSize);
		let color: string = GetValue(config, 'color', '#ffffff');
		let align: string = GetValue(config, 'align', 'left');

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
				color,
				align
			),
		});

		if (align == 'center') {
			label.setOrigin(0.5, 0.5);
		} else if (align == 'right') {
			label.setOrigin(1, 0.5);
		} else {
			label.setOrigin(0, 0.5);
		}

		label.layout();

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
		color: string,
		align: string
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
			align: align,
		});
	}

	public update(time: number, delta: number) {
		if (!this.sentEvent) {
			this.sentEvent = true;
			this.doneDomElem.dispatchEvent(this.endEvent);
		}
	}
}
