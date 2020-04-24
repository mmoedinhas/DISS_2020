import * as Phaser from 'phaser';
import { TextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Dialogue',
};

export class DialogueScene extends Phaser.Scene {

    private text: string;
    private actor: string;

    private fontFamily: string = 'MatchupPro';
    private fontSize: string = '30px';
    private stroke: string = '#000000';
    private strokeThickness: number = 2;

    constructor() {
        super(config);
    }

    public init(data) {
        this.text = `[stroke=`+ this.stroke + `]` + data.text + `[/stroke]`;
        this.actor = data.actor;
    }

    public create() {
        this.add.image(320, 360, 'dialogue_box').setOrigin(0.5, 1);

        this.add.text(310, 270, this.actor, {
            fontSize: this.fontSize,
            fontFamily: 'EquipmentPro',
            maxLines: 1,
            fixedWidth: 500,
            color: "#e8c840",
            stroke: this.stroke,
            strokeThickness: this.strokeThickness,
        }).setOrigin(0.5, 1);

        this.createTextBox(this, 320, 360, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 70
        }).start(this.text, 50);
    }

    private createTextBox(scene, x, y, config) {
        const GetValue = Phaser.Utils.Objects.GetValue;
        let wrapWidth = GetValue(config, 'wrapWidth', 0);
        let fixedWidth = GetValue(config, 'fixedWidth', 0);
        let fixedHeight = GetValue(config, 'fixedHeight', 0);
        let tween;
        let textBox = new TextBox(scene, {
            x: x,
            y: y,

            text: this.getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'dialogue_arrow').setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        }).setOrigin(0.5, 1).layout();

        textBox.setInteractive().on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                if(this.isLastPage) {
                    scene.scene.remove('Dialogue');
                } else {
                    this.typeNextPage();
                }
                
            }
        }, textBox).on('pageend', function () {

            let icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);

            icon.x = 575;
            if(tween !== undefined) {
                tween.remove();
            }
            
            tween = scene.tweens.add({
                targets: icon,
                x: '+=10', // '+=100'
                ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 700,
                repeat: -1, // -1: infinity
                yoyo: true
            });
        }, textBox);

        return textBox;
    }

    private getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
        let txt = new BBCodeText(scene, 0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,

            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            strokeThickness: this.strokeThickness,

            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 2
        });

        return scene.add.existing(txt);
    }
}