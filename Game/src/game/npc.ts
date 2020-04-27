import { Actor } from "./actor";
import { GameScene } from "./game-scene";
import { Scene } from "phaser";
import { ICoordinates } from "../utils/interfaces";
import { toRealMapCoordinates } from "../utils/coordinates";

export class Npc extends Actor {

    private interactable: boolean;
    private interactZone: Phaser.GameObjects.Zone;

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any, interactable: boolean) {
        super(scene, x, y, actorObj);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable();
        this.interactable = interactable;
        this.createInteractZone(scene, x, y);
    }

    public setInteractable(interactable: boolean) {
        this.interactable = interactable;
    }

    public isInteractable(): boolean {
        return this.interactable;
    }

    private createInteractZone(scene: GameScene, x: integer, y: integer) {
        const Zone = Phaser.GameObjects.Zone;
        let mapCoords: ICoordinates = toRealMapCoordinates(x, y, scene.getMap());

        let width = this.sprite.width + scene.getMap().tileWidth*2;
        let height = scene.getMap().tileHeight*2;

        this.interactZone = new Zone(scene, mapCoords.x, mapCoords.y, width, height);

        scene.physics.add.existing(this.interactZone);
    }
}