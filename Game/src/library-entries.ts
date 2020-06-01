import * as Phaser from 'phaser';
import WebfontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin.js';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { GameScene } from './game/game-scene';
import { BootScene } from './game/boot-scene';
import { DialogueScene } from './game/dialogue-scene';
import { IntroScene } from './game/intro-scene';

declare const DEBUG: boolean;

const physicsDebug: boolean = false;

const gameWidth: number = 640;
const gameHeight: number = 360;

const gameConfig: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		parent: 'content',
		mode: Phaser.Scale.FIT,
		width: gameWidth,
		height: gameHeight,
		min: {
			width: gameWidth,
			height: gameHeight,
		},
	},
	render: {
		pixelArt: true,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
			debug: DEBUG && physicsDebug,
		},
	},
	scene: [BootScene, GameScene, DialogueScene, IntroScene],
	plugins: {
		scene: [
			{
				key: 'rexUI',
				plugin: RexUIPlugin,
				mapping: 'rexUI',
			},
		],
		global: [
			{
				key: 'rexWebfontLoader',
				plugin: WebfontLoaderPlugin,
				start: true,
			},
		],
	},
};

let game: Phaser.Game;

export function newGame(
	options: {
		doneDomElem?: HTMLElement;
		parent?: string;
		playerProfile?: Object;
		width?: integer;
		height?: integer;
	} = { playerProfile: {} }
) {
	gameConfig.scale.parent = options.parent
		? options.parent
		: gameConfig.scale.parent;
	game = new Phaser.Game(gameConfig);
	let playerProfile = options.playerProfile ? options.playerProfile : {};

	game.registry.set('doneDomElem', options.doneDomElem);
	game.registry.set('playerType', playerProfile);
}

export function getRatio() {
	return gameWidth / gameHeight;
}

export function endGame() {
	game.scene.getScene('Game').plugins.removeScenePlugin('rexUI');
	//console.log("destroyed plugins");
	game.destroy(false);
}

export function getLogs(): string[] {
	if (game) {
		let logs: string[] = game.registry.get('logs');
		if (!logs) {
			return [];
		}
		return logs;
	}

	return [];
}
