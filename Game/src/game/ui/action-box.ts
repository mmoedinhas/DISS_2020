import * as Phaser from 'phaser';
import { TextBox, Label } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';

export class ActionBox {

    private scene: Phaser.Scene;
    private action: string;

    // Components
    private textLabel: Label;
    private tween: Phaser.Tweens.Tween;

    // CONSTS
    private fontFamily: string = 'MatchupPro';
    private fontSize: string = '25px';
    private stroke: string = '#000000';
    private strokeThickness: number = 2;

    constructor(scene: Phaser.Scene, action: string, x: number, y: number, hidden: boolean) {

        scene.anims.create({
            key: 'zKeyAnimation',
            frames: scene.anims.generateFrameNumbers('zkey', { frames: [0, 1] }),
            frameRate: 2,
            repeat: -1
        });

        this.scene = scene;
        this.action = action;

        this.textLabel = this.createLabel(x, y);

        if(hidden) {
            this.hide();
        }
    }

    public hide() {
        let scene = this.scene as any;
        scene.rexUI.hide(this.textLabel);
        scene.rexUI.getTopmostSizer(this.textLabel).layout();
    }

    public show() {
        let scene = this.scene as any;
        scene.rexUI.show(this.textLabel);
        scene.rexUI.getTopmostSizer(this.textLabel).layout();
    }

    public destroy() {
        this.textLabel.destroy();
    }

    private createLabel(x: number, y: number): Label {

        let label = new Label(this.scene, {
            x: x,
            y: y,
            height: 20,
            //background: this.scene.add.image(0, 0, 'dialogue_box'),
            text: this.getActionText(this.scene, this.action),
            icon: this.getIcon(this.scene)
        }).setOrigin(0.5, 1).layout();

        // (this.scene as any).rexUI.hide(label);
        // (this.scene as any).rexUI.show(label);

        // this.tween = this.scene.tweens.add({
        //     targets: label,
        //     y: '+=10', // '+=100'
        //     ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
        //     duration: 700,
        //     repeat: -1, // -1: infinity
        //     yoyo: true
        // });

        return label;
    }

    private getActionText(scene: Phaser.Scene, action: string): Phaser.GameObjects.Text {
        let txt = scene.add.text(0, 0, action, {
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            strokeThickness: this.strokeThickness,
            stroke: this.stroke,
            maxLines: 1
        }).setResolution(20);

        txt.depth = 9999;

        return txt;
    }

    private getIcon(scene: Phaser.Scene): Phaser.GameObjects.Sprite {
        let icon: Phaser.GameObjects.Sprite = scene.add.sprite(0, 0, 'zkey', 0);
        icon.anims.play('zKeyAnimation');

        icon.depth = 9999;

        return icon;
    }
}