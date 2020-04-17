export interface INarrativeFiles {
    overall: string,
    events: string[],
    others: string[]
}

export interface ITileset {
    tileset: string, 
    frameWidth: number,
    frameHeight: number 
}

export interface IEmotionalRequirement {
    parameter: string,
    condition: string,
    value: number
}

export interface IScene {
    locationId: string,
    name: string,
    description: string,
    map: string,
    priority: number,
    emotionalRequirements: IEmotionalRequirement[],
    firstEvents: string[],
    events: IEvent[]
}

export interface IEvent {
    name: string,
    description: string,
    type: string,
    file: string,
    priority: number,
    emotionalRequirements: IEmotionalRequirement[],
    nextEvents: string[]
}

export interface IStory {
    scenes: IScene[]
}

export interface IPlayerType {
    anger: number,
    disgust: number, 
    fear: number,
    anxiety: number, 
    sadness: number, 
    desire: number, 
    relaxation: number,
    happiness: number
}