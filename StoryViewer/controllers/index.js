var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/validator', require('./validator'))
router.use('/game', require('./game'))
router.use('/story-viewer', require('./story-viewer'))

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
})

module.exports = router