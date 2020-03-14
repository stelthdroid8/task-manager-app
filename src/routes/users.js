//USER ROUTES
const express = require('express');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const User = require('../models/user');

require('../db/mongoose');

router = express.Router();

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/logout', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send('Logged Out');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/users/me', authMiddleware, async (req, res) => {
  res.send(req.user);
});

router.patch('/users/me', authMiddleware, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];

  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422).send(error.message);
    }
    console.log(error);
    res.status(500).send();
  }
});

router.delete('/users/me', authMiddleware, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const upload = multer({
  dest: 'avatars',
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error('File must be an image [supported: .jpg, .jpeg, .png]')
      );
    }

    cb(undefined, true);
  }
});

router.post(
  '/users/me/avatar',
  upload.single('avatar'),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
