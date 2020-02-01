const express = require('express');

router = express.Router();

router.post('/users', (req, res) => {
  res.send('testing!');
});
