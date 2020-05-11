const express = require('express');
const router = express.Router();
const path = require('path');
const ID = require('../helpers/createId');
const fs = require('fs');

const dbPath = path.join(__dirname + '/../db/');

router.post('/', function(req, res) {

    if (!req.body.graph || !req.body.playerType) {
        res.status(500).json({ error: "Invalid graph or playerType" });
        return;
    }

    let id;
    if (!req.body.id) {
        id = ID.create();
    } else {
        id = req.body.id;
    }

    let filename = dbPath + ID.getFilename(id);
    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(filename + ' already exists');
                return;
            }

            console.error(err);
        }

        let content = {
            graph: req.body.graph,
            playerType: req.body.playerType
        }

        fs.writeFile(filename, JSON.stringify(content), function(err) {
            if (err) {
                console.log(err);
            }
        });
    });

    res.json({ id: id });
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/debug.html'));
});

module.exports = router