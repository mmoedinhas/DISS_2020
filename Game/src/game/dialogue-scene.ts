import * as Phaser from 'phaser';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'Dialogue',
};

export class DialogueScene extends Phaser.Scene {

    constructor() {
        super(config);
    }
    
    public create() {
        this.add.image(320, 360, 'dialogue_box').setOrigin(0.5,1);
    }
}