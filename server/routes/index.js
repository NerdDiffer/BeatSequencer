const express = require('express');
const models = require('../db/models');

const { User } = models;

const router = express.Router();

/* Routes for '/users' */
router.get('/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    });
});

router.get('/users/:id', (req, res) => {
  const params = req.params.id;

  User.findById(params)
    .then(user => {
      res.status(200).json(user);
    });
});

router.post('/users', (req, res) => {
  const params = req.body;

  User.create(params)
    .then(user => {
      res.status(200).json(user);
    });
});

module.exports = router;
