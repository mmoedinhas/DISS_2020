import * as Phaser from 'phaser';
import { Actor } from '../game/actor';

export function isArcadeBody(body: object|Phaser.Physics.Arcade.Body|MatterJS.BodyType): body is Phaser.Physics.Arcade.Body {
    return body instanceof Phaser.Physics.Arcade.Body;
}

export function isWebGLRenderer(renderer: Phaser.Renderer.Canvas.CanvasRenderer|Phaser.Renderer.WebGL.WebGLRenderer): renderer is Phaser.Renderer.WebGL.WebGLRenderer {
    return renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer;
}

export function isActor(actor: any): actor is Actor {
    return actor instanceof Actor;
}

export function isStaticMapLayer(layer: any): layer is Phaser.Tilemaps.StaticTilemapLayer {
    return layer instanceof Phaser.Tilemaps.StaticTilemapLayer;
}