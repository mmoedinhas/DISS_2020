import { Actor } from "./actor";
import { GameScene } from "./game-scene";

export class Npc extends Actor {

    private interactable: boolean;

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any, interactable: boolean) {
        super(scene, x, y, actorObj);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable();
        this.interactable = interactable;
    }

    public setInteractable(interactable: boolean) {
        this.interactable = interactable;
    }

    public isInteractable(): boolean {
        return this.interactable;
    }
}