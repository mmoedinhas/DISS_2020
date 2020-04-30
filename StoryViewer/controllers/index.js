var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/json', require('./jsonParser'))
router.use('/game', require('./game'))

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/index.html'));
})

module.exports = router