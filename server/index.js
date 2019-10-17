const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/queries.js');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/api/videoplayer/data', (req, res) => {
  db.get((err, docs) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(docs);
    }
  })
})

app.get('/api/videoplayer/data/:id', (req, res) => {
  db.getById(req.params.id, (err, doc) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(doc);
    }
  })
})

// app.listen(port, () => {console.log(`listening on port ${port}`)})

let server;
const start = () => {server = app.listen(3000, () => {console.log(`listening on port ${port}`)})}
const close = server ? server.close : () => {};


module.exports = {
  app,
  start,
  close
};