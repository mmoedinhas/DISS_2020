export const storyPath: string = 'assets/story/';
export const eventsPath: string = 'assets/story/events';
export const mapsPath: string = 'assets/map';
export const tilemapPath: string = 'assets/tilemap';
export const tilesetPath: string = 'assets/tileset';

export function getAssetIdFromFilename(filename: string): string {
    let slashIndex = (filename.lastIndexOf('/') === -1) ? 0 : filename.lastIndexOf('/');
    let id: string = filename.slice(slashIndex + 1, filename.lastIndexOf('.'));
    return id;
}