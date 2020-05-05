let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let multer = require('multer');

let validateJson = require('../helpers/validateJson.js');
let createGraph = require('../helpers/createGraph.js');
let buildStory = require('../helpers/storyBuilder.js');
let getSchemaPath = require('../helpers/getSchemaPath.js');

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

router.get('/:filename', function(req, res) {

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

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/story-viewer.html'));
})

module.exports = router