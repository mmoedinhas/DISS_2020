import { gameConfig, graph, playerType } from './game/boot-scene';

declare const STORYVIEWER_URL: string;
const storyViewerUrl: string = STORYVIEWER_URL + "/story-viewer/debug";

const debugButton: HTMLElement = document.getElementById('storyViewLink');

debugButton.onclick = function () {
    let request: XMLHttpRequest = new XMLHttpRequest();
    request.open("POST", storyViewerUrl);
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
                console.log(request.response);
            } else {
                console.log(request);
            }
        }
    }
}

export const game = new Phaser.Game(gameConfig);
