import { Actor } from "./actor";
import { GameScene } from "./game-scene";

export class Npc extends Actor {

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any) {
        super(scene, x, y, actorObj);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable();
    }
}