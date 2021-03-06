module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://diss2020.com/player-profile.schema.json",
    "type": "object",
    "title": "Player Profile",
    "description": "The affective profile of a player",
    "additionalProperties": false,
    "properties": {
        "anger": {
            "$id": "#/properties/anger",
            "type": "integer",
            "title": "Anger",
            "description": "The amount of anger that the player is feeling."
        },
        "disgust": {
            "$id": "#/properties/disgust",
            "type": "integer",
            "title": "Disgust",
            "description": "The amount of disgust that the player is feeling."
        },
        "fear": {
            "$id": "#/properties/fear",
            "type": "integer",
            "title": "Fear",
            "description": "The amount of fear that the player is feeling."
        },
        "anxiety": {
            "$id": "#/properties/anxiety",
            "type": "integer",
            "title": "Anxiety",
            "description": "The amount of anxiety that the player is feeling."
        },
        "sadness": {
            "$id": "#/properties/sadness",
            "type": "integer",
            "title": "Sadness",
            "description": "The amount of sadness that the player is feeling."
        },
        "desire": {
            "$id": "#/properties/desire",
            "type": "integer",
            "title": "Desire",
            "description": "The amount of desire that the player is feeling."
        },
        "relaxation": {
            "$id": "#/properties/relaxation",
            "type": "integer",
            "title": "Relaxation",
            "description": "The amount of relaxation that the player is feeling."
        },
        "happiness": {
            "$id": "#/properties/happiness",
            "type": "integer",
            "title": "Happiness",
            "description": "The amount of happiness that the player is feeling."
        }
    }
}