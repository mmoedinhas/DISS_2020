import { IPlayerType, IScene, IEvent, IStory, IFileBundle, IFile } from '../utils/interfaces';

export class StoryManager {

    private playerType: IPlayerType;
    private story: IStory;

    private currEventIndex: integer;
    private currSceneIndex: integer;

    constructor(story: IStory, playerType: IPlayerType) {
        this.story = story;
        this.playerType = playerType;

        this.currEventIndex = 0;
        this.currSceneIndex = 0;
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
}