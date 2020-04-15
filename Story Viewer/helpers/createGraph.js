let Stack = require('./stack.js');

const graph = {
    nodes: [],
    edges: []
};

let errors = [];

const palette = {
    blue: '#8ecce6',
    purple: '#d5cdea',
    pink: '#fae2ef',
    yellow: '#fcf8e9',
    grey: '#d0d5db'
};

let x = 0.0;
let y = 0.0;

function createGraph(jsonObj) {

    errors = [];
    graph.nodes = [];
    graph.edges = [];
    x = 0.0;
    y = 0.0;

    graph.nodes.push({
        id: "start",
        label: "Start",
        type: 'circle',
        x: x,
        y: y,
        size: 1,
        color: palette['grey']
    });

    y += 0.1;

    const firstScenes = jsonObj['scenes'].filter(scene => jsonObj['firstLocation'] === scene['locationId']);

    if(firstScenes.length == 0) {
        let error = "No scenes have a location id corresponding to the first location";
        errors.push(error);
    }

    for (scene of firstScenes) {
        parseScene(scene, 'start');
    }

    const otherScenes = jsonObj['scenes'].filter(scene => !firstScenes.includes(scene));
    for (scene of otherScenes) {
        parseScene(scene);
    }

    return {graph: graph, errors: errors};
}


function getFirstEvents(scene) {
    let events = scene['events'];
    let firstEventsNames = scene['firstEvents'];
    let firstEvents = [];

    for (eventName of firstEventsNames) {
        let event = events.find(event => event['name'] === eventName);

        if(event === undefined) {
            let error = "First event " + eventName + " in scene " + scene['name'] + " is undefined";
            errors.push(error);
        } else {
            firstEvents.push(event);
        }
    }

    return firstEvents;
}

function parseScene(scene, parentId) {

    let sceneY = y;
    let sceneX = x;
    let id = getSceneId(scene);

    graph.nodes.push({
        id: id,
        label: scene['name'],
        type: 'circle',
        x: x,
        y: sceneY,
        size: 1,
        color: palette['blue']
    });

    sceneY += 0.1;

    if(parentId !== undefined) {
        let label = createLabel(scene['emotionalRequirements'], scene['priority']);
        graph.edges.push({
            id: getEdgeId(parentId, id),
            label: label,
            source: parentId,
            target: id,
            size: 1
        })
    }

    let firstEvents = getFirstEvents(scene);

    let coords = {
        x: sceneX,
        y: sceneY
    }

    for (event of firstEvents) {
        drawNodesAfterEvent(scene, event, coords);
        coords.x += 0.1;
    }

    for (event of firstEvents) {
        drawEdgesBetweenEvents(scene, event);
    }

    x = coords.x;
}

function drawNodesAfterEvent(scene, event, coords) {

    let y = coords.y;
    let events = scene['events'];

    let stack = new Stack();
    let visited = [];

    stack.push(event);

    let currEvent;
    while (!stack.isEmpty()) {

        currEvent = stack.pop();

        let eventProperties = getEventNodeProperties(currEvent);
        if (!visited.includes(currEvent['name'])
            && !isNodeInGraph(eventProperties.id)) {

            graph.nodes.push({
                id: eventProperties.id,
                label: currEvent['name'],
                type: eventProperties.type,
                x: coords.x,
                y: y,
                size: 1,
                color: eventProperties.color
            });
            y += 0.1;

            visited.push(currEvent['name']);
        }

        let nextEvents = getNextEvents(currEvent, events);
        for (nextEvent of nextEvents) {
            if(!visited.includes(nextEvent['name'])) {
                stack.push(nextEvent);
            }
        }
    }

    coords.x += 0.1;
}

function drawEdgesBetweenEvents(scene, event) {

    let events = scene['events'];

    let stack = new Stack();
    let visited = [];

    stack.push(event);

    let currEvent;
    while (!stack.isEmpty()) {

        currEvent = stack.pop();

        let currEventProperties = getEventNodeProperties(currEvent);

        if (isFirstEvent(currEvent, scene)) {
            let label = createLabel(currEvent['emotionalRequirements'], currEvent['priority']);

            graph.edges.push({
                id: getEdgeId(getSceneId(scene), currEventProperties.id),
                label: label,
                source: getSceneId(scene),
                target: currEventProperties.id,
                size: 1
            })
        }

        let nextEvents = getNextEvents(currEvent, events);
        console.log("curr: " + currEvent['name']);

        for (nextEvent of nextEvents) {
            console.log("next: " + nextEvent['name']);
            if(!visited.includes(nextEvent['name'])) {
                stack.push(nextEvent);
            }

            let nextEventProperties = getEventNodeProperties(nextEvent);
            let label = createLabel(nextEvent['emotionalRequirements'], nextEvent['priority']);

            let edgeId = getEdgeId(currEventProperties.id, nextEventProperties.id);
            if(!isEdgeInGraph(edgeId)) {
                graph.edges.push({
                    id: edgeId,
                    label: label,
                    source: currEventProperties.id,
                    target: nextEventProperties.id,
                    size: 1,
                    color: palette['purple']
                })
            }
        }
    }

    console.log("finished this event");
}

function getNextEvents(currEvent, events) {

    let nextEvents = [];

    for (eventName of currEvent['nextEvents']) {

        let event = events.find(event => event['name'] === eventName);
        if(event === undefined) {
            let error = "Next event " + eventName + " in " + currEvent['name'] + " is undefined";
            errors.push(error);
        } else {
            nextEvents.push(event);
        }
    }

    return nextEvents;
}

function getEventNodeProperties(event) {

    let properties = {
        type: 'cross',
        color: palette['yellow'],
        id: ''
    }

    if (event['type'] == 'cutscene') {
        properties.type = 'square';
        properties.color = palette['purple'];
        properties.id = 'cutscene_';
    } else if (event['type'] == 'gameplay') {
        properties.type = 'diamond';
        properties.color = palette['pink'];
        properties.id = 'gameplay_';
    }

    properties.id += event['name'];

    return properties;
}

function isFirstEvent(event, scene) {
    return scene['firstEvents'].includes(event['name']);
}

function getSceneId(scene) {
    let id = 'scene_' + scene['name'];
    return id;
}

function getEdgeId(sourceId, targetId) {
    let id = 'edge_' + sourceId + "_" + targetId;
    return id;
}

function isNodeInGraph(nodeId) {
    let node = graph.nodes.find(node => node.id === nodeId);
    return node !== undefined;
}

function isEdgeInGraph(edgeId) {
    let edge = graph.edges.find(edge => edge.id === edgeId);
    return edge !== undefined;
}

function createLabel(emotionalRequirements, priority) {
    let label = 'default';

    if (emotionalRequirements.length != 0) {
        label = '';
        for ([i, requirement] of emotionalRequirements.entries()) {
            label += requirement['parameter'] + " " + requirement['condition'] + " " + requirement['value'];

            if (i != emotionalRequirements.length - 1) {
                label += "&& "
            }
        }
    }

    label = "(priority: " + priority + ") " + label;

    return label;
}

module.exports = createGraph;