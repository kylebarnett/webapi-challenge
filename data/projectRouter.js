const express = require('express');
const router = express.Router();
const db = require('./helpers/projectModel');

router.get('/', (req, res) => {
  db.get()
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving projects.' })
    })
})

router.post('/', (req, res) => {
  const bodyInfo = req.body;
  if (!bodyInfo.name || !bodyInfo.description) {
    res.status(404).json({ message: 'Must have a name and description.' })
  } else {
    db.insert(bodyInfo)
      .then(info => {
        res.status(201).json(info)
      })
      .catch(err => {
        res.status(500).json({ message: 'There was an issue posting to the DB.' })
      })
  }
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.update(id, body)
    .then(info => {
      if (info) {
        res.status(200).json(info)
      } else {
        res.status(404).json({ message: 'The project could not be found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating project.' })
    })
})

module.exports = router;