import { IPlayerType, IScene, IEvent, IStory, ICoordinates } from '../../utils/interfaces';
import { CutsceneManager } from './cutscene-manager';
import { EventManager } from './event-manager';
import { GameplayManager } from './gameplay-manager';
import { GameScene } from '../game-scene';

export enum EventType {
    CUTSCENE,
    GAMEPLAY
}

export class StoryManager {

    private scene: GameScene;

    private playerType: IPlayerType;
    private story: IStory;

    private currEventIndex: integer;
    private currSceneIndex: integer;
    private currEventType: EventType;

    private previousPlayerPos: ICoordinates;

    private currEventManager: EventManager;

    constructor(scene: GameScene, story: IStory, playerType: IPlayerType) {
        this.scene = scene;
        this.story = story;
        this.playerType = playerType;

        this.currEventIndex = 0;
        this.currSceneIndex = 0;

        this.updateEventType();
    }

    public start(): EventManager {

        if (this.currEventManager !== undefined) {
            this.currEventManager.destroy();
        }

        let currEventManager: EventManager;

        switch (this.currEventType) {
            case EventType.GAMEPLAY:
                currEventManager = new GameplayManager(this.scene, this.getCurrEvent().name, this.previousPlayerPos);
                break;
            case EventType.CUTSCENE:
                currEventManager = new CutsceneManager(this.scene, this.getCurrEvent().name);
                break;
        }

        console.log(currEventManager);
        this.currEventManager = currEventManager;

        return currEventManager;
    }

    public next(): EventManager {

        let scene: IScene = this.getSceneAt(this.currSceneIndex);

        if (scene.events.length <= this.currEventIndex) {
            return;
        }

        this.previousPlayerPos = this.currEventManager.getPlayerPosition();

        this.currEventIndex++;

        if (scene.events.length <= this.currEventIndex) {
            return;
        }

        this.updateEventType();

        return this.start();
    }

    public updateEventType() {
        switch (this.getCurrEvent().type) {
            case "gameplay":
                this.currEventType = EventType.GAMEPLAY;
                break;
            case "cutscene":
                this.currEventType = EventType.CUTSCENE;
                break;
        }
    }

    public getEventAt(sceneIndex: integer, eventIndex: integer): IEvent {
        return this.story.scenes[sceneIndex].events[eventIndex];
    }

    public getSceneAt(sceneIndex: integer): IScene {
        return this.story.scenes[sceneIndex];
    }

    public getCurrScene(): IScene {
        return this.getSceneAt(this.currSceneIndex);
    }

    public getCurrEvent(): IEvent {
        return this.getEventAt(this.currSceneIndex, this.currEventIndex);
    }

    public getCurrentEventType(): EventType {
        return this.currEventType;
    }

    public act(time: number, delta: number, keysPressed: Phaser.Input.Keyboard.Key[]) {

        if (this.currEventManager.isDone()) {
            this.next();
        } else {
            this.currEventManager.act(time, delta, keysPressed);
        }
    }
}