import { EventManager } from "./event-manager";
import { Action } from "./cutscene-actions/action";
import { GameScene } from "../game-scene";
import { IBodySpecs } from "../../utils/interfaces";
import { Actor } from "../actor";
import { Walk } from "./cutscene-actions/walk";

export class CutsceneManager extends EventManager{

    private actions: Action[] = [];
    private currActionIndex: integer;

    constructor(scene: GameScene, name: string) {
        super(scene, name);
        this.currActionIndex = 0;
        this.instantiateActions();
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {

        if(this.currActionIndex < this.actions.length) {
            if(this.actions[this.currActionIndex].isDone()) {
                this.currActionIndex++;
            }
        }

        if(this.currActionIndex < this.actions.length) {
            this.actions[this.currActionIndex].act();
        }
        
    }

    public populateActors() {
        for(let actor of this.scene.actors) {
            actor.destroy();
        }

        this.scene.actors = [];

        let actorsFromEventObj = this.jsonObj.actors;
        let allActorsObj = this.scene.cache.json.get('actors').actors;

        for(let actorDesc of actorsFromEventObj) {
            let actor = allActorsObj.find(actor => actor.id == actorDesc.actorId);
            let x = actorDesc.start[0];
            let y = actorDesc.start[1];

            let bodySpecs: IBodySpecs = {
                width: actor.body.width,
                height: actor.body.height,
                anchor: actor.body.anchor
            };

            this.scene.actors.push(new Actor(this.scene, x, y, actor));
        }
    }

    public instantiateActions() {
        let actionsObj = this.jsonObj.actions;

        for(let actionObj of actionsObj) {
            
            switch(actionObj.action) {
                case "walk":
                    this.actions.push(new Walk(this.scene, actionObj.actorId, actionObj.arguments.x, actionObj.arguments.y));
                    break;
                case "talk":
                    break;
            }
        }
        
    }
}