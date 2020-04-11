var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/:filename', function (req, res) {

    fs.readFile(path.join(__dirname + '/../json/' + req.params.filename), 'utf8', (err, jsonString) => {
        if (err) {
            res.status(404).send('Not found');
            return;
        }

        if(validJson(jsonString)) {
            res.send("Valid json");
            //createGraph(jsonString);
        } else {
            res.send("Invalid json");
        }
    })
})

function validJson(jsonString) {
    
}

function createGraph(jsonObj) {
    const palette = [
        '#8ecce6',
        '#d5cdea',
        '#fae2ef',
        '#fcf8e9'
      ];

      for (scene of jsonObj['scenes']) {

        let x = 0.0;
        let y = 0.0;
        let id = 'scene_' + scene['name'];
        console.log(id);

        graph.nodes.push({
          id: id,
          label: scene['name'],
          type: 'square',
          x: x,
          y: y,
          size: 1,
          color: palette[0]
        })

        y += 0.1;

        for (event of scene['events']) {

          let type = 'cross';
          let color = palette[3];
          id = "";
          if(event['type'] == 'cutscene') {
            type = 'circle';
            color = palette[1];
            id = 'cutscene_';
          } else if(event['type'] == 'gameplay') {
            type = 'diamond';
            color = palette[2];
            id = 'gameplay_';
          }

          id += event['name'];

          graph.nodes.push({
            id: id,
            label: event['name'],
            type: type,
            x: x,
            y: y,
            size: 0.5,
            color: color
          })

          x += 0.1;
        }
      }
}


module.exports = router