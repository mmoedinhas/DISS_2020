import { gameConfig, graph, playerType } from './game/boot-scene';
import * as querystring from 'querystring';

declare const STORYVIEWER_URL: string;
const debugUrl: string = STORYVIEWER_URL + "/debug";

const debugButton: HTMLInputElement = document.getElementById('storyViewLink') as HTMLInputElement;

debugButton.onclick = function () {
    debugButton.disabled = true;
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open("POST", debugUrl);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.responseType = 'json';

    let body = {
        playerType: playerType,
        graph: graph
    };
    request.send(JSON.stringify(body));

    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if(this.status === 200) {
                debugButton.disabled = false;
                let linkToStoryViewer: HTMLElement = document.getElementById("linkToStoryViewer");
                let queryString: string = '?' + querystring.stringify({id: request.response.id})
                linkToStoryViewer.setAttribute("href", debugUrl + queryString);
                linkToStoryViewer.click();
            } else {
                console.log(request);
            }
        }
    }
}

export const game = new Phaser.Game(gameConfig);
