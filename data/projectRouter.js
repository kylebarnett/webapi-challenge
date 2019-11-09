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

module.exports = router;