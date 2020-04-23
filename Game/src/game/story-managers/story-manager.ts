import { IPlayerType, IScene, IEvent, IStory } from '../../utils/interfaces';
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

    private currEventManager: EventManager;

    constructor(scene: GameScene, story: IStory, playerType: IPlayerType) {
        this.scene = scene;
        this.story = story;
        this.playerType = playerType;

        this.currEventIndex = 0;
        this.currSceneIndex = 0;

        this.updateEventType();   
    }

    public start() {
        switch(this.currEventType) {
            case EventType.GAMEPLAY:
                this.currEventManager = new GameplayManager(this.scene, this.getCurrEvent().name);
                break;
            case EventType.CUTSCENE:
                this.currEventManager = new CutsceneManager(this.scene, this.getCurrEvent().name);
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

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        this.currEventManager.act(time, delta, keysPressed);
    }

    private updateEventType() {
        switch(this.getCurrEvent().type) {
            case "gameplay":
                this.currEventType = EventType.GAMEPLAY;
                break;
            case "cutscene":
                this.currEventType = EventType.CUTSCENE;
                break;
        }
    }
}