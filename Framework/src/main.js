const validateJson = require('./validateJson.js');
const createGraph = require('./createGraph.js');
const buildStory = require('./storyBuilder.js');

const schemas = {
    "overall-narrative": require("./schema/overallNarrativeSchema.js"),
    "actors": require("./schema/actorsSchema.js"),
    "cutscene": require("./schema/cutsceneSchema.js"),
    "dialogue": require("./schema/dialogueSchema.js"),
    "enemies": require("./schema/enemiesSchema.js"),
    "gameplay": require("./schema/gameplaySchema.js"),
    "items": require("./schema/itemsSchema.js"),
    "player-profile": require("./schema/playerProfileSchema.js"),
    "tilesets": require("./schema/tilesetsSchema.js")
}

exports.createStoryLine = function(playerType, overallStoryData, debug) {

    if (!playerType || !overallStoryData) {
        let error = {
            error: "Invalid player type / overall story data!"
        }
        return error;
    }

    let result = validateJson(overallStoryData, schemas["overall-narrative"]);

    if (result === "valid") {
        let graph = createGraph(overallStoryData);

        if (graph.errors.length != 0) {
            let error = {
                error: graph.errors
            }
            return error;
        }

        let story = buildStory(playerType, graph.graph);

        if (story.scenes.length == 0) {
            let error = {
                error: "Story has no scenes."
            }
            return error;
        }

        let errors = [];
        for (scene of story.scenes) {
            if (scene.events.length == 0) {
                errors.push("Scene " + scene.name + " has no events.");
            }
        }

        if (errors.length != 0) {
            let error = {
                error: errors
            }
            return error;
        }

        let response;

        if (debug) {
            response = {
                graph: graph,
                story: story
            }
        } else {
            response = story
        }

        return response;

    } else {
        let error = {
            error: result
        };
        return error;
    }
}

exports.validateNarrativeFile = function(fileType, data) {

    if (!schemas[fileType]) {
        return {
            error: "Invalid file type"
        }
    }

    if (!data) {
        return {
            error: "Invalid file data"
        }
    }

    let result = validateJson(data, schemas[fileType]);
    return result;
}