module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://diss2020.com/tilesets.schema.json",
    "type": "array",
    "title": "Tilesets",
    "description": "A list of all the tilesets used in the game",
    "items": {
        "type": "object",
        "title": "Tileset",
        "description": "An object description of a tileset.",
        "required": [
            "id",
            "filename",
            "frameWidth",
            "frameHeight"
        ],
        "properties": {
            "id": {
                "type": "string",
                "title": "Id",
                "description": "The id of this tileset. Must be unique"
            },
            "filename": {
                "type": "string",
                "title": "Filename",
                "description": "The filename where this tileset is"
            },
            "frameWidth": {
                "type": "integer",
                "title": "Frame width",
                "description": "The width of each frame"
            },
            "frameHeight": {
                "type": "integer",
                "title": "Frame Height",
                "description": "The height of each frame"
            }
        }
    }
}