const models = require('../db/models');
const { Sample } = models;

module.exports.index = (req, res) => {
  Sample.findAll()
    .then(samples => {
      res.status(200).json(samples);
    });
};

module.exports.show = (req, res) => {
  const params = req.params.id;

  Sample.findById(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};

module.exports.create = (req, res) => {
  const params = req.body;

  Sample.create(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};
