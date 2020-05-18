const path = require('path');
const fs = require('fs');
const validateJson = require('./validateJson.js');
const createGraph = require('./createGraph.js');
const buildStory = require('./storyBuilder.js');
const schema = require("./overallNarrativeSchema.js");

function framework(playerType, overallStoryData, debug) {

    if (!playerType || !overallStoryData) {
        let error = {
            error: "Invalid player type / overall story data!"
        }
        return error;
    }

    let result = validateJson(overallStoryData, schema);

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

module.exports = framework;