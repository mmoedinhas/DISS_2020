module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://diss2020.com/cutscene.schema.json",
    "type": "object",
    "title": "Cutscene",
    "description": "The description of a game cutscene",
    "required": [
        "name",
        "actors",
        "actions"
    ],
    "properties": {
        "name": {
            "$id": "#/properties/name",
            "type": "string",
            "title": "Name",
            "description": "The name/id of the event"
        },
        "actors": {
            "$id": "#/properties/actors",
            "type": "array",
            "title": "Actors",
            "description": "A list of the actors present in the event",
            "items": {
                "$id": "#/properties/actors/items",
                "type": "object",
                "title": "Actor",
                "description": "The id and starting position of the actor",
                "required": [
                    "actorId",
                    "start"
                ],
                "properties": {
                    "actorId": {
                        "$id": "#/properties/actors/items/properties/actorId",
                        "type": "string",
                        "title": "Actor Id",
                        "description": "The ID of the actor defined in the actors file"
                    },
                    "start": {
                        "$id": "#/properties/actors/items/properties/start",
                        "type": "array",
                        "title": "Start",
                        "description": "The starting position of the actor in the map",
                        "items": {
                            "$id": "#/properties/actors/items/properties/start/items",
                            "type": "integer",
                            "title": "X, Y",
                            "description": "The X and Y position in the map "
                        }
                    }
                }
            }
        },
        "actions": {
            "$id": "#/properties/actions",
            "type": "array",
            "title": "actions",
            "description": "A list of the actions in this event",
            "items": {
                "$id": "#/properties/actions/items",
                "type": "object",
                "title": "Action",
                "description": "The representation of an action",
                "required": [
                    "action",
                    "arguments",
                    "actorId"
                ],
                "properties": {
                    "action": {
                        "$id": "#/properties/actions/items/properties/action",
                        "type": "string",
                        "title": "Action",
                        "description": "The type of action. For example, it can be \"walk\" or \"talk\""
                    },
                    "arguments": {
                        "$id": "#/properties/actions/items/properties/arguments",
                        "type": "object",
                        "title": "Arguments",
                        "description": "The arguments for the specific action"
                    },
                    "actorId": {
                        "$id": "#/properties/actions/items/properties/actor",
                        "type": "string",
                        "title": "Actor",
                        "description": "The actor that should perform the action"
                    }
                }
            }
        }
    }
}