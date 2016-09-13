const models = require('../db/models');
const { BeatSequence } = models;

module.exports.index = (req, res) => {
  BeatSequence.findAll()
    .then(beatSequences => {
      res.status(200).json(beatSequences);
    });
};

module.exports.show = (req, res) => {
  const params = req.params.id;

  BeatSequence.findById(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};

module.exports.create = (req, res) => {
  const params = req.body;

  BeatSequence.create(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};
