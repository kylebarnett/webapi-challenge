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

module.exports = router;