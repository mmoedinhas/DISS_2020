let express = require('express');
let router = express.Router();
let framework = require('../framework/main.js');

router.post('/', function(req, res) {
    let playerType = req.body.playerType;
    let data = req.body.data;
    let debug = req.body.debug;

    framework(playerType, data, debug).then(function(result) {
        res.send(result);
    }).catch(function(err) {
        console.log(err);
        res.status(500).send("Something happened in the framework :(");
    });
})

module.exports = router