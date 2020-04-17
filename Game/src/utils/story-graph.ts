import { IPlayerType, IGraph, IScene, IEvent, INode } from './interfaces';

export class StoryGraph {

    private playerType: IPlayerType;
    private graph: IGraph;
    private currScene: INode;
    private currEvent: INode;

    constructor(graph: IGraph, playerType: IPlayerType) {
        this.graph = graph;
        this.playerType = playerType;
    }

    private isScene(obj: IScene | IEvent | undefined): obj is IScene {
        return (obj as IScene).events !== undefined;
    }

    private isEvent(obj: IScene | IEvent | undefined): obj is IEvent {
        return (obj as IEvent).nextEvents !== undefined;
    }

    public getCurrScene() {
        return this.currScene;
    }
}