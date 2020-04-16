import { IPlayerType, IGraph, IScene, IEvent, INode, IEdge } from './interfaces';
import { EmotionalValidator } from './emotional-validator';

export class StoryGraph {

    private playerType: IPlayerType;
    private graph: IGraph;
    private currScene: INode;
    private currEvent: INode;

    constructor(graph: IGraph, playerType: IPlayerType) {
        this.graph = graph;
        this.playerType = playerType;
    }

    public start(): INode {
        let startNode:INode = this.graph.nodes.find(node => node.id === 'start');
        let firstScenes:INode[] = this.getNextNodes(startNode);

        this.sortByPriority(firstScenes);

        let emotionalVal: EmotionalValidator = new EmotionalValidator(this.playerType);
        for(let node of firstScenes) {
            let scene = node.obj as IScene;
            if(emotionalVal.matches(scene.emotionalRequirements)) {
                this.currScene = node;
                break;
            }
        }

        return this.currScene;
    }

    private getNextNodes(node: INode): INode[] {
        let edgesFromNode = this.getEdgesFromNode(node);
        let nodes:INode[] = [];

        for(let edge of edgesFromNode) {
            nodes.push(this.graph.nodes.find(node => node.id === edge.target));
        }

        return nodes;
    }

    private getEdgesFromNode(node: INode): IEdge[] {
        let edges:IEdge[] = this.graph.edges.filter(edge => edge.source === node.id);
        return edges;
    }

    private sortByPriority(nodes: INode[]) {
        nodes.sort((nodeA, nodeB) => {

            if((this.isScene(nodeA.obj) || this.isEvent(nodeA.obj)) 
                && (this.isScene(nodeB.obj) || this.isEvent(nodeB.obj))) {
                    return nodeA.obj.priority - nodeB.obj.priority
                }
        });
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