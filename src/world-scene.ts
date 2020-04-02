import * as Phaser from 'phaser';

const WorldSceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    key: 'WorldScene',
};

export class WorldScene extends Phaser.Scene {

    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };

    constructor() {
        super(WorldSceneConfig);
    }

    public create() {
        this.square = this.add.rectangle(100, 100, 100, 100, 0xFFFFFF) as any;
        this.physics.add.existing(this.square);
      }
}