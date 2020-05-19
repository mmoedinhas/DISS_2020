module.exports = {
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "http://diss2020.com/enemies.schema.json",
    "type": "object",
    "title": "Enemies",
    "description": "A list of all the enemies in the game and their properties",
    "required": [
        "enemies"
    ],
    "properties": {
        "enemies": {
            "$id": "#/properties/enemies",
            "type": "array",
            "title": "Enemies",
            "description": "An array containing all enemies of the game",
            "items": {
                "$id": "#/properties/enemies/items",
                "type": "object",
                "title": "Enemy",
                "description": "The object representation of an enemy",
                "required": [
                    "id",
                    "hp",
                    "mp",
                    "attack",
                    "defense",
                    "speed",
                    "moveset",
                    "behaviors"
                ],
                "properties": {
                    "id": {
                        "$id": "#/properties/enemies/items/properties/id",
                        "type": "string",
                        "title": "Id",
                        "description": "The unique Id of the enemy"
                    },
                    "hp": {
                        "$id": "#/properties/enemies/items/properties/hp",
                        "type": "integer",
                        "title": "HP",
                        "description": "The total Health Points of the enemy"
                    },
                    "mp": {
                        "$id": "#/properties/enemies/items/properties/mp",
                        "type": "integer",
                        "title": "MP",
                        "description": "The total Magic Points of the enemy"
                    },
                    "attack": {
                        "$id": "#/properties/enemies/items/properties/attack",
                        "type": "integer",
                        "title": "Attack",
                        "description": "The base attack of the enemy"
                    },
                    "defense": {
                        "$id": "#/properties/enemies/items/properties/defense",
                        "type": "integer",
                        "title": "Defense",
                        "description": "The defense of the enemy"
                    },
                    "speed": {
                        "$id": "#/properties/enemies/items/properties/speed",
                        "type": "integer",
                        "title": "Speed",
                        "description": "The speed of the enemy to decide its order in the battle turns. The higher speed, the sooner the enemy acts in the turn"
                    },
                    "moveset": {
                        "$id": "#/properties/enemies/items/properties/moveset",
                        "type": "object",
                        "title": "Moveset",
                        "description": "A list of all the moves available to this enemy",
                        "required": [
                            "attacks",
                            "buffs"
                        ],
                        "properties": {
                            "attacks": {
                                "$id": "#/properties/enemies/items/properties/moveset/properties/attacks",
                                "type": "array",
                                "title": "Attacks",
                                "description": "A list of all the attacks available to the enemy ",
                                "items": {
                                    "$id": "#/properties/enemies/items/properties/moveset/properties/attacks/items",
                                    "type": "object",
                                    "title": "Attack",
                                    "description": "The object representation of an attack",
                                    "required": [
                                        "name",
                                        "power",
                                        "mpCost",
                                        "accuracy",
                                        "target"
                                    ],
                                    "properties": {
                                        "name": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/attacks/items/properties/name",
                                            "type": "string",
                                            "title": "Name",
                                            "description": "The name of the attack. The name \"attack\" is reserved to the basic attack"
                                        },
                                        "power": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/attacks/items/properties/power",
                                            "type": "integer",
                                            "title": "Power",
                                            "description": "The power of the attack. The damage of this attack is basicAttack*power"
                                        },
                                        "mpCost": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/attacks/items/properties/mpCost",
                                            "type": "integer",
                                            "title": "MP cost",
                                            "description": "The MP cost for this attack"
                                        },
                                        "accuracy": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/attacks/items/properties/accuracy",
                                            "type": "number",
                                            "title": "Accuracy",
                                            "description": "The accuracy of this attack in percentage. If 100% the attack always hits"
                                        },
                                        "target": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/attacks/items/properties/target",
                                            "type": "string",
                                            "title": "Target",
                                            "description": "The target of the attack. If \"one\" the attacks targets one party member. If \"all\" the attack targets everyone in the party"
                                        }
                                    }
                                }
                            },
                            "buffs": {
                                "$id": "#/properties/enemies/items/properties/moveset/properties/buffs",
                                "type": "array",
                                "title": "Buffs",
                                "description": "The list of possible buffs for this enemy to use in their party",
                                "items": {
                                    "$id": "#/properties/enemies/items/properties/moveset/properties/buffs/items",
                                    "type": "object",
                                    "title": "Buff",
                                    "description": "The object representation of a buff",
                                    "required": [
                                        "name",
                                        "action",
                                        "arguments",
                                        "mpCost",
                                        "target"
                                    ],
                                    "properties": {
                                        "name": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/buffs/items/properties/name",
                                            "type": "string",
                                            "title": "Name",
                                            "description": "The name of the buff"
                                        },
                                        "action": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/buffs/items/properties/action",
                                            "type": "string",
                                            "title": "Action",
                                            "description": "The kind of action this buff does"
                                        },
                                        "arguments": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/buffs/items/properties/arguments",
                                            "type": "object",
                                            "title": "Arguments",
                                            "description": "An object with the list of arguments needed for this action. Example: if \"heal\" arguments could be \"percentage\": 30, meaning the amount of health healed",
                                            "required": [
                                                "percentage"
                                            ]
                                        },
                                        "mpCost": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/buffs/items/properties/mpCost",
                                            "type": "integer",
                                            "title": "MP Cost",
                                            "description": "The MP cost for this buff"
                                        },
                                        "target": {
                                            "$id": "#/properties/enemies/items/properties/moveset/properties/buffs/items/properties/target",
                                            "type": "string",
                                            "title": "Target",
                                            "description": "The target of the buff. If \"one\" the attacks buffs one party member. If \"all\" the buff targets everyone in the party"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "behaviors": {
                        "$id": "#/properties/enemies/items/properties/behaviors",
                        "type": "array",
                        "title": "Behaviors",
                        "description": "The \"AI\" of the enemy: a list of behaviors ordered by priority",
                        "items": {
                            "$id": "#/properties/enemies/items/properties/behaviors/items",
                            "type": "object",
                            "title": "Behavior",
                            "description": "An object representation of a possible behavior of the enemy",
                            "required": [
                                "conditions",
                                "activation",
                                "action"
                            ],
                            "properties": {
                                "conditions": {
                                    "$id": "#/properties/enemies/items/properties/behaviors/items/properties/conditions",
                                    "type": "array",
                                    "title": "Conditions",
                                    "description": "The activation conditions for the enemy to conduct this behavior",
                                    "items": {
                                        "$id": "#/properties/enemies/items/properties/behaviors/items/properties/conditions/items",
                                        "type": "object",
                                        "title": "Condition",
                                        "description": "An object representation of a condition",
                                        "required": [
                                            "field",
                                            "target",
                                            "operator",
                                            "percentage"
                                        ],
                                        "properties": {
                                            "field": {
                                                "$id": "#/properties/enemies/items/properties/behaviors/items/properties/conditions/items/properties/field",
                                                "type": "string",
                                                "title": "Field",
                                                "description": "The field that this behavior will watch. Example: if \"hp\" this behavior will activate when the \"hp\" reaches a certain value"
                                            },
                                            "target": {
                                                "$id": "#/properties/enemies/items/properties/behaviors/items/properties/conditions/items/properties/target",
                                                "type": "string",
                                                "title": "Target",
                                                "description": "The target that contains the field that is being watched. Can be \"enemyOne\", \"enemyAll\", \"friendOne\", \"friendAll\""
                                            },
                                            "operator": {
                                                "$id": "#/properties/enemies/items/properties/behaviors/items/properties/conditions/items/properties/operator",
                                                "type": "string",
                                                "title": "Operator",
                                                "description": "The operator to be used in the comparison of the field being watched and the desired percentage value"
                                            },
                                            "percentage": {
                                                "$id": "#/properties/enemies/items/properties/behaviors/items/properties/conditions/items/properties/percentage",
                                                "type": "string",
                                                "title": "Percentage",
                                                "description": "The percentage value. Example: if the field being watched is \"hp\", the operator is \"<=\" and percentage is \"30\", this behavior will activate if the hp is less or equal than 30%"
                                            }
                                        }
                                    }
                                },
                                "activation": {
                                    "$id": "#/properties/enemies/items/properties/behaviors/items/properties/activation",
                                    "type": "integer",
                                    "title": "Activation",
                                    "description": "A percentage of activation for this behavior. If the behavior activation: 100 the behavior will always occur if the conditions allow it"
                                },
                                "action": {
                                    "$id": "#/properties/enemies/items/properties/behaviors/items/properties/action",
                                    "type": "string",
                                    "title": "Action",
                                    "description": "The name of the action to take. Can be an attack or a buff"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}