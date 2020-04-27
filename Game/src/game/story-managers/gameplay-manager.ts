import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";
import { Player } from "../player";
import { Npc } from "../npc";
import { Actor } from "../actor";
import { ActionBox } from "../ui/action-box";

export class GameplayManager extends EventManager{

    private npcs: Npc[] = [];
    private player: Player;

    constructor(scene: GameScene, name: string) {
        super(scene, name);
        this.populateActors();
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        this.player.move(keysPressed);

        this.sortActorDepths();
    }

    public populateActors() {

        let allActorsArray = this.scene.cache.json.get('actors').actors;

        this.initPlayer(allActorsArray);
        let actionBox = new ActionBox(this.scene, "Talk", this.player.getX(), this.player.getY() - 50);

        let npcsArray = this.jsonObj.npcs;

        for(let npcDesc of npcsArray) {
            let actor = allActorsArray.find(actor => actor.id == npcDesc.actorId);
            let x = npcDesc.position[0];
            let y = npcDesc.position[1];

            let interactable: boolean = false;
            if(npcDesc.isInteractableConditions === "always") {
                interactable = true;
            }

            this.addNpc(new Npc(this.scene, x, y, actor, interactable, this.player));
        }
    }

    private sortActorDepths() {
        let actorsSorted: Actor[] = [...this.npcs];
        actorsSorted.push(this.player);

        actorsSorted.sort((actor1, actor2) => {
            return actor1.getY() - actor2.getY();
        })

        let depth = GameScene.MIN_DEPTH;
        for(let actor of actorsSorted) {
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

        if(this.player !== undefined && this.player !== actor) {
            actor.setCollisionWith(this.player, this.scene);
        }

        for(let actor2 of this.npcs) {
            actor.setCollisionWith(actor2, this.scene);
        }
    }

    public initPlayer(actorsArray: any): Player {

        let actor = actorsArray.find(actor => actor.id == this.jsonObj.player.actorId);
        let x = this.jsonObj.player.startPosition[0];
        let y = this.jsonObj.player.startPosition[1];

        let player =  new Player(this.scene, x, y, actor);

        this.player = player;

        this.setCollisionsWithAllActors(player);
        this.scene.setActorCollisionsWithMap(player);
        player.getCameraToFollow(this.scene);

        return player;
    }

    public destroy() {
        this.player.destroy();
        
        for(let npc of this.npcs) {
            npc.destroy();
        }
    }
}