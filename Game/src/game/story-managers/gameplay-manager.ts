import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";
import { Player } from "../player";
import { Npc } from "../npc";

export class GameplayManager extends EventManager{

    constructor(scene: GameScene, name: string) {
        super(scene, name);
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        this.scene.getPlayer().move(keysPressed);
    }

    public populateActors() {

        let allActorsArray = this.scene.cache.json.get('actors').actors;

        this.scene.setPlayer(this.initPlayer(allActorsArray));

        let npcsArray = this.jsonObj.npcs;

        for(let npcDesc of npcsArray) {
            let actor = allActorsArray.find(actor => actor.id == npcDesc.actorId);
            let x = npcDesc.position[0];
            let y = npcDesc.position[1];

            this.scene.addActor(new Npc(this.scene, x, y, actor));
        }
    }

    public initPlayer(actorsArray: any): Player {

        let actor = actorsArray.find(actor => actor.id == this.jsonObj.player.actorId);
        let x = this.jsonObj.player.startPosition[0];
        let y = this.jsonObj.player.startPosition[1];

        return new Player(this.scene, x, y, actor);
    }
}