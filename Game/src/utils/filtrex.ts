import * as filtrex from 'filtrex';

function flagsMapToObj(flagsMap: Map<string, boolean | number>): Object {
    const flagsObj: Object = {};

    for (let [key, value] of flagsMap) {
        flagsObj[key] = value;
    }

    flagsObj["true"] = true;
    flagsObj["false"] = false;

    return flagsObj;
}

export function boolean(expression: string, flags: Map<string, boolean | number>): boolean | Error {

    let flagsObj: Object = flagsMapToObj(flags);

    try {
        let filter = filtrex.compileExpression(expression);
        let result: boolean = !!filter(flagsObj);
        return result;
    } catch (err) {
        return err;
    }
}

export function number(expression: string, flags: Map<string, boolean | number>): number | Error {
    let flagsObj: Object = flagsMapToObj(flags);

    try {
        let filter = filtrex.compileExpression(expression);
        let result: number = +filter(flagsObj);
        return result;
    } catch (err) {
        return err;
    }
}