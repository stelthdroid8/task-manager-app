const express = require('express');

require('../db/mongoose');
const User = require('../models/user');

router = express.Router();

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
