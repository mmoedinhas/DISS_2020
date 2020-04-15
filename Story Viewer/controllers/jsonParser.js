let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

let validateJson = require('../helpers/validateJson.js');
let createGraph = require('../helpers/createGraph.js');

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
    console.log(req.body);
    let data = req.body;
    
    fs.readFile(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf8', (err2, schemaString) => {
        if (err2) {
            let error = {
                error: "Schema file not found."
            };
            res.status(500).send(error);
            return;
        }

        let schema = JSON.parse(schemaString);
        let result = validateJson(data, schema);

        if(result === "valid") {
            let graph = createGraph(data);
            res.json(graph);
        } else {
            let error = {
                error: result
            };
            res.status(500).json(error);
        }
    });
})



module.exports = router