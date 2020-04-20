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

export interface IFileBundle {
    maps: IFile[],
    events: IFile[],
    tilemaps: IFile[],
    tilesets: ITileset[]
}

export interface IFile {
    id: string,
    filename: string
}

export interface ITileset extends IFile {
    frameWidth: number,
    frameHeight: number 
}