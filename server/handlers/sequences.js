const models = require('../db/models');
const { Sequence } = models;

module.exports.index = (req, res) => {
  Sequence.findAll()
    .then(sequences => {
      res.status(200).json(sequences);
    });
};

module.exports.show = (req, res) => {
  const params = req.params.id;

  Sequence.findById(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};

module.exports.create = (req, res) => {
  const params = req.body;

  Sequence.create(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};
