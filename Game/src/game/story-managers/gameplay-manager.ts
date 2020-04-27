import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";
import { Player } from "../player";
import { Npc } from "../npc";
import { Actor } from "../actor";

export class GameplayManager extends EventManager{

    private npcs: Npc[] = [];
    private player: Player;

    constructor(scene: GameScene, name: string) {
        super(scene, name);
        this.populateActors();
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        this.player.move(keysPressed);
    }

    public populateActors() {

        let allActorsArray = this.scene.cache.json.get('actors').actors;

        this.initPlayer(allActorsArray);

        let npcsArray = this.jsonObj.npcs;

        for(let npcDesc of npcsArray) {
            let actor = allActorsArray.find(actor => actor.id == npcDesc.actorId);
            let x = npcDesc.position[0];
            let y = npcDesc.position[1];

            let interactable: boolean = false;
            if(npcDesc.isInteractableConditions === "always") {
                interactable = true;
            }

            this.addNpc(new Npc(this.scene, x, y, actor, interactable));
        }
    }

    private addPlayer(player: Player) {
        
        
        this.player = player;
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
        
    }
}