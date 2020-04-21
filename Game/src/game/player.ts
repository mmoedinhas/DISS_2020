import { Actor } from './actor';
import { Game } from './game';
import { IBodySpecs } from '../utils/interfaces';

export class Player extends Actor {

    constructor(scene: Game, x: integer, y: integer, tilesetKey: string, frame: integer, bodySpecs: IBodySpecs) {
        super(scene, x, y, tilesetKey, frame, bodySpecs);
    }

    public handleInput() {
        
    }
}