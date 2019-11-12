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

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db.update(id, body)
    .then(results => {
      if (results) {
        res.status(200).json(results)
      } else {
        res.status(404).json({ message: 'Action not found to update.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating action.' })
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(info => {
      if (info) {
        res.status(204).json({ message: `${id} successfully removed.` })
      } else {
        res.status(404).json({ message: `${id} not found.` })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting id.' })
    })
})

module.exports = router;