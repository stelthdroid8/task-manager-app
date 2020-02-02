//USER ROUTES
const express = require('express');

require('../db/mongoose');
const User = require('../models/user');

router = express.Router();

router.get('/users', (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(error => {
      res.status(500).send();
    });
});

router.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  // console.log(User.findById(_id));
  User.findById(_id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch(error => {
      res.status(500).send();
    });
});

router.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = router;
