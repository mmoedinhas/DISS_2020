export function isArcadeBody(body: object|Phaser.Physics.Arcade.Body|Phaser.Physics.Impact.Body): body is Phaser.Physics.Arcade.Body {
    return body instanceof Phaser.Physics.Arcade.Body;
}