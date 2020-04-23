import * as Phaser from 'phaser';
import MoveTo from 'phaser3-rex-plugins/plugins/moveto.js';

import { IBodySpecs, ICoordinates } from '../utils/interfaces';
import { isArcadeBody } from '../utils/type-predicates';
import { toRealMapCoordinates, toTileMapCoordinates } from '../utils/coordinates';
import { GameScene } from './game-scene';

export class Actor {

    private sprite: Phaser.GameObjects.Sprite;
    private id: string;
    private name: string;
    private speed: number = 80;

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any) {

        this.id = actorObj.id;
        this.name = actorObj.name;
        
        let mapCoords: ICoordinates = toRealMapCoordinates(x, y, scene.map);
        this.sprite = scene.physics.add.sprite(mapCoords.x, mapCoords.y, actorObj.tilesetId, actorObj.defaultFrame).setOrigin(0.5, 1);
        this.initBody(actorObj);
        //TODO this.createAnimations(actorObj);
    }

    private initBody(actorObj: any) {

        const bodySpecs: IBodySpecs = {
            width: actorObj.body.width,
            height: actorObj.body.height,
            anchor: actorObj.body.anchor
        }

        if (isArcadeBody(this.sprite.body)) {
            let oldWidth: number = this.sprite.body.width;
            let oldHeight: number = this.sprite.body.height;

            let newWidth: number = this.sprite.body.width * bodySpecs.width * 0.01;
            let newHeight: number = this.sprite.body.height * bodySpecs.height * 0.01;

            let xOffsetSpec: string = bodySpecs.anchor.split('-')[0];
            let yOffsetSpec: string = bodySpecs.anchor.split('-')[1];
            let xOffset: number = 0.0;
            let yOffset: number = 0.0;

            switch (xOffsetSpec) {
                case "center":
                    xOffset = (oldWidth - newWidth) / 2.0;
                    break;
                case "left":
                    xOffset = 0;
                    break;
                case "right":
                    xOffset = oldWidth - newWidth;
                    break;
            }

            switch (yOffsetSpec) {
                case "center":
                    yOffset = (oldHeight - newHeight) / 2.0;
                    break;
                case "bottom":
                    yOffset = oldHeight - newHeight;
                    break;
                case "top":
                    yOffset = 0;
                    break;
            }

            this.sprite.body.setSize(newWidth, newHeight);
            this.sprite.body.setOffset(xOffset, yOffset);
        }
    }

    private correctOrigin(map: Phaser.Tilemaps.Tilemap) {

        let originX = (this.sprite.width - map.tileWidth) / 2.0 / this.sprite.width;
        let originY = (this.sprite.height - map.tileHeight) / this.sprite.height;

        this.sprite.setOrigin(originX, originY);
    }

    public getId(): string {
        return this.id;
    }

    public destroy() {
        this.sprite.destroy();
    }

    public getCameraToFollow(scene: GameScene) {
        scene.cameras.main.startFollow(this.sprite);
    }

    public getName() : string {
        return this.name;
    }

    public move(scene: GameScene, x:integer, y:integer, emitter: Phaser.Events.EventEmitter) {

        let moveTo = new MoveTo(this.sprite, {
            speed: this.speed,
            rotateToTarget: false
        });

        moveTo.on('complete', function(gameObject, moveTo){
            emitter.emit('stopWalking');
        });

        let tileCoords: ICoordinates = toTileMapCoordinates(this.sprite.x, this.sprite.y, scene.map);
        tileCoords.x += x;
        tileCoords.y += y;

        let mapCoords: ICoordinates = toRealMapCoordinates(tileCoords.x, tileCoords.y, scene.map);

        moveTo.moveTo(mapCoords.x, mapCoords.y);
    }
}