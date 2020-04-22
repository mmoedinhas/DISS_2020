import { ICoordinates } from './interfaces';

export function toMapCoordinates(x: integer, y: integer, map: Phaser.Tilemaps.Tilemap): ICoordinates {

    let coord = {
        x: 0,
        y: 0
    }

    coord.x = (x + 0.5) * map.tileWidth;
    coord.y = (y + 1) * map.tileHeight;

    return coord;
}