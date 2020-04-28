import { Actor } from "./actor";
import { GameScene } from "./game-scene";
import { Player } from "./player";
import { ActionBox } from "./ui/action-box";
import { isArcadeBody } from "../utils/type-predicates";
import { IInteractable } from "./i-interactable";
import { IDialogue } from "../utils/interfaces";

export class Npc extends Actor implements IInteractable {

    private interactable: boolean;
    private interactZone: Phaser.GameObjects.Zone;
    private actionBox: ActionBox;
    private playerInZone: boolean;
    private dialogue: IDialogue;
    private dialogueFilename: string;

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any, interactable: boolean, player: Player, dialogueFilename: string) {
        super(scene, x, y, actorObj);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable();
        this.interactable = interactable;
        this.createInteractZone(scene, player);
        this.playerInZone = false;
        this.actionBox = new ActionBox(scene, "Talk", this.getX(), this.getY() - this.sprite.height, true);
        this.dialogueFilename = dialogueFilename;
    }

    public instantiateDialogue(dialogue: IDialogue) {
        this.dialogue = dialogue;
    }

    public getDialogueFilename(): string {
        return this.dialogueFilename;
    }

    public setInteractable(interactable: boolean) {
        this.interactable = interactable;
    }

    public isInteractable(): boolean {
        return this.interactable;
    }

    public isPlayerInZone(): boolean {

        // if (isArcadeBody(this.interactZone.body)) {
        //     if (this.interactZone.body.embedded) {
        //         this.interactZone.body.touching.none = false;
        //     }

        //     if ((!this.interactZone.body.touching.none
        //         || this.interactZone.body.wasTouching.none)
        //         && this.playerInZone) {
        //         return true;
        //     }
        // }

        return this.playerInZone;

        //return false;
    }

    public setPlayerInZone(playerInZone: boolean) {
        this.playerInZone = playerInZone;
    }

    public setActionBoxVisiblity(visible: boolean) {
        if(visible) {
            this.actionBox.show()
        } else {
            this.actionBox.hide();
        }
    }

    public interact() {

    }

    private createInteractZone(scene: GameScene, player: Player) {
        const Zone = Phaser.GameObjects.Zone;

        let width = this.sprite.width + scene.getMap().tileWidth;
        let height = scene.getMap().tileHeight * 2;

        let body: Phaser.Physics.Arcade.Body = this.sprite.body as Phaser.Physics.Arcade.Body;

        let x = this.sprite.x - this.sprite.width / 2.0 + body.offset.x + body.width / 2.0;
        let y = this.sprite.y - this.sprite.height + body.offset.y + body.height / 2.0;

        this.interactZone = new Zone(scene, x, y, width, height);

        scene.physics.add.existing(this.interactZone);
        player.setOverlapWithZone(this.interactZone, scene, () => {
            this.playerInZone = true;
            return false;
        }, this);
    }
}