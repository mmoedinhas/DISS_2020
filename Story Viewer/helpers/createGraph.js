let Stack = require('./stack.js');

const graph = {
    nodes: [],
    edges: []
};

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

    const firstScenes = getFirstScenes(jsonObj['scenes'], jsonObj['firstLocation']);

    for (scene of firstScenes) {
        parseScene(scene, 'start');
    }

    return graph;
}

function getFirstScenes(scenes, firstLocationId) {
    const firstScenes = [];

    for (scene of scenes) {
        if (scene['locationId'] === firstLocationId) {
            firstScenes.push(scene);
        }
    }

    return firstScenes;
}

function isFirstEvent(event) {
    return event['flagRequirements'].length == 0;
}

function getFirstEvents(scene) {
    let events = scene['events'];
    let firstEvents = [];

    for (event of events) {
        if (isFirstEvent(event)) {
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

    let label = createLabel(scene['emotionalRequirements'], scene['priority']);

    graph.edges.push({
        id: 'edge_' + parentId + "_" + id,
        label: label,
        source: parentId,
        target: id,
        size: 1
    })

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
    let flags = new Map();

    let stack = new Stack();
    let explored = [event['name']];

    stack.push(event);

    let currEvent;
    while (!stack.isEmpty()) {

        currEvent = stack.pop();

        let eventProperties = getEventNodeProperties(currEvent);
        if (!isNodeInGraph(eventProperties.id)) {
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
            updateFlags(flags, currEvent);
        }

        let nextEvents = getNextEvents(explored, events, flags);
        for (nextEvent of nextEvents) {
            stack.push(nextEvent);
        }
    }

    coords.x += 0.1;
}

function drawEdgesBetweenEvents(scene, event) {

    let events = scene['events'];
    let flags = new Map();

    let stack = new Stack();
    let explored = [event['name']];

    stack.push(event);

    let currEvent;
    while (!stack.isEmpty()) {

        currEvent = stack.pop();

        let currEventProperties = getEventNodeProperties(currEvent);

        if (isFirstEvent(currEvent)) {
            let label = createLabel(currEvent['emotionalRequirements'], currEvent['priority']);

            graph.edges.push({
                id: 'edge_' + getSceneId(scene) + "_" + currEventProperties.id,
                label: label,
                source: getSceneId(scene),
                target: currEventProperties.id,
                size: 1
            })
        }

        updateFlags(flags, currEvent);

        let nextEvents = getNextEvents(explored, events, flags);
        console.log("curr: " + currEvent['name']);

        for (nextEvent of nextEvents) {
            console.log("next: " + nextEvent['name']);
            stack.push(nextEvent);

            let nextEventProperties = getEventNodeProperties(nextEvent);
            let label = createLabel(nextEvent['emotionalRequirements'], nextEvent['priority']);
            graph.edges.push({
                id: 'edge_' + currEventProperties.id + "_" + nextEventProperties.id,
                label: label,
                source: currEventProperties.id,
                target: nextEventProperties.id,
                size: 1
            })
        }
    }

    console.log("finished this event");
}

function updateFlags(flags, event) {
    let flagChanges = event['flagChanges'];

    for (flag of flagChanges) {
        flags.set(flag['name'], flag['value']);
    }
}

function getNextEvents(explored, events, flags) {

    let nextEvents = [];

    for (event of events) {
        if (!explored.includes(event['name']) && event['flagRequirements'].length != 0) {
            let allFlagsMatch = true;

            for (requirement of event['flagRequirements']) {
                if (flags.has(requirement['name'])) {
                    if (flags.get(requirement['name']) != requirement['value']) {
                        allFlagsMatch = false;
                        break;
                    }
                } else {
                    if (requirement['value'] != false) {
                        allFlagsMatch = false;
                        break;
                    }
                }
            }

            if (allFlagsMatch) {
                nextEvents.push(event);
                explored.push(event['name']);
            }
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

function getSceneId(scene) {
    let id = 'scene_' + scene['name'];
    return id;
}

function isNodeInGraph(nodeId) {
    let node = graph.nodes.find(node => node.id === nodeId);
    return node !== undefined;
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