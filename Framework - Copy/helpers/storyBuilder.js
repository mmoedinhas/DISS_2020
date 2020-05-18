let EmotionalValidator = require('./emotionalValidator.js');

function buildStory(playerType, graph) {

    const story = {
        scenes: []
    }

    const scenesNodes = [];

    let firstSceneNode = getFirstScene(graph, playerType);
    scenesNodes.push(firstSceneNode);

    for (sceneNode of scenesNodes) {
        sceneNode.obj.events = getOrganizedEvents(playerType, sceneNode, graph);
        story.scenes.push(sceneNode.obj);
    }

    return story;
}

function sortByPriority(nodes) {
    nodes.sort((nodeA, nodeB) => {
        return nodeA.obj.priority - nodeB.obj.priority
    });
}

function getNextNodes(node, graph) {
    let edgesFromNode = getEdgesFromNode(node, graph);
    let nodes = [];

    for (let edge of edgesFromNode) {
        nodes.push(graph.nodes.find(node => node.id === edge.target));
    }

    return nodes;
}

function getEdgesFromNode(node, graph) {
    let edges = graph.edges.filter(edge => edge.source === node.id);
    return edges;
}

function getFirstScene(graph, playerType) {
    let startNode = graph.nodes.find(node => node.id === 'start');
    let firstLocation = getNextNodes(startNode, graph)[0];
    let firstScenes = getNextNodes(firstLocation, graph);

    sortByPriority(firstScenes);

    let emotionalVal = new EmotionalValidator(playerType);
    for (let node of firstScenes) {
        let scene = node.obj;
        if (emotionalVal.matches(scene.emotionalRequirements)) {
            return node;
        }
    }
}

function getOrganizedEvents(playerType, scene, graph) {
    let organizedEvents = [];

    let nextEventNode = getNextEventNode(scene, graph, playerType);
    while (nextEventNode != undefined) {

        organizedEvents.push(nextEventNode.obj);

        nextEventNode = getNextEventNode(nextEventNode, graph, playerType);
    }

    return organizedEvents;
}

function getNextEventNode(node, graph, playerType) {
    let nextNodes = getNextNodes(node, graph);
    sortByPriority(nextNodes);

    let emotionalVal = new EmotionalValidator(playerType);
    for (let node of nextNodes) {

        let event = node.obj;
        if (emotionalVal.matches(event.emotionalRequirements)) {
            return node;
        }
    }

    return undefined;
}

module.exports = buildStory;