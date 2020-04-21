export interface IEmotionalRequirement {
    parameter: string,
    condition: string,
    value: integer
}

export interface IScene {
    locationId: string,
    name: string,
    description: string,
    map: string,
    priority: integer,
    emotionalRequirements: IEmotionalRequirement[],
    firstEvents: string[],
    events: IEvent[]
}

export interface IEvent {
    name: string,
    description: string,
    type: string,
    priority: integer,
    emotionalRequirements: IEmotionalRequirement[],
    nextEvents: string[]
}

export interface IStory {
    scenes: IScene[]
}

export interface IPlayerType {
    anger: integer,
    disgust: integer, 
    fear: integer,
    anxiety: integer, 
    sadness: integer, 
    desire: integer, 
    relaxation: integer,
    happiness: integer
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
    frameWidth: integer,
    frameHeight: integer 
}

export interface IBodySpecs {
    width: integer,
    height: integer,
    anchor: string
}