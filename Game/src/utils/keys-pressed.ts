import * as Phaser from 'phaser';

export function isKeyPressed(keysPressed: Phaser.Input.Keyboard.Key[], keyCode: number): boolean {

    let key: Phaser.Input.Keyboard.Key = keysPressed.find(key => key.keyCode == keyCode);

    return key !== undefined;
}