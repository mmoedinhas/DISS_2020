const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const createGraph = require('../helpers/createGraph.js');
const fileHandler = require('../helpers/handleJsonFilesForGraph');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/graph/example', function(req, res) {

    let objToSend = {
        graph: undefined,
        errors: []
    };

    let files = fileHandler.handleOverallNarrativeFile();

    if (files.errors.length !== 0) {
        objToSend.errors = files.errors;
        res.send(objToSend);
        return;
    }

    let graph = createGraph(files.overallNarrative);
    res.send(graph);
})

router.post('/graph', upload.single('overallNarrativeFile'), function(req, res) {

    let objToSend = {
        graph: undefined,
        errors: []
    };

    if (req.file === undefined || req.file.mimetype !== "application/json") {
        objToSend.errors.push('Error: Please upload valid json files');
        res.send(objToSend);
        return;
    }

    let files = fileHandler.handleOverallNarrativeFile(req.file);

    if (files.errors.length !== 0) {
        objToSend.errors = files.errors;
        res.send(objToSend);
        return;
    }

    let graph = createGraph(files.overallNarrative);
    res.send(graph);
})

router.post('/story-line', upload.single('playerProfileFile'), function(req, res) {

    let objToSend = {
        graph: undefined,
        errors: []
    };

    if (req.file === undefined || req.file.mimetype !== "application/json") {
        objToSend.errors.push('Error: Please upload valid json files');
        res.send(objToSend);
        return;
    }

    //validate player profile file here
    // let files = fileHandler.handleOverallNarrativeFile(req.file);

    // if (files.errors.length !== 0) {
    //     objToSend.errors = files.errors;
    //     res.send(objToSend);
    //     return;
    // }

    // create story line here
    //let graph = createGraph(files.overallNarrative);

    objToSend.graph = JSON.parse(req.body.overallStoryGraph);
    res.send(objToSend);
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/story-viewer.html'));
})

module.exports = router