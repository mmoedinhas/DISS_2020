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
        
        let castle: Phaser.Tilemaps.Tileset = map.addTilesetImage('castle', 'castle-tiles');
        let stairs: Phaser.Tilemaps.Tileset = map.addTilesetImage('stairs', 'stairs-tiles');

        let layer1 = map.createStaticLayer('floor', [castle, stairs], 0, 0);

        // let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({ key: 'map' });

        // var tiles = map.addTilesetImage('spritesheet', 'tiles');

        // var grass = map.createStaticLayer('Grass', tiles, 0, 0);
        // var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
        // obstacles.setCollisionByExclusion([-1]);

        return map;
    }
}