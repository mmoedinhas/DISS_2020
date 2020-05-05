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

    if (firstScenes.length == 0) {
        let error = "No first location scenes: No scenes have a location id corresponding to the first location";
        addError(error);
    }

    for (scene of firstScenes) {
        parseScene(scene, 'start');
    }

    const otherScenes = jsonObj['scenes'].filter(scene => !firstScenes.includes(scene));
    for (scene of otherScenes) {
        parseScene(scene);
    }

    return { graph: graph, errors: errors };
}


function getFirstEvents(scene) {
    let events = scene['events'];
    let firstEventsNames = scene['firstEvents'];
    let firstEvents = [];

    for (eventName of firstEventsNames) {
        let event = events.find(event => event['name'] === eventName);

        if (event === undefined) {
            let error = "Undefined first event: First event " + eventName + " in scene " + scene['name'] + " is undefined";
            addError(error);
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
        color: palette['blue'],
        obj: scene
    });

    sceneY += 0.1;

    if (parentId !== undefined) {
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
        drawGraphAfterEvent(scene, event, coords);
        coords.x += 0.1;
    }

    let cyclePaths = detectCycle(scene);
    if (cyclePaths.length != 0) {
        for (cyclePath of cyclePaths) {
            addError("Cycle: There is a cycle in scene " + scene['name'] + " with path: " + cyclePath);
        }
    }

    x = coords.x;
}

function drawGraphAfterEvent(scene, event, coords) {

    let y = coords.y;
    let events = scene['events'];

    let stack = new Stack();
    let visited = [];

    stack.push(event);

    let currEvent;
    while (!stack.isEmpty()) {

        currEvent = stack.pop();
        visited.push(currEvent['name']);

        let currEventProperties = getEventNodeProperties(currEvent);

        if (isFirstEvent(currEvent, scene)) {
            let label = createLabel(currEvent['emotionalRequirements'], currEvent['priority']);
            let edgeId = getEdgeId(getSceneId(scene), currEventProperties.id);

            if (!isEdgeInGraph(edgeId)) {
                graph.edges.push({
                    id: edgeId,
                    label: label,
                    source: getSceneId(scene),
                    target: currEventProperties.id,
                    size: 1
                })
            }
        }

        if (!isNodeInGraph(currEventProperties.id)) {

            graph.nodes.push({
                id: currEventProperties.id,
                label: currEvent['name'],
                type: currEventProperties.type,
                x: coords.x,
                y: y,
                size: 1,
                color: currEventProperties.color,
                obj: currEvent
            });
            y += 0.1;
        }

        let nextEvents = getNextEvents(currEvent, events);
        for (nextEvent of nextEvents) {
            if (!visited.includes(nextEvent['name'])) {
                stack.push(nextEvent);
            }

            let nextEventProperties = getEventNodeProperties(nextEvent);
            let label = createLabel(nextEvent['emotionalRequirements'], nextEvent['priority']);

            let edgeId = getEdgeId(currEventProperties.id, nextEventProperties.id);
            if (!isEdgeInGraph(edgeId)) {
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

    coords.x += 0.1;
}

function detectCycle(scene) {
    let events = scene['events'];
    let cyclePaths = [];

    for (event of events) {
        let stack = new Stack();
        let visited = [];
        let cyclePath = [];

        stack.push(event);

        let currEvent;
        while (!stack.isEmpty()) {

            currEvent = stack.pop();
            visited.push(currEvent['name']);
            cyclePath.push(currEvent['name']);

            let nextEvents = getNextEvents(currEvent, events);

            for (nextEvent of nextEvents) {

                if (nextEvent['name'] == event['name']) {
                    let cyclePathCopy = [...cyclePath];
                    cyclePathCopy.push(nextEvent['name']);
                    cyclePaths.push(cyclePathCopy);
                }

                if (!visited.includes(nextEvent['name'])) {
                    stack.push(nextEvent);
                }
            }
        }
    }

    if (cyclePaths.length == 0) {
        return cyclePaths;
    }

    // remove equal cycle paths
    let cyclePathsFinal = [];
    cyclePathsFinal.push(cyclePaths[0]);

    for (let i = 0; i < cyclePaths.length; i++) {
        let allDiferent = true;
        let cyclePathCopy = [...cyclePaths[i]];
        cyclePathCopy.sort();

        for (let j = 0; j < cyclePathsFinal.length; j++) {

            if (cyclePathCopy.length == cyclePathsFinal[j].length) {
                let cycle2 = [...cyclePathsFinal[j]];
                cycle2.sort();

                if (JSON.stringify(cyclePathCopy) == JSON.stringify(cycle2)) {
                    allDiferent = false;
                    break;
                }
            }
        }

        if (allDiferent) {
            cyclePathsFinal.push(cyclePaths[i]);
        }
    }

    return cyclePathsFinal;
}

function getNextEvents(currEvent, events) {

    let nextEvents = [];

    for (eventName of currEvent['nextEvents']) {

        let event = events.find(event => event['name'] === eventName);
        if (event === undefined) {
            let error = "Undefined next event: Next event " + eventName + " in " + currEvent['name'] + " is undefined";
            addError(error);
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

function addError(error) {
    if (!errors.includes(error)) {
        errors.push(error);
    }
}

module.exports = createGraph;