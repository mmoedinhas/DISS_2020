import { Actor } from './actor';
import { GameScene } from './game-scene';
import { IBodySpecs } from '../utils/interfaces';

export class Player extends Actor {

    constructor(scene: GameScene, x: integer, y: integer, actorObj: any) {
        super(scene, x, y, actorObj);
    }
}