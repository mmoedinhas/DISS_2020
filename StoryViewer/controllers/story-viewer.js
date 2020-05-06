const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const createGraph = require('../helpers/createGraph.js');
const handleJsonFilesForGraph = require('../helpers/handleJsonFilesForGraph');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/example', function(req, res) {

    let objToSend = {
        graph: undefined,
        errors: []
    };

    let files = handleJsonFilesForGraph();

    if (files.errors.length !== 0) {
        objToSend.errors = files.errors;
        res.send(objToSend);
        return;
    }

    let graph = createGraph(files.overallNarrative);
    res.send(graph);
})

var uploadFormat = upload.fields([{ name: 'overallNarrativeFile', maxCount: 1 }, { name: 'playerProfileFile', maxCount: 1 }])
router.post('/', uploadFormat, function(req, res) {

    let objToSend = {
        graph: undefined,
        errors: []
    };

    if (req.files['overallNarrativeFile'] === undefined || req.files['overallNarrativeFile'][0].mimetype !== "application/json" ||
        req.files['playerProfileFile'] === undefined || req.files['playerProfileFile'][0].mimetype !== "application/json") {
        objToSend.errors.push('Error: Please upload valid json files');
        res.send(objToSend);
        return;
    }

    let files = handleJsonFilesForGraph(req.files['overallNarrativeFile'][0], req.files['playerProfileFile'][0]);

    if (files.errors.length !== 0) {
        objToSend.errors = files.errors;
        res.send(objToSend);
        return;
    }

    let graph = createGraph(files.overallNarrative);
    res.send(graph);
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/story-viewer.html'));
})

module.exports = router