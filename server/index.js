const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/queries.js');
const cors = require('cors');
const app = express();
const port = 3000;

app.set('trust proxy');
app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/:id', express.static(__dirname + '/../client/dist'));

app.get('/api/videoplayer/data', (req, res) => {
  db.get((err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(docs);
    }
  });
})

app.get('/api/videoplayer/data/:id', (req, res) => {
  db.getById(req.params.id, (err, doc) => {
    if (err) {
      res.sendStatus(404);
    } else {
      console.log(doc)
      res.send(doc);
    }
  })
})

app.get('/api/videoplayer/data/:id/:rating', (req, res) => {
  db.rateMoovie(req.params.id, req.ip, req.params.rating, (err, doc) => {
    if (err) {
      res.status(400).send(err);
    } else {
      db.get((err, docs) => {
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(202).send(docs);
        }
      })
    }
  })
})

app.listen(port, () => {console.log(`listening on port ${port}`)})

//For testing
let server;
const start = () => {server = app.listen(3000, () => {console.log(`listening on port ${port}`)})}
const close = server ? server.close : () => {};
module.exports = {
  app,
  start,
  close
};