module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://diss2020.com/items.schema.json",
    "type": "object",
    "title": "Items",
    "description": "A list of all game items that the player can pick and add to the inventory",
    "required": [
        "items"
    ],
    "properties": {
        "items": {
            "$id": "#/properties/items",
            "type": "array",
            "title": "Items",
            "description": "A list of all the items in this game",
            "items": {
                "$id": "#/properties/items/items",
                "type": "object",
                "title": "Item",
                "description": "The description of an item",
                "required": [
                    "itemId",
                    "name",
                    "tileset",
                    "frame"
                ],
                "properties": {
                    "itemId": {
                        "$id": "#/properties/items/items/properties/itemId",
                        "type": "string",
                        "title": "Item id",
                        "description": "The id for this item. Should be unique"
                    },
                    "name": {
                        "$id": "#/properties/items/items/properties/name",
                        "type": "string",
                        "title": "Name",
                        "description": "The name of this item as seen by the player"
                    },
                    "tileset": {
                        "$id": "#/properties/items/items/properties/tileset",
                        "type": "string",
                        "title": "Tileset",
                        "description": "The id/name of tileset where the graphics for this item can be found"
                    },
                    "frame": {
                        "$id": "#/properties/items/items/properties/frame",
                        "type": "integer",
                        "title": "Frame",
                        "description": "The specific frame in the tileset where the item is"
                    }
                }
            }
        }
    }
}