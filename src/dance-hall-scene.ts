import * as Phaser from 'phaser';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'DanceHallScene',
};

export class DanceHallScene extends Phaser.Scene {

    constructor() {
        super(config);
    }

    public create() {

        this.initMap();
    }

    private initMap(): Phaser.Tilemaps.Tilemap {
        
        let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({key: 'dance-hall-map'});
        
        let castleTiles: Phaser.Tilemaps.Tileset = map.addTilesetImage('castle', 'castle-tiles');
        let stairsTiles: Phaser.Tilemaps.Tileset = map.addTilesetImage('stairs', 'stairs-tiles');
        let tilesets: Phaser.Tilemaps.Tileset[] = [castleTiles, stairsTiles];

        let collidables: Phaser.Tilemaps.StaticTilemapLayer[] = [];
        let layers: Phaser.Tilemaps.StaticTilemapLayer[] = [];

        for(let layerData of map.layers) {

            let depth: number = (layerData.properties as Array<object>).find(i => i['name'] === 'depth')['value'];
            let collidable: boolean = (layerData.properties as Array<object>).find(i => i['name'] === 'collidable')['value'];

            let layer: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(layerData.name, tilesets).setDepth(depth);

            if(collidable) {
                collidables.push(layer);
            }
        }

        for(let layer of collidables) {
            layer.setCollisionByExclusion([-1]);
        }

        return map;
    }
}