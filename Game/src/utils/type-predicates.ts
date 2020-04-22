import * as Phaser from 'phaser';

export function isArcadeBody(body: object|Phaser.Physics.Arcade.Body|Phaser.Physics.Impact.Body): body is Phaser.Physics.Arcade.Body {
    return body instanceof Phaser.Physics.Arcade.Body;
}

export function isWebGLRenderer(renderer: Phaser.Renderer.Canvas.CanvasRenderer|Phaser.Renderer.WebGL.WebGLRenderer): renderer is Phaser.Renderer.WebGL.WebGLRenderer {
    return renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer;
}