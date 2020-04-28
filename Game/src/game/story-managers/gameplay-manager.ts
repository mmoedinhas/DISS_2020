import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";
import { Player } from "../player";
import { Npc } from "../npc";
import { Actor } from "../actor";
import { IInteractable } from "../i-interactable";
import { getAssetIdFromPath } from "../../utils/paths";
import { IDialogueLine } from "../../utils/interfaces";

export class GameplayManager extends EventManager {

    private npcs: Npc[] = [];
    private player: Player;
    private interactableObj: IInteractable;
    private interacting: boolean;

    constructor(scene: GameScene, name: string) {
        super(scene, name);
        this.populateActors();
        this.interacting = false;
    }

    public act(time: number, delta: number, keysPressed: Phaser.Input.Keyboard.Key[]) {
        this.sortActorDepths();
        this.checkForPossibleInteraction();

        if(!this.interacting) {

            if(keysPressed.includes(GameScene.interactKey)) {
                this.interactableObj.interact();
                this.interacting = true;
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
            let dialogue = this.getDialogue(npc.getDialogueFilename(), npcsArray);
            npc.instantiateDialogue(dialogue);
        }
    }

    private getDialogue(dialogueFilename: string, actorsArray): IDialogueLine[] {
        const dialogue: IDialogueLine[] = [];

        let allActors: Actor[] = [...this.npcs];
        allActors.push(this.player);

        let key: string = getAssetIdFromPath(dialogueFilename);
        let dialogueObj = this.scene.cache.json.get(key);
        
        let participatingActors: Actor[] = [];
        for(let actorId of dialogueObj.actorsIds) {
            let actor: Actor = allActors.find(actor => actor.getId() === actorId);

            if(actor !== undefined) {
                participatingActors.push(actor);
            }
        }

        for(let lineDesc of dialogueObj.lines) {
            let author: Actor = participatingActors.find(actor => actor.getId() === lineDesc.author);

            if(author !== undefined) {
                let line: IDialogueLine = {
                    author: author.getName(),
                    text: lineDesc.text
                };
                dialogue.push(line);
            }
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

                if(this.interacting) {
                    npc.setActionBoxVisiblity(false);
                } else if (this.interactableObj === undefined) {
                    this.interactableObj = npc;
                    npc.setActionBoxVisiblity(true);
                }

                npc.setPlayerInZone(false);

            } else {

                if(this.interactableObj == npc) {
                    npc.setActionBoxVisiblity(false);
                    this.interactableObj = undefined;
                }
                
            }
        }
    }

    public initPlayer(actorsArray: any): Player {

        let actor = actorsArray.find(actor => actor.id == this.jsonObj.player.actorId);
        let x = this.jsonObj.player.startPosition[0];
        let y = this.jsonObj.player.startPosition[1];

        let player = new Player(this.scene, x, y, actor);

        this.player = player;

        this.setCollisionsWithAllActors(player);
        this.scene.setActorCollisionsWithMap(player);
        player.getCameraToFollow(this.scene);

        return player;
    }

    public destroy() {
        this.player.destroy();

        for (let npc of this.npcs) {
            npc.destroy();
        }
    }
}