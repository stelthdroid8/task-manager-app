//Task routes
const express = require('express');

require('../db/mongoose');
const Task = require('../models/task');

router = express.Router();

router.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).send(tasks);
    })
    .catch(error => {
      res.status(500).send();
    });
});

router.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  // console.log(User.findById(_id));
  Task.findById(_id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch(error => {
      res.status(500).send();
    });
});

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
