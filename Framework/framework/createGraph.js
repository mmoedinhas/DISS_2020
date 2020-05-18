let Stack = require('./stack.js');

const palette = {
    darkBlue: "#3aa5d2",
    blue: '#8ecce6',
    purple: '#d5cdea',
    pink: '#fae2ef',
    yellow: '#fcf8e9',
    grey: '#d0d5db'
};

const wrap = (s, w) => s.replace(
    new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n'
);

function createGraph(jsonObj) {

    let errors = [];
    let graph = {
        nodes: [],
        edges: []
    };
    let globalCoords = {
        x: 0.0,
        y: 0.0
    };

    graph.nodes.push({
        id: "start",
        label: "Start",
        longLabel: "Start",
        type: 'star',
        x: globalCoords.x,
        y: globalCoords.y,
        size: 1,
        color: palette['grey']
    });

    globalCoords.y += 0.1;

    const firstScenes = jsonObj['scenes'].filter(scene => jsonObj['firstLocation'] === scene['locationId']);
    if (firstScenes.length == 0) {
        let error = "No first location scenes: No scenes have a location id corresponding to the first location";
        addError(errors, error);
    }

    let locationsIds = getLocationsIds(jsonObj, firstScenes.length != 0);

    for (locationId of locationsIds) {

        let locationY = 0;

        if (locationId == jsonObj['firstLocation']) {
            locationY = drawLocationNode(graph, globalCoords, globalCoords.y, locationId, 'start');
        } else {
            locationY = drawLocationNode(graph, globalCoords, globalCoords.y, locationId);
        }

        let locationScenes = jsonObj['scenes'].filter(scene => locationId === scene['locationId']);

        for (scene of locationScenes) {
            parseScene(graph, errors, globalCoords, globalCoords.x, locationY, scene, getLocationNodeId(locationId));
        }
    }

    return { graph: graph, errors: errors };
}

function getLocationsIds(jsonObj, firstSceneExists) {
    let locationsIds = [];

    if (firstSceneExists) {
        locationsIds.push(jsonObj['firstLocation']);
    }

    for (scene of jsonObj['scenes']) {
        if (!locationsIds.includes(scene['locationId'])) {
            locationsIds.push(scene['locationId']);
        }
    }

    return locationsIds;
}

function getFirstEvents(errors, scene) {
    let events = scene['events'];
    let firstEventsNames = scene['firstEvents'];
    let firstEvents = [];

    for (eventName of firstEventsNames) {
        let event = events.find(event => event['name'] === eventName);

        if (event === undefined) {
            let error = "Undefined first event: First event " + eventName + " in scene " + scene['name'] + " is undefined";
            addError(errors, error);
        } else {
            firstEvents.push(event);
        }
    }

    return firstEvents;
}

function drawLocationNode(graph, globalCoords, locationY, locationId, parentId) {

    let nodeId = getLocationNodeId(locationId);

    graph.nodes.push({
        id: nodeId,
        label: "Location: " + locationId,
        longLabel: "Location: " + locationId,
        type: 'circle',
        x: globalCoords.x,
        y: globalCoords.y,
        size: 1,
        color: palette['darkBlue']
    })

    if (parentId !== undefined) {
        graph.edges.push({
            id: getEdgeId(parentId, nodeId),
            source: parentId,
            target: nodeId,
            size: 1
        })
    }

    locationY += 0.1;

    return locationY;
}

function parseScene(graph, errors, globalCoords, sceneX, sceneY, scene, parentId) {

    let id = getSceneId(scene);
    let label = "Scene: " + scene['name'];
    let longLabel = label + "\n\n" + wrap(scene['description'], label.length);

    graph.nodes.push({
        id: id,
        label: label,
        longLabel: longLabel,
        type: 'circle',
        x: globalCoords.x,
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

    let firstEvents = getFirstEvents(errors, scene);

    let coords = {
        x: sceneX,
        y: sceneY
    }

    for (event of firstEvents) {
        drawGraphAfterEvent(graph, errors, scene, event, coords);
        coords.x += 0.1;
    }

    let cyclePaths = detectCycle(errors, scene);
    if (cyclePaths.length != 0) {
        for (cyclePath of cyclePaths) {
            addError(errors, "Cycle: There is a cycle in scene " + scene['name'] + " with path: " + cyclePath);
        }
    }

    globalCoords.x = coords.x;
}

function drawGraphAfterEvent(graph, errors, scene, event, coords) {

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

            if (!isEdgeInGraph(graph, edgeId)) {
                graph.edges.push({
                    id: edgeId,
                    label: label,
                    source: getSceneId(scene),
                    target: currEventProperties.id,
                    size: 1
                })
            }
        }

        if (!isNodeInGraph(graph, currEventProperties.id)) {

            graph.nodes.push({
                id: currEventProperties.id,
                label: currEventProperties.label,
                longLabel: currEventProperties.longLabel,
                type: currEventProperties.type,
                x: coords.x,
                y: y,
                size: 1,
                color: currEventProperties.color,
                obj: currEvent
            });
            y += 0.1;
        }

        let nextEvents = getNextEvents(errors, currEvent, events);
        for (nextEvent of nextEvents) {
            if (!visited.includes(nextEvent['name'])) {
                stack.push(nextEvent);
            }

            let nextEventProperties = getEventNodeProperties(nextEvent);
            let label = createLabel(nextEvent['emotionalRequirements'], nextEvent['priority']);

            let edgeId = getEdgeId(currEventProperties.id, nextEventProperties.id);
            if (!isEdgeInGraph(graph, edgeId)) {
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

function detectCycle(errors, scene) {
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

            let nextEvents = getNextEvents(errors, currEvent, events);

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

function getNextEvents(errors, currEvent, events) {

    let nextEvents = [];

    for (eventName of currEvent['nextEvents']) {

        let event = events.find(event => event['name'] === eventName);
        if (event === undefined) {
            let error = "Undefined next event: Next event " + eventName + " in " + currEvent['name'] + " is undefined";
            addError(errors, error);
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
        id: '',
        label: '',
        longLabel: ''
    }

    if (event['type'] == 'cutscene') {
        properties.label = "Cutscene: ";
        properties.type = 'square';
        properties.color = palette['purple'];
        properties.id = 'cutscene_';
    } else if (event['type'] == 'gameplay') {
        properties.label = "Gameplay: ";
        properties.type = 'diamond';
        properties.color = palette['pink'];
        properties.id = 'gameplay_';
    }

    properties.id += event['name'];
    properties.label += event['name'];
    properties.longLabel = properties.label + "\n\n" + wrap(event['description'], properties.label.length);

    return properties;
}

function isFirstEvent(event, scene) {
    return scene['firstEvents'].includes(event['name']);
}

function getSceneId(scene) {
    let id = 'scene_' + scene['name'];
    return id;
}

function getLocationNodeId(locationId) {
    let id = 'location_' + locationId;
    return id;
}

function getEdgeId(sourceId, targetId) {
    let id = 'edge_' + sourceId + "_" + targetId;
    return id;
}

function isNodeInGraph(graph, nodeId) {
    let node = graph.nodes.find(node => node.id === nodeId);
    return node !== undefined;
}

function isEdgeInGraph(graph, edgeId) {
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

function addError(errors, error) {
    if (!errors.includes(error)) {
        errors.push(error);
    }
}

module.exports = createGraph;