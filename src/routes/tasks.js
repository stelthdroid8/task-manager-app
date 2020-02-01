//Task routes
const express = require('express');

require('../db/mongoose');
const Task = require('../models/task');

router = express.Router();

router.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;
