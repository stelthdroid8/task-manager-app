//Task routes
const express = require('express');

require('../db/mongoose');
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');

router = express.Router();

router.post('/tasks', authMiddleware, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/tasks', authMiddleware, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id });
    const match = {};

    if (req.query.completed) {
      match.completed = req.query.completed === 'true';
    }
    await req.user
      .populate({
        path: 'tasks',
        match
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    // console.log(error);
    res.status(500).send();
  }
});

router.get('/tasks/:id', authMiddleware, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];

  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422).send(error.message);
    }

    res.status(500).send(error.message);
  }
});

router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
