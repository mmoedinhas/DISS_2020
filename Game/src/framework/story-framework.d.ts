import { IPlayerType } from "../utils/interfaces.js";

declare module './story-framework.js' {
    export function createStoryLine(playerType: IPlayerType, overallStoryData, debug: boolean): any
    export function validateNarrativeFile(fileType: string, data): any
}