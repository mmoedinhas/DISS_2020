import { Actor } from "./actor";
import { GameScene } from "./game-scene";
import { Player } from "./player";

export class Npc extends Actor {

    private interactable: boolean;
    private interactZone: Phaser.GameObjects.Zone;

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any, interactable: boolean, player: Player) {
        super(scene, x, y, actorObj);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable();
        this.interactable = interactable;
        this.createInteractZone(scene, player);
    }

    public setInteractable(interactable: boolean) {
        this.interactable = interactable;
    }

    public isInteractable(): boolean {
        return this.interactable;
    }

    public startDialogue(): boolean {
        console.log("I can interact with: " + this.id);

        return false;
    }

    private createInteractZone(scene: GameScene, player: Player) {
        const Zone = Phaser.GameObjects.Zone;

        let width = this.sprite.width + scene.getMap().tileWidth;
        let height = scene.getMap().tileHeight*2;

        let body: Phaser.Physics.Arcade.Body = this.sprite.body as Phaser.Physics.Arcade.Body;

        let x = this.sprite.x - this.sprite.width / 2.0 + body.offset.x + body.width / 2.0;
        let y = this.sprite.y - this.sprite.height + body.offset.y + body.height / 2.0;

        this.interactZone = new Zone(scene, x, y, width, height);

        scene.physics.add.existing(this.interactZone);
        player.setOverlapWithZone(this.interactZone, scene, this.startDialogue, this);
    }
}