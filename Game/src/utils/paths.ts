export const uiPath: string = 'assets/ui/';
export const fontsPath: string = 'assets/fonts/';
export const storyPath: string = 'assets/story/';
export const eventsPath: string = 'assets/story/event/';
export const dialoguePath: string = 'assets/story/dialogue/';
export const mapsPath: string = 'assets/map/';
export const mapTilesPath: string = 'assets/mapTiles/';
export const tilesetPath: string = 'assets/tileset/';

export function getAssetIdFromPath(path: string): string {
    let slashIndex = (path.lastIndexOf('/') === -1) ? 0 : path.lastIndexOf('/');
    let id: string = path.slice(slashIndex + 1, path.lastIndexOf('.'));
    return id;
}

export function getFilenameFromPath(path: string): string {
    let slashIndex = (path.lastIndexOf('/') === -1) ? 0 : path.lastIndexOf('/');
    let filename: string = path.slice(slashIndex + 1);
    return filename;
}