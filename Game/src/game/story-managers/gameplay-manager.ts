import { EventManager } from "./event-manager";
import { GameScene } from "../game-scene";

export class GameplayManager extends EventManager{

    constructor(scene: GameScene, name: string) {
        super(scene, name);
    }

    public act(time: number, delta: number, keysPressed:Phaser.Input.Keyboard.Key[]) {
        
    }

    public populateActors(scene: GameScene) {
        
    }
}