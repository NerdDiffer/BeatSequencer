const models = require('../db/models');
const { User } = models;

module.exports.index = (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users);
    });
};

module.exports.show = (req, res) => {
  const params = req.params.id;

  User.findById(params)
    .then(user => {
      res.status(200).json(user);
    });
};

module.exports.create = (req, res) => {
  const params = req.body;

  User.create(params)
    .then(user => {
      res.status(200).json(user);
    });
};
