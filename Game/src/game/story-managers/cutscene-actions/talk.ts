import { Action } from "./action";
import { GameScene } from "../../game-scene";

export class Talk extends Action {

    private onScreen: boolean;

    constructor(scene: GameScene, actorId: string) {
        super(scene, actorId);
    }
    
    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        
    }

}