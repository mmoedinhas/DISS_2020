import * as filtrex from 'filtrex';
import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";
import { Player } from "../player";
import { Npc } from "../npc";
import { Actor } from "../actor";
import { IInteractable } from "../i-interactable";
import { getAssetIdFromPath } from "../../utils/paths";
import { IDialogueLine, ICoordinates } from "../../utils/interfaces";

export class GameplayManager extends EventManager {

    private npcs: Npc[] = [];
    private player: Player;
    private previousPlayerPos: ICoordinates;
    private interactableObj: IInteractable;
    private interacting: boolean;
    private emitter: Phaser.Events.EventEmitter;
    private flags: Map<string, boolean>;

    constructor(scene: GameScene, name: string, previousPlayerPos?: ICoordinates) {
        super(scene, name);
        this.previousPlayerPos = previousPlayerPos;
        this.populateActors();
        this.interacting = false;
        this.flags = this.initFlags();

        this.emitter = new Phaser.Events.EventEmitter();
        this.emitter.on('dialogueEnded', this.interactionEnded, this);
    }

    public act(time: number, delta: number, keysPressed: Phaser.Input.Keyboard.Key[]) {
        this.sortActorDepths();
        this.checkForPossibleInteraction();

        if (!this.interacting) {

            if (keysPressed.includes(GameScene.interactKey) && this.interactableObj !== undefined) {

                this.interactableObj.interact();
                this.interacting = true;

                this.scene.scene.wake('Dialogue');
                this.scene.scene.launch('Dialogue', { dialogue: this.interactableObj.dialogue, emitter: this.emitter });
            } else {
                this.player.move(keysPressed);
            }
        }

    }

    public populateActors() {

        let allActorsArray = this.scene.cache.json.get('actors').actors;

        this.initPlayer(allActorsArray);

        let npcsArray = this.jsonObj.npcs;

        for (let npcDesc of npcsArray) {
            let actor = allActorsArray.find(actor => actor.id == npcDesc.actorId);
            let x = npcDesc.position[0];
            let y = npcDesc.position[1];

            let interactable: boolean = false;
            if (npcDesc.isInteractableConditions === "always") {
                interactable = true;
            }

            this.addNpc(new Npc(this.scene, x, y, actor, interactable, this.player, npcDesc.dialogue));
        }

        // add dialogues
        for (let npc of this.npcs) {
            let dialogue = this.getDialogue(npc.getDialogueFilename());
            npc.instantiateDialogue(dialogue);
        }
    }

    public interactionEnded() {
        this.scene.scene.sleep('Dialogue');
        this.interacting = false;
        this.done = true;

        this.checkForPossibleInteraction();
    }

    private initFlags(): Map<string, boolean> {
        const flags: Map<string, boolean> = new Map();
        
        let expression = this.jsonObj.endEventCondition;
        console.log(expression);

        try {
            let filter = filtrex.compileExpression(expression);
            console.log("filter result: " + filter({grandmaGreeted: true}));
        } catch (err) {
            let errTokens: string[] = err.message.split('\n');
            let errString: string = errTokens[0] + "\n" + errTokens[1] + "\n" + errTokens[2];
            console.log(errString);
        }

        return flags;
    }

    private getDialogue(dialogueFilename: string): IDialogueLine[] {
        const dialogue: IDialogueLine[] = [];

        let key: string = getAssetIdFromPath(dialogueFilename);
        let dialogueObj = this.scene.cache.json.get(key);

        for (let lineDesc of dialogueObj.lines) {

            let line: IDialogueLine = {
                author: lineDesc.author,
                text: lineDesc.text
            };
            dialogue.push(line);
        }

        return dialogue;
    }

    private sortActorDepths() {
        let actorsSorted: Actor[] = [...this.npcs];
        actorsSorted.push(this.player);

        actorsSorted.sort((actor1, actor2) => {
            return actor1.getY() - actor2.getY();
        })

        let depth = GameScene.MIN_DEPTH;
        for (let actor of actorsSorted) {
            actor.setDepth(depth);
            depth++;
        }
    }

    private addNpc(newNpc: Npc) {

        this.setCollisionsWithAllActors(newNpc);

        this.scene.setActorCollisionsWithMap(newNpc);

        this.npcs.push(newNpc);
    }

    private setCollisionsWithAllActors(actor: Actor) {

        if (this.player !== undefined && this.player !== actor) {
            actor.setCollisionWith(this.player, this.scene);
        }

        for (let actor2 of this.npcs) {
            actor.setCollisionWith(actor2, this.scene);
        }
    }

    private checkForPossibleInteraction() {

        for (let npc of this.npcs) {
            if (npc.isPlayerInZone()) {

                if (this.interacting) {
                    npc.setActionBoxVisiblity(false);
                } else if (this.interactableObj === undefined) {
                    this.interactableObj = npc;
                    npc.setActionBoxVisiblity(true);
                }

                npc.setPlayerInZone(false);

            } else {

                if (this.interactableObj == npc) {
                    npc.setActionBoxVisiblity(false);
                    this.interactableObj = undefined;
                }

            }
        }
    }

    public initPlayer(actorsArray: any): Player {

        let actor = actorsArray.find(actor => actor.id == this.jsonObj.player.actorId);

        let x: number;
        let y: number;
        let player: Player;

        if (this.jsonObj.player.startPosition == "current") {

            if (this.previousPlayerPos == undefined) {
                x = 0;
                y = 0;
                player = new Player(this.scene, x, y, actor, false);
            } else {
                x = this.previousPlayerPos.x;
                y = this.previousPlayerPos.y;
                player = new Player(this.scene, x, y, actor, true);
            }

        } else {
            x = this.jsonObj.player.startPosition[0];
            y = this.jsonObj.player.startPosition[1];
            player = new Player(this.scene, x, y, actor, false);
        }

        this.player = player;

        this.setCollisionsWithAllActors(player);
        this.scene.setActorCollisionsWithMap(player);
        player.getCameraToFollow(this.scene);

        return player;
    }

    public getPlayerPosition(): ICoordinates {
        return {
            x: this.player.getX(),
            y: this.player.getY()
        }
    }

    public destroy() {
        this.player.destroy();

        for (let npc of this.npcs) {
            npc.destroy();
        }
    }
}