module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://diss2020.com/actors.schema.json",
    "type": "object",
    "title": "Actors",
    "description": "A list of all the actors in the game and their properties",
    "required": [
        "actors"
    ],
    "properties": {
        "actors": {
            "$id": "#/properties/actors",
            "type": "array",
            "title": "Actors",
            "description": "A list of all the actors in the game (protagonists, NPCs, enemies)",
            "items": {
                "$id": "#/properties/actors/items",
                "type": "object",
                "title": "Actor",
                "description": "The representation of an actor",
                "required": [
                    "id",
                    "name",
                    "tilesetId",
                    "defaultFrame",
                    "animations",
                    "body"
                ],
                "properties": {
                    "id": {
                        "$id": "#/properties/actors/items/properties/id",
                        "type": "string",
                        "title": "Id",
                        "description": "The unique ID for this actor"
                    },
                    "name": {
                        "$id": "#/properties/actors/items/properties/name",
                        "type": "string",
                        "title": "Name",
                        "description": "The actor's name"
                    },
                    "tilesetId": {
                        "$id": "#/properties/actors/items/properties/tilesetId",
                        "type": "string",
                        "title": "Tileset",
                        "description": "The name/id of the tileset containing the sprites for this actor"
                    },
                    "defaultFrame": {
                        "$id": "#/properties/actors/items/properties/initFrame",
                        "type": "integer",
                        "title": "Init Frame",
                        "description": "The default/initial frame of this actor."
                    },
                    "animations": {
                        "$id": "#/properties/actors/items/properties/animations",
                        "type": "array",
                        "title": "animations",
                        "description": "A list of the animations for the actor. The keys \"right\", \"left\", \"top\" and \"down\" are reserved for walking animations.",
                        "items": {
                            "$id": "#/properties/actors/items/properties/animations/items",
                            "type": "object",
                            "title": "Animation",
                            "description": "A representation of an animation. To define walking animations, declare 4 animations with the \"right\", \"left\", \"top\" and \"down\" keys",
                            "required": [
                                "key",
                                "frames",
                                "frameRate",
                                "repeat"
                            ],
                            "properties": {
                                "key": {
                                    "$id": "#/properties/actors/items/properties/animations/items/properties/key",
                                    "type": "string",
                                    "title": "Key",
                                    "description": "The animation key"
                                },
                                "frames": {
                                    "$id": "#/properties/actors/items/properties/animations/items/properties/frames",
                                    "type": "array",
                                    "title": "Frames",
                                    "description": "The frames in the tileset required for the animation",
                                    "items": {
                                        "$id": "#/properties/actors/items/properties/animations/items/properties/frames/items",
                                        "type": "integer",
                                        "title": "Frame",
                                        "description": "The index corresponding to the desired frame in the tileset"
                                    }
                                },
                                "frameRate": {
                                    "$id": "#/properties/actors/items/properties/animations/items/properties/frameRate",
                                    "type": "integer",
                                    "title": "Framerate",
                                    "description": "The framerate of the animation"
                                },
                                "repeat": {
                                    "$id": "#/properties/actors/items/properties/animations/items/properties/repeat",
                                    "type": "integer",
                                    "title": "Repeat",
                                    "description": "Number of times the animation should repeat. -1 if animation should loop forever"
                                }
                            }
                        }
                    },
                    "body": {
                        "$id": "#/properties/actors/items/properties/body",
                        "type": "object",
                        "title": "Body",
                        "description": "Description of the physics body of this actor",
                        "required": [
                            "height",
                            "width",
                            "anchor"
                        ],
                        "properties": {
                            "height": {
                                "$id": "#/properties/actors/items/properties/body/properties/height",
                                "type": "integer",
                                "title": "Height",
                                "description": "The height of the physics body, as a percentage of the height of the sprite.",
                                "minimum": 1
                            },
                            "width": {
                                "$id": "#/properties/actors/items/properties/body/properties/width",
                                "type": "integer",
                                "title": "Width",
                                "description": "The width of the physics body, as a percentage of the width of the sprite.",
                                "minimum": 1
                            },
                            "anchor": {
                                "$id": "#/properties/actors/items/properties/body/properties/anchor",
                                "type": "string",
                                "title": "Anchor",
                                "description": "The anchor to which the sprite center will be calculated.",
                                "pattern": "^((left|right|center)-(top|bottom|center))$"
                            }
                        }
                    }
                }
            }
        }
    }
}