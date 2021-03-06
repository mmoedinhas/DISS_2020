module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://example.com/example.json",
    "type": "object",
    "title": "The Root Schema",
    "description": "The root schema comprises the entire JSON document.",
    "required": [
        "firstLocation",
        "scenes"
    ],
    "properties": {
        "firstLocation": {
            "$id": "#/properties/firstLocation",
            "type": "string",
            "title": "First Location",
            "description": "Which location should be used for first scene",
            "default": "",
            "examples": [
                "salon"
            ]
        },
        "scenes": {
            "$id": "#/properties/scenes",
            "type": "array",
            "title": "Scenes",
            "description": "An array containing all the possible scenes of the game. Each scene represents a different map in the game",
            "default": [],
            "items": {
                "$id": "#/properties/scenes/items",
                "type": "object",
                "title": "Scene",
                "description": "The overview representation of a scene",
                "default": {},
                "examples": [{
                    "locationId": "salon",
                    "name": "happySalon",
                    "description": "The dance salon looks well lit and nicely decorated with warm colors.",
                    "map": "dance_hall",
                    "priority": 2,
                    "emotionalRequirements": [],
                    "transitions": [{
                        "unlockedOnEventsEnding": [
                            "happySalon_3A"
                        ],
                        "toLocation": "hugeSalon",
                        "name": "happySalonToHugeSalon"
                    }],
                    "firstEvents": [
                        "happySalon_1A",
                        "happySalon_1B"
                    ],
                    "events": [{
                            "name": "happySalon_1A",
                            "description": "Clara is excited and happy for the Christmas party.",
                            "type": "cutscene",
                            "priority": 2,
                            "emotionalRequirements": [],
                            "nextEvents": [
                                "happySalon_2A",
                                "happySalon_3A"
                            ]
                        },
                        {
                            "name": "happySalon_1B",
                            "description": "Clara is happy for the party but is somewhat nervous.",
                            "type": "cutscene",
                            "priority": 1,
                            "emotionalRequirements": [{
                                "parameter": "anxiety",
                                "condition": ">",
                                "value": 8
                            }],
                            "nextEvents": [
                                "happySalon_2A",
                                "happySalon_3A"
                            ]
                        },
                        {
                            "name": "happySalon_2A",
                            "description": "Since she is nervous, she only wants to talk to her Grandma first.",
                            "type": "gameplay",
                            "priority": 1,
                            "emotionalRequirements": [{
                                "parameter": "anxiety",
                                "condition": ">",
                                "value": 8
                            }],
                            "nextEvents": [
                                "happySalon_3A"
                            ]
                        },
                        {
                            "name": "happySalon_3A",
                            "description": "Time to talk to other guests and check the cake.",
                            "type": "gameplay",
                            "priority": 2,
                            "emotionalRequirements": [],
                            "nextEvents": []
                        }
                    ]
                }],
                "required": [
                    "locationId",
                    "name",
                    "description",
                    "map",
                    "priority",
                    "emotionalRequirements",
                    "transitions",
                    "firstEvents",
                    "events"
                ],
                "properties": {
                    "locationId": {
                        "$id": "#/properties/scenes/items/properties/locationId",
                        "type": "string",
                        "title": "Location ID",
                        "description": "The location to which this scene belongs to.",
                        "default": "",
                        "examples": [
                            "salon"
                        ]
                    },
                    "name": {
                        "$id": "#/properties/scenes/items/properties/name",
                        "type": "string",
                        "title": "Name",
                        "description": "The name/id of the scene. Must be unique",
                        "default": "",
                        "examples": [
                            "scene1A"
                        ]
                    },
                    "description": {
                        "$id": "#/properties/scenes/items/properties/description",
                        "type": "string",
                        "title": "Description",
                        "description": "A small textual description for this scene",
                        "default": "",
                        "examples": [
                            "Small description"
                        ]
                    },
                    "map": {
                        "$id": "#/properties/scenes/items/properties/map",
                        "type": "string",
                        "title": "Map",
                        "description": "The key to the map of this scene",
                        "default": "",
                        "examples": [
                            "dance_hallA"
                        ]
                    },
                    "priority": {
                        "$id": "#/properties/scenes/items/properties/priority",
                        "type": "integer",
                        "title": "Priority",
                        "description": "In case there is a tie in the emotional requirements of the scenes, the framework chooses the one with the highest priority",
                        "default": 0,
                        "examples": [
                            1
                        ]
                    },
                    "emotionalRequirements": {
                        "$id": "#/properties/scenes/items/properties/emotionalRequirements",
                        "type": "array",
                        "title": "Emotional Requirements",
                        "description": "The emotional requirements for this scene to show to the player. This scene will only show to the player if the conditions stated in this array are ALL TRUE",
                        "default": [],
                        "items": {
                            "$id": "#/properties/scenes/items/properties/emotionalRequirements/items",
                            "type": "object",
                            "title": "Requirement",
                            "description": "The representation of an emotional requirement",
                            "default": {},
                            "examples": [{
                                "parameter": "anger",
                                "value": 8.0,
                                "condition": ">="
                            }],
                            "required": [
                                "parameter",
                                "condition",
                                "value"
                            ],
                            "properties": {
                                "parameter": {
                                    "$id": "#/properties/scenes/items/properties/emotionalRequirements/items/properties/parameter",
                                    "type": "string",
                                    "title": "Parameter",
                                    "description": "The name of the parameter(emotion) to be evaluated. Can be \"anger\", \"disgust\", \"fear\", \"anxiety\", \"sadness\", \"desire\", \"relaxation\" or \"happiness\"",
                                    "default": "",
                                    "examples": [
                                        "anger",
                                        "disgust",
                                        "fear",
                                        "anxiety",
                                        "sadness",
                                        "desire",
                                        "relaxation"
                                    ]
                                },
                                "condition": {
                                    "$id": "#/properties/scenes/items/properties/emotionalRequirements/items/properties/condition",
                                    "type": "string",
                                    "title": "Condition",
                                    "description": "Can be >, <, >=, <=, =, !=",
                                    "default": "",
                                    "examples": [
                                        ">="
                                    ]
                                },
                                "value": {
                                    "$id": "#/properties/scenes/items/properties/emotionalRequirements/items/properties/value",
                                    "type": "integer",
                                    "title": "Value",
                                    "description": "The value to be compared to",
                                    "default": 0,
                                    "examples": [
                                        8
                                    ]
                                }
                            },
                            "patternProperties": {},
                            "dependencies": {}
                        }
                    },
                    "transitions": {
                        "$id": "#/properties/scenes/items/properties/transitions",
                        "type": "array",
                        "title": "Transitions",
                        "description": "List of transitions possible from this scene/map to other scenes and the necessary conditions for these transitions to be available",
                        "default": [],
                        "items": {
                            "$id": "#/properties/scenes/items/properties/transitions/items",
                            "type": "object",
                            "title": "Transition",
                            "description": "Description of a possible transition from scene A to scene B",
                            "default": {},
                            "examples": [{
                                "unlockedOnEventsEnding": [
                                    "sadSalon_1A",
                                    "sadSalon_1B"
                                ],
                                "toLocation": "hugeSalon",
                                "name": "sadSalonToHugeSalon"
                            }],
                            "required": [
                                "toLocation",
                                "name"
                            ],
                            "properties": {
                                "name": {
                                    "$id": "#/properties/scenes/items/properties/transitions/items/properties/name",
                                    "type": "string",
                                    "title": "Name",
                                    "description": "The id/name of this transiction. Must be unique",
                                    "default": "",
                                    "examples": [
                                        "sadSalonToHugeSalon"
                                    ]
                                },
                                "toLocation": {
                                    "$id": "#/properties/scenes/items/properties/transitions/items/properties/toLocation",
                                    "type": "string",
                                    "title": "To Location",
                                    "description": "The id of the location to transition to",
                                    "default": "",
                                    "examples": [
                                        "scene2A"
                                    ]
                                },
                                "unlockedOnEventsEnding": {
                                    "$id": "#/properties/scenes/items/properties/transitions/items/properties/unlockedOnEventsEnding",
                                    "type": "array",
                                    "title": "Unlocked On Events Ending",
                                    "description": "Which events'endings trigger the unlocking of the transiction",
                                    "default": [],
                                    "items": {
                                        "$id": "#/properties/scenes/items/properties/transitions/items/properties/unlockedOnEventsEnding/items",
                                        "type": "string",
                                        "title": "Event ID",
                                        "description": "The event ID that enables the transiction after the event ends",
                                        "default": "",
                                        "examples": [
                                            "event1A_1A"
                                        ],
                                        "patternProperties": {},
                                        "dependencies": {}
                                    }
                                }
                            },
                            "patternProperties": {},
                            "dependencies": {}
                        }
                    },
                    "firstEvents": {
                        "$id": "#/properties/scenes/items/properties/firstEvents",
                        "type": "array",
                        "title": "First Events",
                        "description": "A list of event ids (of this current scene) that can be the first event of the scene",
                        "default": [],
                        "examples": [
                            [
                                "event1A2", "event1B2"
                            ]
                        ],
                        "additionalItems": true,
                        "items": {
                            "$id": "#/properties/scenes/items/properties/firstEvents/items",
                            "type": "string",
                            "title": "Event id",
                            "description": "The id of the event. Must belong to the same scene.",
                            "default": "",
                            "examples": [
                                "event1A2"
                            ]
                        }
                    },
                    "events": {
                        "$id": "#/properties/scenes/items/properties/events",
                        "type": "array",
                        "title": "Events",
                        "description": "The list of events to take place in the scene. Can be cutscenes or gameplay",
                        "default": [],
                        "items": {
                            "$id": "#/properties/scenes/items/properties/events/items",
                            "type": "object",
                            "title": "Event",
                            "description": "An overview representation of an event",
                            "default": {},
                            "examples": [{
                                    "name": "event1A1A",
                                    "description": "Small description",
                                    "priority": 1.0,
                                    "emotionalRequirements": [{
                                        "value": 8.0,
                                        "condition": ">=",
                                        "parameter": "anger"
                                    }],
                                    "nextEvents": [
                                        "event1A2"
                                    ],
                                    "type": "cutscene"
                                },
                                {
                                    "emotionalRequirements": [{
                                        "value": 8.0,
                                        "condition": ">=",
                                        "parameter": "anger"
                                    }],
                                    "type": "cutscene",
                                    "name": "event1A1B",
                                    "description": "Small description",
                                    "priority": 2.0,
                                    "nextEvents": [
                                        "event1A2"
                                    ]
                                },
                                {
                                    "name": "event1A2",
                                    "description": "Small description",
                                    "priority": 1.0,
                                    "emotionalRequirements": [],
                                    "type": "gameplay",
                                    "nextEvents": [
                                        "event1A2"
                                    ]
                                }
                            ],
                            "required": [
                                "name",
                                "description",
                                "type",
                                "priority",
                                "emotionalRequirements",
                                "nextEvents"
                            ],
                            "properties": {
                                "name": {
                                    "$id": "#/properties/scenes/items/properties/events/items/properties/name",
                                    "type": "string",
                                    "title": "Name",
                                    "description": "The name/id of the event. Must be unique. Must match the name (minus the extension) of the file containing the event.",
                                    "default": "",
                                    "examples": [
                                        "event1A1A"
                                    ]
                                },
                                "description": {
                                    "$id": "#/properties/scenes/items/properties/events/items/properties/description",
                                    "type": "string",
                                    "title": "Description",
                                    "description": "A small textual description of the event",
                                    "default": "",
                                    "examples": [
                                        "Small description"
                                    ]
                                },
                                "type": {
                                    "$id": "#/properties/scenes/items/properties/events/items/properties/type",
                                    "type": "string",
                                    "pattern": "^(cutscene|gameplay)$",
                                    "title": "Type",
                                    "description": "Can be cutscene or gameplay",
                                    "default": "",
                                    "examples": [
                                        "cutscene"
                                    ]
                                },
                                "priority": {
                                    "$id": "#/properties/scenes/items/properties/events/items/properties/priority",
                                    "type": "integer",
                                    "title": "Priority",
                                    "description": "In case there is a tie in the emotional requirements of the scenes, the framework chooses the one with the highest priority",
                                    "default": 0,
                                    "examples": [
                                        1
                                    ]
                                },
                                "emotionalRequirements": {
                                    "$id": "#/properties/scenes/items/properties/events/items/properties/emotionalRequirements",
                                    "type": "array",
                                    "title": "Emotional requirements",
                                    "description": "The emotional requirements for this event to be available to the player. This event will only show to the player if the conditions stated in this array are ALL TRUE",
                                    "default": [],
                                    "items": {
                                        "$id": "#/properties/scenes/items/properties/events/items/properties/emotionalRequirements/items",
                                        "type": "object",
                                        "title": "Requirement",
                                        "description": "The representation of an emotional requirement",
                                        "default": {},
                                        "examples": [{
                                            "value": 8.0,
                                            "condition": ">=",
                                            "parameter": "anger"
                                        }],
                                        "required": [
                                            "parameter",
                                            "condition",
                                            "value"
                                        ],
                                        "properties": {
                                            "parameter": {
                                                "$id": "#/properties/scenes/items/properties/events/items/properties/emotionalRequirements/items/properties/parameter",
                                                "type": "string",
                                                "title": "Parameter",
                                                "description": "The name of the parameter(emotion) to be evaluated. Can be \"anger\", \"disgust\", \"fear\", \"anxiety\", \"sadness\", \"desire\", \"relaxation\" or \"happiness\"",
                                                "default": "",
                                                "examples": [
                                                    "anger",
                                                    "disgust",
                                                    "fear",
                                                    "anxiety",
                                                    "sadness",
                                                    "desire",
                                                    "relaxation"
                                                ]
                                            },
                                            "condition": {
                                                "$id": "#/properties/scenes/items/properties/events/items/properties/emotionalRequirements/items/properties/condition",
                                                "type": "string",
                                                "title": "Condition",
                                                "description": "Can be >, <, >=, <=, =, !=",
                                                "default": "",
                                                "examples": [
                                                    ">="
                                                ]
                                            },
                                            "value": {
                                                "$id": "#/properties/scenes/items/properties/events/items/properties/emotionalRequirements/items/properties/value",
                                                "type": "integer",
                                                "title": "Value",
                                                "description": "The value to be compared to",
                                                "default": 0,
                                                "examples": [
                                                    8
                                                ]
                                            }
                                        },
                                        "patternProperties": {},
                                        "dependencies": {}
                                    }
                                },
                                "nextEvents": {
                                    "$id": "#/properties/scenes/items/properties/events/items/properties/nextEvents",
                                    "type": "array",
                                    "title": "Next Events",
                                    "description": "A list of event ids (of this current scene) that can be the next events occuring after this event",
                                    "default": [],
                                    "examples": [
                                        [
                                            "event1A2"
                                        ]
                                    ],
                                    "additionalItems": true,
                                    "items": {
                                        "$id": "#/properties/scenes/items/properties/events/items/properties/nextEvents/items",
                                        "type": "string",
                                        "title": "Event id",
                                        "description": "The id of the event that could happen next. Must belong to the same scene.",
                                        "default": "",
                                        "examples": [
                                            "event1A2"
                                        ]
                                    }
                                }
                            },
                            "patternProperties": {},
                            "dependencies": {}
                        }
                    }
                },
                "patternProperties": {},
                "dependencies": {}
            }
        }
    },
    "patternProperties": {},
    "dependencies": {}
}