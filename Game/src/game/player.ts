import { Actor } from './actor';
import { GameScene } from './game-scene';
import { IBodySpecs } from '../utils/interfaces';
import { isKeyPressed } from '../utils/keys-pressed';
import { isArcadeBody } from '../utils/type-predicates';

export class Player extends Actor {

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any, realCoordinates?: boolean) {
        super(scene, x, y, actorObj, realCoordinates);
    }

    public move(keysPressed:Phaser.Input.Keyboard.Key[]) {

        const keyboard = Phaser.Input.Keyboard;

        let body: Phaser.Physics.Arcade.Body;

        if(isArcadeBody(this.sprite.body)) {
            body = this.sprite.body;
        }

        body.setVelocity(0);

        if(isKeyPressed(keysPressed, keyboard.KeyCodes.DOWN)) {
            body.setVelocityY(this.velocity);
        }

        if(isKeyPressed(keysPressed, keyboard.KeyCodes.UP)) {
            body.setVelocityY(this.velocity * -1);
        }

        if(isKeyPressed(keysPressed, keyboard.KeyCodes.LEFT)) {
            body.setVelocityX(this.velocity * -1);
        }

        if(isKeyPressed(keysPressed, keyboard.KeyCodes.RIGHT)) {
            body.setVelocityX(this.velocity);
        }
    }
}