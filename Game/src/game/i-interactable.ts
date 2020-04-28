import { GameScene } from "./game-scene";
import { Player } from "./player";
import { IDialogueLine } from "../utils/interfaces";

export interface IInteractable {
    dialogue: IDialogueLine[],
    setInteractable(interactable: boolean),
    isInteractable(): boolean,
    isPlayerInZone(): boolean,
    setPlayerInZone(playerInZone: boolean),
    setActionBoxVisiblity(visible: boolean),
    interact()
}