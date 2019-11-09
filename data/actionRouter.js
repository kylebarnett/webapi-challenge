const express = require('express');
const router = express.Router();
const db = require('./helpers/actionModel');

router.get('/', (req, res) => {
  db.get()
    .then(info => {
      res.status(200).json(info)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving actions.' })
    })
})

router.post('/', (req, res) => {
  const bodyInfo = req.body;
  if (!bodyInfo.project_id || !bodyInfo.description || !bodyInfo.notes) {
    res.status(400).json({ message: 'Must have project id, description, and notes.' })
  } else {
    db.insert(bodyInfo)
      .then(info => {
        res.status(201).json(info)
      })
      .catch(errr => {
        res.status(500).json({ message: 'Error posting action.' })
      })
  }
})

module.exports = router;