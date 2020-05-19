let express = require('express');
let router = express.Router();
let framework = require('../src/main.js');

router.post('/story', function(req, res) {
    let playerType = req.body.playerType;
    let data = req.body.data;
    let debug = req.body.debug;

    try {
        let result = framework.createStoryLine(playerType, data, debug);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unexpected error while creating story line");
    }
})

router.post('/validate', function(req, res) {
    let data = req.body.data;
    let fileType = req.body.fileType;

    try {
        let result = framework.validateNarrativeFile(fileType, data);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unexpected error while validating story file");
    }
})

module.exports = router