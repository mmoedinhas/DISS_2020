let path = require('path');
let fs = require('fs');
let validateJson = require('../framework/validateJson.js');
let createGraph = require('../framework/createGraph.js');
let buildStory = require('../framework/storyBuilder.js');

async function createStoryLine(playerType, overallStoryData, debug) {

    if (!playerType || !overallStoryData) {
        let error = {
            error: "Invalid player type / overall story data!"
        }
        return error;
    }

    let schema;
    try {
        const schemaString = await fs.promises.readFile(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf-8');
        schema = JSON.parse(schemaString);
    } catch (err) {
        let error = {
            error: "Schema file not found."
        };
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

module.exports = createStoryLine;