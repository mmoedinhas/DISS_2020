import { Actor } from "./actor";
import { GameScene } from "./game-scene";
import { Player } from "./player";
import { ActionBox } from "./ui/action-box";
import { IInteractable } from "./i-interactable";
import { IDialogueLine, IFlagChange } from "../utils/interfaces";
import * as filter from "../utils/filtrex";
import { getAssetIdFromPath } from "../utils/paths";
import { isArcadeBody } from "../utils/type-predicates";

export class Npc extends Actor implements IInteractable {

    public dialogue: IDialogueLine[];

    private interactable: boolean;
    private interactZone: Phaser.GameObjects.Zone;
    private actionBox: ActionBox;
    private playerInZone: boolean;
    private interactableCondition: string;
    private flagsChangesAfterInteraction: IFlagChange[];

    constructor(scene: GameScene, x: number, y: number, actorObj: any, npcObj: any, flags: Map<string, boolean | number>, realCoordinates?: boolean) {
        super(scene, x, y, actorObj, realCoordinates);
        (this.sprite.body as Phaser.Physics.Arcade.Body).setImmovable();

        this.interactableCondition = npcObj.isInteractableConditions;
        this.dialogue = this.getDialogue(scene, npcObj.dialogue);
        this.flagsChangesAfterInteraction = npcObj.flagChangesAfterInteraction;

        this.setInteractable(flags);
        this.createInteractZone(scene);
        this.playerInZone = false;
        this.actionBox = new ActionBox(scene, "Talk", this.getX(), this.getY() - this.sprite.height, true);
    }

    public instantiateDialogue(dialogue: IDialogueLine[]) {
        this.dialogue = dialogue;
    }

    public setInteractable(flags: Map<string, boolean | number>) {

        let filterResult: boolean | Error = filter.boolean(this.interactableCondition, flags);
        if (filterResult instanceof Error) {
            console.error("Error in isInteractable flags of npc " + this.id + "\n" + filterResult.message);
            this.interactable = false;
            return;
        }

        this.interactable = filterResult as boolean;
    }

    public isInteractable(): boolean {
        return this.interactable;
    }

    public getFlagsChangesAfterInteraction(): IFlagChange[] {
        return this.flagsChangesAfterInteraction;
    }

    public isPlayerInZone(scene:GameScene, player: Player): boolean {

        return player.isOverlappingWithObject(scene, this.interactZone);

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

        // return false;
    }

    public setPlayerInZone(playerInZone: boolean) {
        this.playerInZone = playerInZone;
    }

    public setActionBoxVisiblity(visible: boolean) {
        if (visible) {
            this.actionBox.show();
        } else {
            this.actionBox.hide();
        }
    }

    public destroy() {
        this.sprite.destroy();
        this.actionBox.destroy();
    }

    private createInteractZone(scene: GameScene) {
        const Zone = Phaser.GameObjects.Zone;

        let width = this.sprite.width + scene.getMap().tileWidth;
        let height = scene.getMap().tileHeight * 2;

        let body: Phaser.Physics.Arcade.Body = this.sprite.body as Phaser.Physics.Arcade.Body;

        let x = this.sprite.x - this.sprite.width / 2.0 + body.offset.x + body.width / 2.0;
        let y = this.sprite.y - this.sprite.height + body.offset.y + body.height / 2.0;

        this.interactZone = new Zone(scene, x, y, width, height);

        scene.physics.add.existing(this.interactZone);
    }

    private getDialogue(scene: GameScene, dialogueFilename: string): IDialogueLine[] {
        const dialogue: IDialogueLine[] = [];

        let key: string = getAssetIdFromPath(dialogueFilename);
        let dialogueObj = scene.cache.json.get(key);

        for (let lineDesc of dialogueObj.lines) {

            let line: IDialogueLine = {
                author: lineDesc.author,
                text: lineDesc.text
            };
            dialogue.push(line);
        }

        return dialogue;
    }
}