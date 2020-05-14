let EmotionalValidator = require('./emotionalValidator.js');

const palette = {
    blue: '#8ecce6',
    purple: '#d5cdea',
    pink: '#fae2ef',
    yellow: '#fcf8e9',
    grey: '#d0d5db',
    dead: '#dbdbdb',
    orange: '#ffb875'
};

function createStoryLine(playerType, graph, isDefault, currEventName) {

    paintAllGray(graph);

    const scenesNodes = getScenes(graph, playerType, isDefault);
    let nodesToPaintIds = [];

    for (sceneNode of scenesNodes) {
        nodesToPaintIds.push(sceneNode.id);
        let ids = getOrganizedEventsIds(playerType, sceneNode, graph, isDefault);
        nodesToPaintIds = nodesToPaintIds.concat(ids);
    }

    paintOriginalColor(graph, nodesToPaintIds);

    if (currEventName) {
        let currNode = graph.nodes.find(node => node.id.includes(currEventName));
        currNode.color = palette['orange'];
        currNode.size = 20;
    }

    return graph;
}

function paintAllGray(graph) {

    for (node of graph.nodes) {

        if (node.id == "start") {
            continue;
        }

        node.oldColor = node.color;
        node.color = palette['dead'];
        node.labelColor = palette['dead'];
        node.size = 1;
    }

    for (edge of graph.edges) {

        if (edge.source == "start") {
            continue;
        }

        edge.oldColor = edge.color;
        edge.color = palette['dead'];
        edge.labelColor = palette['dead'];
    }
}

function paintOriginalColor(graph, nodesToPaintIds) {

    for (id of nodesToPaintIds) {
        let node = graph.nodes.find(node => node.id == id);
        node.color = node.oldColor;
        node.labelColor = undefined;

        if (isScene(node)) {
            let edge = graph.edges.find(edge => edge.target == node.id);
            let locationNode = graph.nodes.find(node => node.id == edge.source);

            locationNode.color = locationNode.oldColor;
            locationNode.labelColor = undefined;

            edge.color = edge.oldColor;
            edge.labelColor = undefined;
        } else {
            let edge = graph.edges.find(edge => edge.target == node.id && nodesToPaintIds.includes(edge.source));

            edge.color = edge.oldColor;
            edge.labelColor = undefined;
        }
    }
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

function getScenes(graph, playerType, isDefault) {
    let scenes = [];

    let locationNodes = graph.nodes.filter(node => isLocation(node));
    for (locationNode of locationNodes) {
        let locationScenes = getNextNodes(locationNode, graph);
        sortByPriority(locationScenes);

        if (isDefault) {
            for (let node of locationScenes) {
                let scene = node.obj;
                if (scene.emotionalRequirements.length === 0) {
                    scenes.push(node);
                    break;
                }
            }
        } else {
            let emotionalVal = new EmotionalValidator(playerType);
            for (let node of locationScenes) {
                let scene = node.obj;
                if (emotionalVal.matches(scene.emotionalRequirements)) {
                    scenes.push(node);
                    break;
                }
            }
        }
    }

    return scenes;
}

function isLocation(node) {
    return node.id.indexOf("location_") == 0;
}

function isScene(node) {
    return node.id.indexOf("scene_") == 0;
}

function getOrganizedEventsIds(playerType, scene, graph, isDefault) {
    let organizedEvents = [];

    let nextEventNode = getNextEventNode(scene, graph, playerType, isDefault);
    while (nextEventNode != undefined) {

        organizedEvents.push(nextEventNode.id);

        nextEventNode = getNextEventNode(nextEventNode, graph, playerType, isDefault);
    }

    return organizedEvents;
}

function getNextEventNode(node, graph, playerType, isDefault) {
    let nextNodes = getNextNodes(node, graph);
    sortByPriority(nextNodes);

    if (isDefault) {
        for (let node of nextNodes) {

            let event = node.obj;
            if (event.emotionalRequirements.length == 0) {
                return node;
            }
        }
    } else {
        let emotionalVal = new EmotionalValidator(playerType);
        for (let node of nextNodes) {

            let event = node.obj;
            if (emotionalVal.matches(event.emotionalRequirements)) {
                return node;
            }
        }
    }

    return undefined;
}

module.exports = createStoryLine;