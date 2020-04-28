import { GameScene } from "./game-scene";
import { Player } from "./player";

export interface IInteractable {
    setInteractable(interactable: boolean),
    isInteractable(): boolean,
    isPlayerInZone(): boolean,
    setPlayerInZone(playerInZone: boolean),
    setActionBoxVisiblity(visible: boolean),
    createInteractZone(scene: GameScene, player: Player)
}