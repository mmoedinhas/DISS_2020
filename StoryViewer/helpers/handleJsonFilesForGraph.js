const validateJson = require('./validateJson.js');
const path = require('path');
const fs = require('fs');

function getFilenameFromPath(filepath) {
    let slashIndex = (filepath.lastIndexOf(path.sep) === -1) ? 0 : filepath.lastIndexOf(path.sep);
    let filename = filepath.slice(slashIndex + 1);
    return filename;
}

function openJsonFiles(filepaths) {

    let jsonObjs = {
        objs: [],
        errors: []
    }

    for (filepath of filepaths) {
        try {
            let obj = JSON.parse(fs.readFileSync(filepath, 'utf8'));
            jsonObjs.objs.push(obj);
        } catch (err) {
            let filename = getFilenameFromPath(filepath);
            console.log(err);
            jsonObjs.errors.push('Error: ' + filename + ' file not found');
        }
    }

    return jsonObjs;
}

function handleJsonFilesForGraph(overallNarrativeFile, playerProfileFile) {

    let returnObj = {
        overallNarrative: undefined,
        playerProfile: undefined,
        errors: []
    }

    schemaObjs = openJsonFiles([
        path.join(__dirname + '/../json/schema/overall_narrative_schema.json'),
        path.join(__dirname + '/../json/schema/player_profile_schema.json')
    ]);

    if (schemaObjs.errors.length !== 0) {
        returnObj.errors = schemaObjs.errors;
        return returnObj;
    }

    let overallNarrativeSchema = schemaObjs.objs[0];
    let playerProfileSchema = schemaObjs.objs[1];

    let overallNarrative;
    let playerProfile;

    if (overallNarrativeFile === undefined) {
        let overNarrativeObj = openJsonFiles([path.join(__dirname + '/../json/overall_narrative_example.json')]);
        if (overNarrativeObj.errors.length !== 0) {
            returnObj.errors.concat(overNarrativeObj.errors);
        } else {
            overallNarrative = overNarrativeObj.objs[0];
        }
    } else {
        overallNarrative = JSON.parse(overallNarrativeFile.buffer.toString());
    }

    if (playerProfileFile === undefined) {
        let overNarrativeObj = openJsonFiles([path.join(__dirname + '/../json/player_profile_example.json')]);
        if (overNarrativeObj.errors.length !== 0) {
            returnObj.errors.concat(overNarrativeObj.errors);
        } else {
            playerProfile = overNarrativeObj.objs[0];
        }
    } else {
        playerProfile = JSON.parse(playerProfileFile.buffer.toString());
    }

    if (overallNarrative === undefined || playerProfile === undefined) {
        return returnObj;
    }

    let overallNarrativeValidationResults = validateJson(overallNarrative, overallNarrativeSchema);
    let playerProfileValidationResults = validateJson(playerProfile, playerProfileSchema);

    if (overallNarrativeValidationResults !== "valid") {
        returnObj.errors.push("Errors in overall narrative file:\n" + JSON.stringify(overallNarrativeValidationResults));
    }

    if (playerProfileValidationResults !== "valid") {
        returnObj.errors.push("Errors in player profile file:\n" + JSON.stringify(playerProfileValidationResults));
    }

    if (overallNarrativeValidationResults !== "valid" || playerProfileValidationResults !== "valid") {
        return returnObj;
    }

    returnObj.overallNarrative = overallNarrative;
    returnObj.playerProfile = playerProfile;

    return returnObj;
}

module.exports = handleJsonFilesForGraph;