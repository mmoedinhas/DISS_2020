const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/', function(req, res) {
    //console.log(req.body);
    res.json({ id: 123 });
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/story-viewer.html'));
});

module.exports = router