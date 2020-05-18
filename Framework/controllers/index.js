let express = require('express');
let router = express.Router();
let framework = require('../src/main.js');

router.post('/', function(req, res) {
    let playerType = req.body.playerType;
    let data = req.body.data;
    let debug = req.body.debug;

    try {
        let result = framework(playerType, data, debug);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something happened in the framework :(");
    }
})

module.exports = router