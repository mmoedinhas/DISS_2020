import { gameConfig, storyId } from './game/boot-scene';
import * as querystring from 'querystring';

declare const STORYVIEWER_URL: string;
const debugUrl: string = STORYVIEWER_URL + "/debug";

const debugButton: HTMLInputElement = document.getElementById('storyViewLink') as HTMLInputElement;

debugButton.onclick = function () {
    let linkToStoryViewer: HTMLElement = document.getElementById("linkToStoryViewer");
    let queryString: string = '?' + querystring.stringify({ id: storyId })
    linkToStoryViewer.setAttribute("href", debugUrl + queryString);
    linkToStoryViewer.click();
}

export const game = new Phaser.Game(gameConfig);
