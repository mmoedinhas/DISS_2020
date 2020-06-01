import * as Phaser from 'phaser';
import { StoryManager } from './story-managers/story-manager';
import { IScene, IStory, IPlayerType } from '../utils/interfaces';
import { Actor } from './actor';

const config: Phaser.Types.Scenes.SettingsConfig = {
	key: 'Game',
};

declare const STORYVIEWER_DEBUGGING: boolean;

export class GameScene extends Phaser.Scene {
	public static MAX_DEPTH = 128;
	public static MIN_DEPTH = 0;

	public static cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	public static interactKey: Phaser.Input.Keyboard.Key;

	private map: Phaser.Tilemaps.Tilemap;
	private obstacles: Phaser.Tilemaps.StaticTilemapLayer[] = [];

	private isGameEnded: boolean = false;

	private storyManager: StoryManager;

	constructor() {
		super(config);
	}

	public init() {
		let story: IStory = this.registry.get('story');
		let playerType: IPlayerType = this.registry.get('playerType');

		if (STORYVIEWER_DEBUGGING) {
			let storyId: string = this.registry.get('storyId');
			this.storyManager = new StoryManager(this, story, playerType, storyId);
		} else {
			this.storyManager = new StoryManager(this, story, playerType);
		}
	}

	public create() {
		let currScene: IScene = this.storyManager.getCurrScene();
		this.map = this.initMap(currScene);
		GameScene.cursors = this.input.keyboard.createCursorKeys();
		GameScene.interactKey = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.Z
		);

		this.storyManager.start();

		this.cameras.main.setBounds(
			0,
			0,
			this.map.widthInPixels,
			this.map.heightInPixels
		);
		this.cameras.main.roundPixels = true;

		this.cameras.main.fadeFrom(500);
	}

	public update(time: number, delta: number) {
		if (this.isGameEnded) {
			return;
		}
		if (this.storyManager.isDone()) {
			this.isGameEnded = true;
			this.cameras.main.fade(
				500,
				0,
				0,
				0,
				false,
				function (camera, progress) {
					if (progress >= 1) {
						this.scene.start('End');
					}
				},
				this
			);
			return;
		}

		let keysPressed: Phaser.Input.Keyboard.Key[] = this.parseUserInput();
		this.storyManager.act(time, delta, keysPressed);
	}

	public setActorCollisionsWithMap(actor: Actor) {
		for (let layer of this.obstacles) {
			actor.setCollisionWith(layer, this);
		}
	}

	public getMap(): Phaser.Tilemaps.Tilemap {
		return this.map;
	}

	private parseUserInput(): Phaser.Input.Keyboard.Key[] {
		let keysPressed: Phaser.Input.Keyboard.Key[] = [];

		if (Phaser.Input.Keyboard.JustDown(GameScene.interactKey)) {
			keysPressed.push(GameScene.interactKey);
		}

		if (GameScene.cursors.left.isDown) {
			keysPressed.push(GameScene.cursors.left);
		}

		if (GameScene.cursors.right.isDown) {
			keysPressed.push(GameScene.cursors.right);
		}

		if (GameScene.cursors.up.isDown) {
			keysPressed.push(GameScene.cursors.up);
		}

		if (GameScene.cursors.down.isDown) {
			keysPressed.push(GameScene.cursors.down);
		}

		return keysPressed;
	}

	private initMap(currScene: IScene): Phaser.Tilemaps.Tilemap {
		let map: Phaser.Tilemaps.Tilemap = this.make.tilemap({
			key: currScene.name,
		});

		let tilesets: Phaser.Tilemaps.Tileset[] = [];

		for (let tilesetData of map.tilesets) {
			tilesets.push(map.addTilesetImage(tilesetData.name));
		}

		for (let layerData of map.layers) {
			let depth: number = (layerData.properties as Array<object>).find(
				(i) => i['name'] === 'depth'
			)['value'];

			if (depth > 0) {
				depth += GameScene.MAX_DEPTH + 1;
			} else {
				depth += GameScene.MIN_DEPTH - 1;
			}

			let collidable: boolean = (layerData.properties as Array<object>).find(
				(i) => i['name'] === 'collidable'
			)['value'];

			let layer: Phaser.Tilemaps.StaticTilemapLayer = map
				.createStaticLayer(layerData.name, tilesets)
				.setDepth(depth);

			if (collidable) {
				layer.setCollisionByExclusion([-1]);
				this.obstacles.push(layer);
			}
		}

		return map;
	}
}
