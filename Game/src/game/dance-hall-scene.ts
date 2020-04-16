import * as Phaser from 'phaser';

const config: Phaser.Types.Scenes.SettingsConfig = {
    key: 'DanceHallScene',
};

export class DanceHallScene extends Phaser.Scene {

    private player: Phaser.GameObjects.Sprite;
    private map: Phaser.Tilemaps.Tilemap;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];

    constructor() {
        super(config);
    }

    public create() {

        this.map = this.initMap();
        this.player = this.initPlayer();

        this.cursors = this.input.keyboard.createCursorKeys();

        for(let layer of this.obstacles) {
            this.physics.add.collider(this.player, layer);
        }

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
    }

    public update(time, delta) {

        if(this.isArcadeBody(this.player.body)) {
            this.player.body.setVelocity(0);

            // Horizontal movement
            if (this.cursors.left.isDown)
            {
                this.player.body.setVelocityX(-80);
            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.setVelocityX(80);
            }
    
            // Vertical movement
            if (this.cursors.up.isDown)
            {
                this.player.body.setVelocityY(-80);
            }
            else if (this.cursors.down.isDown)
            {
                this.player.body.setVelocityY(80);
            }
        }

        if (this.cursors.left.isDown)
        {
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.anims.play('right', true);
        }
        else if (this.cursors.up.isDown)
        {
            this.player.anims.play('up', true);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.anims.play('down', true);
        }
        else
        {
            this.player.anims.stop();
        }
        
    }

    private isArcadeBody(body: object|Phaser.Physics.Arcade.Body|Phaser.Physics.Impact.Body): body is Phaser.Physics.Arcade.Body {
        return body instanceof Phaser.Physics.Arcade.Body;
    }

    private initMap(): Phaser.Tilemaps.Tilemap {
        
        let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({key: 'dance-hall-map'});
        
        let castleTiles: Phaser.Tilemaps.Tileset = map.addTilesetImage('castle', 'castle-tiles');
        let stairsTiles: Phaser.Tilemaps.Tileset = map.addTilesetImage('stairs', 'stairs-tiles');
        let tilesets: Phaser.Tilemaps.Tileset[] = [castleTiles, stairsTiles];

        for(let layerData of map.layers) {

            let depth: number = (layerData.properties as Array<object>).find(i => i['name'] === 'depth')['value'];
            let collidable: boolean = (layerData.properties as Array<object>).find(i => i['name'] === 'collidable')['value'];

            let layer: Phaser.Tilemaps.StaticTilemapLayer = map.createStaticLayer(layerData.name, tilesets).setDepth(depth);

            if(collidable) {
                layer.setCollisionByExclusion([-1]);
                this.obstacles.push(layer);
            }
        }

        return map;
    }

    private initPlayer(): Phaser.GameObjects.Sprite {
        let player: Phaser.GameObjects.Sprite = this.physics.add.sprite(500, 200, 'girls', 2);

        if(this.isArcadeBody(player.body)) {
            let oldWidth: number = player.body.width;
            let oldHeight: number = player.body.height;

            player.body.setSize(player.body.width/2.0, player.body.height/3.0);
            player.body.setOffset((oldWidth - player.body.height) / 2.0, oldHeight - player.body.height);
        }

        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('girls', { frames: [13, 14, 13, 12]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('girls', { frames: [25, 24, 25, 26] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('girls', { frames: [37, 36, 37, 38]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('girls', { frames: [ 1, 0, 1, 2 ] }),
            frameRate: 10,
            repeat: -1
        });

        return player;
    }
}