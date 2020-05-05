let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let multer = require('multer');

let validateJson = require('../helpers/validateJson.js');
let createGraph = require('../helpers/createGraph.js');

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

    let overallNarrativeSchema;
    let playerProfileSchema;

    try {
        overallNarrativeSchema = JSON.parse(fs.readFileSync(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf8'));
    } catch (err) {
        objToSend.errors.push('Error: Overall narrative schema file not found');
        res.send(objToSend);
        return;
    }

    try {
        playerProfileSchema = JSON.parse(fs.readFileSync(path.join(__dirname + '/../json/schema/player_profile_schema.json'), 'utf8'));
    } catch (err) {
        objToSend.errors.push('Error: Player profile schema file not found');
        res.send(objToSend);
        return;
    }

    console.log()

    let overallNarrative = JSON.parse(req.files['overallNarrativeFile'][0].buffer.toString());
    let playerProfile = JSON.parse(req.files['playerProfileFile'][0].buffer.toString());

    let overallNarrativeValidationResults = validateJson(overallNarrative, overallNarrativeSchema);
    let playerProfileValidationResults = validateJson(playerProfile, playerProfileSchema);

    if (overallNarrativeValidationResults !== "valid") {
        objToSend.errors.push("Errors in overall narrative file:\n" + JSON.stringify(overallNarrativeValidationResults));
    }

    if (playerProfileValidationResults !== "valid") {
        objToSend.errors.push("Errors in player profile file:\n" + JSON.stringify(playerProfileValidationResults));
    }

    if (overallNarrativeValidationResults !== "valid" || playerProfileValidationResults !== "valid") {
        res.send(objToSend);
        return;
    }

    let graph = createGraph(overallNarrative);
    res.json(graph);
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/story-viewer.html'));
})

module.exports = router