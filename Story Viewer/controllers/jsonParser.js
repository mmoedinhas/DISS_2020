let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

let validateJson = require('../helpers/validateJson.js');
let createGraph = require('../helpers/createGraph.js');
let buildStory = require('../helpers/storyBuilder.js');

router.get('/validate/:filename', function (req, res) {

    fs.readFile(path.join(__dirname + '/../json/' + req.params.filename), 'utf8', (err1, jsonString) => {
        if (err1) {
            res.send('Error: Narrative file not found');
            return;
        }

        fs.readFile(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf8', (err2, schemaString) => {
            if (err2) {
                res.status(404).send('Error: Schema file not found');
                return;
            }

            let data = JSON.parse(jsonString);
            let schema = JSON.parse(schemaString);
            let result = validateJson(data, schema);

            if(result === "valid") {
                res.send("Valid json");
            } else {
                res.json(result);
            }
        });
    })
})

router.get('/:filename', function (req, res) {

    fs.readFile(path.join(__dirname + '/../json/' + req.params.filename), 'utf8', (err1, jsonString) => {
        if (err1) {
            res.status(404).send('Narrative file not found');
            return;
        }

        let data = JSON.parse(jsonString);
        let graph = createGraph(data);
        
        res.json(graph);
    })
})

router.post('/', function (req, res) {
    let playerType = req.body.playerType;
    let data = req.body.data;
    
    fs.readFile(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf8', (err2, schemaString) => {
        if (err2) {
            let error = {
                error: "Schema file not found."
            };
            res.send(error);
            return;
        }

        let schema = JSON.parse(schemaString);
        let result = validateJson(data, schema);

        if(result === "valid") {
            let graph = createGraph(data);

            if(graph.errors.length != 0) {
                let error = {
                    error: graph.errors
                }
                res.send(error);
                return;
            }
            
            let story = buildStory(playerType, graph.graph);

            if(story.scenes.length == 0) {
                let error = {
                    error: "Story has no scenes."
                }
                res.send(error);
                return;
            }

            let errors = [];
            for(scene of story.scenes) {
                if(scene.events.length == 0) {
                    errors.push("Scene " + scene.name + " has no events.");
                }
            }

            if(errors.length != 0) {
                let error = {
                    error: errors
                }
                res.send(error);
                return;
            }

            res.send(story);
            
        } else {
            let error = {
                error: result
            };
            res.json(error);
        }
    });
})

// TODO add more controllers to validate other jsons

module.exports = router