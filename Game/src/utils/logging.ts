import { Scene } from 'phaser';
import { IEvent } from './interfaces';

declare const DEBUG: boolean;

function createLogMessage(action: string, args?: any): string {

    let log: { action: string, args?: any, timestamp: Date } = {
        action: action,
        timestamp: new Date()
    };

    if (args) {
        log.args = args;
    }

    return JSON.stringify(log);
}

function writeLog(scene: Scene, msg: string) {
    if (DEBUG) {
        console.log("Log: " + msg);
    }
    scene.registry.get("logs").push(msg);
}

function mapToObj(m: Map<any, any>) {
    return Array.from(m).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
};

export function initLogging(scene: Scene) {
    scene.registry.set("logs", []);
}

export function startGame(scene: Scene) {
    let msg = createLogMessage("Game START");
    writeLog(scene, msg);
}

export function endGame(scene: Scene) {
    let msg = createLogMessage("Game END");
    writeLog(scene, msg);
}

export function startEvent(scene: Scene, event: IEvent) {
    let msg = createLogMessage(event.type.toUpperCase() + " event " + event.name + " START", {
        type: event.type,
        name: event.name
    });
    writeLog(scene, msg);
}

export function endEvent(scene: Scene, event: IEvent) {
    let msg = createLogMessage(event.type.toUpperCase() + " event " + event.name + " END", {
        type: event.type,
        name: event.name
    });
    writeLog(scene, msg);
}

export function flagChange(scene: Scene, currFlags: Map<string, boolean | number>) {
    let msg = createLogMessage("Flag changes", {
        currFlags: mapToObj(currFlags)
    });
    writeLog(scene, msg);
}

