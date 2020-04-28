import { EventManager } from "./event-manager";
import { Action } from "./cutscene-actions/action";
import { GameScene } from "../game-scene";
import { IBodySpecs, IDialogueLine } from "../../utils/interfaces";
import { Actor } from "../actor";
import { Walk } from "./cutscene-actions/walk";
import { Talk } from "./cutscene-actions/talk";

export class CutsceneManager extends EventManager {

    private actions: Action[] = [];
    private currActionIndex: integer;

    private actors: Actor[] = [];

    constructor(scene: GameScene, name: string) {
        super(scene, name);
        this.populateActors();
        this.currActionIndex = 0;
        this.instantiateActions();
    }

    public act(time: number, delta: number, keysPressed: Phaser.Input.Keyboard.Key[]) {

        if (this.currActionIndex < this.actions.length) {
            if (this.actions[this.currActionIndex].isDone()) {
                this.currActionIndex++;
            }
        }

        this.sortActorDepths();

        if (this.currActionIndex < this.actions.length) {
            this.actions[this.currActionIndex].act(time, delta, keysPressed);
        } else {
            this.done = true;
        }

    }

    public populateActors() {

        let actorsFromEventObj = this.jsonObj.actors;
        let allActorsObj = this.scene.cache.json.get('actors').actors;

        for (let actorDesc of actorsFromEventObj) {
            let actor = allActorsObj.find(actor => actor.id == actorDesc.actorId);
            let x = actorDesc.start[0];
            let y = actorDesc.start[1];

            this.addActor(new Actor(this.scene, x, y, actor));
        }
    }

    public addActor(newActor: Actor) {

        this.scene.setActorCollisionsWithMap(newActor);
        this.actors.push(newActor);
    }

    public getActorById(actorId: string): Actor {
        return this.actors.find(actor => actor.getId() === actorId);
    }

    public instantiateActions() {
        let actionsObj = this.jsonObj.actions;

        for (let actionObj of actionsObj) {

            let actor: Actor = this.getActorById(actionObj.actorId);

            switch (actionObj.action) {
                case "walk":
                    this.actions.push(new Walk(this.scene, actor, actionObj.arguments.x, actionObj.arguments.y));
                    break;
                case "talk":
                    this.actions.push(new Talk(this.scene, actor, [{
                        author: actionObj.arguments.author,
                        text: actionObj.arguments.text
                    }]));
                    break;
            }
        }
    }

    public destroy() {
        for (let actor of this.actors) {
            actor.destroy();
        }
    }

    private sortActorDepths() {
        let actorsSorted: Actor[] = [...this.actors];

        actorsSorted.sort((actor1, actor2) => {
            return actor1.getY() - actor2.getY();
        })

        let depth = GameScene.MIN_DEPTH;
        for (let actor of actorsSorted) {
            actor.setDepth(depth);
            depth++;
        }
    }
}