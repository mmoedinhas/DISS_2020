import { IPlayerType, IEmotionalRequirement } from "./interfaces";

export class EmotionalValidator {

    private evaluators = {
        ">": function(x, y) { return x > y; },
        "<": function(x, y) { return x < y; },
        ">=": function(x, y) { return x >= y; },
        "<=": function(x, y) { return x <= y; },
        "=": function(x, y) { return x == y; },
        "!=": function(x, y) { return x != y; }
    };

    private playerType: IPlayerType;

    constructor(playerType: IPlayerType) {
        this.playerType = playerType;
    }

    public matches(emotionalRequirements: IEmotionalRequirement[]): boolean {

        let allTrue = true;

        for (let emotionalRequirement of emotionalRequirements) {
            let evaluator = this.evaluators[emotionalRequirement.condition];
            let parameter = emotionalRequirement.parameter;
            let value = emotionalRequirement.value;

            if(!evaluator(this.playerType[parameter],value)) {
                allTrue = false;
                break;
            }
        }

        return allTrue;
    }
}