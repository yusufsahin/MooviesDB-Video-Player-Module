const express = require('express');
const app = express();
const db = require('../database/queries.js')
const port = 3000;

app.get('/', (req, res) => {
  res.send('App is loaded!')
})

app.get('/api/videoplayer/data', (req, res) => {
  db.get((err, docs) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.send(docs);
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


app.listen(port, () => {console.log(`listening on port ${port}`)})