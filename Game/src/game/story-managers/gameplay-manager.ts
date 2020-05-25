import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";
import { Player } from "../player";
import { Npc } from "../npc";
import { Actor } from "../actor";
import { IInteractable } from "../i-interactable";
import { getAssetIdFromPath } from "../../utils/paths";
import { IDialogueLine, ICoordinates, IFlagChange } from "../../utils/interfaces";
import * as filter from "../../utils/filtrex";
import * as Logging from "../../utils/logging";

declare const DEBUG: boolean;

export class GameplayManager extends EventManager {

    private npcs: Npc[] = [];
    private player: Player;
    private previousPlayerPos: ICoordinates;
    private interactableObj: IInteractable;
    private interacting: boolean;
    private emitter: Phaser.Events.EventEmitter;
    private flags: Map<string, boolean | number>;
    private endCondition: string;

    constructor(scene: GameScene, name: string, previousPlayerPos?: ICoordinates) {
        super(scene, name);
        this.previousPlayerPos = previousPlayerPos;
        this.flags = this.initFlags();
        this.populateActors();
        
        this.interacting = false;
        this.endCondition = this.jsonObj.endEventCondition;

        this.emitter = new Phaser.Events.EventEmitter();
        this.emitter.on('dialogueEnded', this.interactionEnded, this);
    }

    public act(time: number, delta: number, keysPressed: Phaser.Input.Keyboard.Key[]) {

        if(this.checkForEnd()) {
            this.done = true;
            return;
        }

        this.sortActorDepths();
        this.checkForPossibleInteraction();

        if (!this.interacting) {

            if (keysPressed.includes(GameScene.interactKey) && this.interactableObj !== undefined) {

                this.interacting = true;

                this.scene.scene.wake('Dialogue');
                this.scene.scene.launch('Dialogue', { dialogue: this.interactableObj.dialogue, emitter: this.emitter });
            } else {
                this.player.move(keysPressed);
            }
        } else {
            this.player.move([]);
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

            this.addNpc(new Npc(this.scene, x, y, actor, npcDesc, this.flags));
        }
    }

    public interactionEnded() {
        this.scene.scene.sleep('Dialogue');
        this.interacting = false;
        this.implementFlagChanges(this.interactableObj.getFlagsChangesAfterInteraction());

        this.interactableObj = undefined;
        this.checkForPossibleInteraction();
    }

    private checkForEnd(): boolean {
        let filterResult: boolean | Error = filter.boolean(this.endCondition, this.flags);

        if (filterResult instanceof Error) {
            console.error("Error in end condition of event\n" + filterResult.message);
            return false;
        } else {
            return filterResult;
        }
    }

    private initFlags(): Map<string, boolean | number> {
        const flags: Map<string, boolean | number > = new Map();

        for(let flagObj of this.jsonObj.flags) {
            flags.set(flagObj.name, flagObj.value);
        }

        return flags;
    }

    private implementFlagChanges(flagChanges: IFlagChange[]) {

        if(DEBUG) {
            console.log(flagChanges);
        }
        
        for(let flagChange of flagChanges) {

            let filterResult: number | boolean | Error;
            if(typeof this.flags.get(flagChange.name) == "number") {
                filterResult = filter.number(flagChange.value, this.flags);
            } else if(typeof this.flags.get(flagChange.name) == "boolean") {
                filterResult = filter.boolean(flagChange.value, this.flags);
            }

            if (filterResult instanceof Error) {
                console.error("Error in flag changes of interactable\n" + filterResult.message);
            } else {
                this.flags.set(flagChange.name, filterResult);
            }
        }

        if(DEBUG) {
            console.log(this.flags);
        }

        Logging.flagChange(this.scene, this.flags);
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
            npc.setInteractable(this.flags);
            if(!npc.isInteractable()) continue;

            if (npc.isPlayerInZone(this.scene, this.player)) {

                if (this.interacting) {
                    npc.setActionBoxVisiblity(false);
                } else if (this.interactableObj === undefined) {
                    this.interactableObj = npc;
                    npc.setActionBoxVisiblity(true);
                }

            } else {

                if (this.interactableObj === npc) {
                    npc.setActionBoxVisiblity(false);
                    this.interactableObj = undefined;
                }

            }

            npc.setPlayerInZone(false);
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