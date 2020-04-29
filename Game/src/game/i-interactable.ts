import { IDialogueLine, IFlagChange } from "../utils/interfaces";
import { Player } from "./player";
import { GameScene } from "./game-scene";

export interface IInteractable {
    dialogue: IDialogueLine[],
    setInteractable(flags: Map<string, boolean | number>),
    isInteractable(): boolean,
    isPlayerInZone(scene: GameScene, player: Player): boolean,
    setPlayerInZone(playerInZone: boolean),
    setActionBoxVisiblity(visible: boolean),
    getFlagsChangesAfterInteraction(): IFlagChange[]
}