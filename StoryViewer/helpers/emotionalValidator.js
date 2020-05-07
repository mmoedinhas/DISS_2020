class EmotionalValidator {

    evaluators = {
        ">": function(x, y) { return x > y; },
        "<": function(x, y) { return x < y; },
        ">=": function(x, y) { return x >= y; },
        "<=": function(x, y) { return x <= y; },
        "=": function(x, y) { return x == y; },
        "!=": function(x, y) { return x != y; }
    };

    constructor(playerType) {
        this.playerType = playerType;
    }

    matches(emotionalRequirements) {

        let allTrue = true;

        for (let emotionalRequirement of emotionalRequirements) {
            let evaluator = this.evaluators[emotionalRequirement.condition];
            let parameter = emotionalRequirement.parameter;
            let value = emotionalRequirement.value;

            if (!evaluator(this.playerType[parameter], value)) {
                allTrue = false;
                break;
            }
        }

        return allTrue;
    }
}

module.exports = EmotionalValidator;