import { EventManager } from "./event-manager";
import { Action } from "./action";
import { GameScene } from "../game-scene";
import { IBodySpecs } from "../../utils/interfaces";
import { Actor } from "../actor";

export class CutsceneManager extends EventManager{

    private actions: Action;

    constructor(scene: GameScene, name: string) {
        super(scene, name);
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        
    }

    public populateActors(scene: GameScene) {
        for(let actor of scene.actors) {
            actor.sprite.destroy();
        }

        scene.actors = [];

        let actorsFromEventObj = this.jsonObj.actors;
        let allActorsObj = scene.cache.json.get('actors').actors;

        for(let actorDesc of actorsFromEventObj) {
            let actor = allActorsObj.find(actor => actor.id == actorDesc.actorId);
            let x = actorDesc.start[0];
            let y = actorDesc.start[1];

            let bodySpecs: IBodySpecs = {
                width: actor.body.width,
                height: actor.body.height,
                anchor: actor.body.anchor
            };

            scene.actors.push(new Actor(scene, x, y, actor.tilesetId, actor.defaultFrame, bodySpecs));
        }
    }
}