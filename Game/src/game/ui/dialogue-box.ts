import * as Phaser from 'phaser';
import { TextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';
import { IDialogueLine } from '../../utils/interfaces';
import { Actor } from '../actor';

export class DialogueBox {

    private scene: Phaser.Scene;

    private lines: IDialogueLine[];
    private currLine: integer;

    private background: Phaser.GameObjects.Image;
    private textBox: TextBox;
    private nameBox: Phaser.GameObjects.Text;
    private done: boolean;

    // CONSTS
    private fontFamily: string = 'MatchupPro';
    private fontSize: string = '30px';
    private stroke: string = '#000000';
    private strokeThickness: number = 2;

    constructor(scene: Phaser.Scene, lines: IDialogueLine[]) {

        this.scene = scene;
        this.lines = lines;
        this.currLine = 0;

        for(let line of this.lines) {
            line.text = `[stroke=` + this.stroke + `]` + line.text + `[/stroke]`;
        } 
        
        this.done = false;

        this.create();
    }

    private create() {
        this.background = this.scene.add.image(320, 360, 'dialogue_box').setOrigin(0.5, 1);
        this.background.depth = 9998;

        this.nameBox = this.scene.add.text(310, 270, this.lines[this.currLine].author, {
            fontSize: this.fontSize,
            fontFamily: 'EquipmentPro',
            maxLines: 1,
            fixedWidth: 500,
            color: "#e8c840",
            stroke: this.stroke,
            strokeThickness: this.strokeThickness,
        }).setOrigin(0.5, 1);

        this.nameBox.depth = 9999;

        this.textBox = this.createTextBox(320, 360, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 70
        }).start(this.lines[this.currLine].text, 20);
    }

    private createTextBox(x: number, y: number, config: any) {

        const GetValue = Phaser.Utils.Objects.GetValue;

        let wrapWidth = GetValue(config, 'wrapWidth', 0);
        let fixedWidth = GetValue(config, 'fixedWidth', 0);
        let fixedHeight = GetValue(config, 'fixedHeight', 0);

        let textBox = new TextBox(this.scene, {
            x: x,
            y: y,

            text: this.getBBcodeText(this.scene, wrapWidth, fixedWidth, fixedHeight),

            action: this.getArrow(),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        }).setOrigin(0.5, 1).layout();

        let icon = textBox.getElement('action');
        let tween: Phaser.Tweens.Tween = this.scene.tweens.add({
            targets: icon,
            x: '+=10', // '+=100'
            ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 700,
            repeat: -1, // -1: infinity
            yoyo: true
        });

        textBox.on('pageend', function () {

            let icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);

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
            stroke: this.stroke,

            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 2
        });

        txt.depth = 9999;

        return scene.add.existing(txt);
    }

    private getArrow() {
        let image: Phaser.GameObjects.Image = this.scene.add.image(0, 0, 'dialogue_arrow').setVisible(false);
        image.depth = 9999;
        return image;
    }

    private isDialogueOver(): boolean {
        return this.currLine == this.lines.length - 1;
    }

    public isDone(): boolean {
        return this.done;
    }

    public parseInput() {

        let icon = this.textBox.getElement('action').setVisible(false);
        this.textBox.resetChildVisibleState(icon);
        
        if (this.textBox.isTyping) {
            this.textBox.stop(true);
        } else {
            if (this.textBox.isLastPage) {
                if(this.isDialogueOver()) {
                    console.log("dialogue is over");
                    this.done = true;
                } else {
                    this.currLine++;

                    this.nameBox.text = this.lines[this.currLine].author;
                    this.textBox.start(this.lines[this.currLine].text, 20);
                }
            } else {
                this.textBox.typeNextPage();
            }

        }
    }

    public destroy() {
        this.background.destroy();
        this.textBox.destroy();
        this.nameBox.destroy();
    }
}