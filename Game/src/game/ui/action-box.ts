import * as Phaser from 'phaser';
import { TextBox, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js';

export class ActionBox {

    private scene: Phaser.Scene;
    private action: string;

    // Components
    private textBox: Label;

    // CONSTS
    private fontFamily: string = 'MatchupPro';
    private fontSize: string = '25px';
    private stroke: string = '#000000';
    private strokeThickness: number = 2;

    constructor(scene: Phaser.Scene, action: string, x: number, y: number) {

        scene.anims.create({
            key: 'zKeyAnimation',
            frames: scene.anims.generateFrameNumbers('zkey', { frames: [0, 1] }),
            frameRate: 2,
            repeat: -1
        });

        action = "Talk";

        this.scene = scene;
        this.action = action;

        this.textBox = this.createLabel(x, y);
    }

    private createLabel(x: number, y: number): Label {

        let label = new Label(this.scene, {
            x: x,
            y: y,
            text: this.getActionText(this.scene, this.action),
            icon: this.getIcon(this.scene)
            //icon: this.scene.add.existing(new RoundRectangle(this.scene, 0, 0, 0, 0, 10, 0x7b5e57))
        }).setOrigin(0.5, 1).layout();

        return label;
    }

    private getActionText(scene: Phaser.Scene, action: string): Phaser.GameObjects.Text {
        let txt = scene.add.text(0, 0, action, {
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            strokeThickness: this.strokeThickness,
            stroke: this.stroke,
            maxLines: 1
        });

        txt.depth = 9999;

        return txt;
    }

    private getIcon(scene: Phaser.Scene): Phaser.GameObjects.Sprite {
        let icon: Phaser.GameObjects.Sprite  = scene.add.sprite(0,0,'zkey',0);
        icon.anims.play('zKeyAnimation');

        icon.depth = 9999;

        return icon;
    }
}