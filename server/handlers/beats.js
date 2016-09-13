const models = require('../db/models');
const { Beat } = models;

module.exports.index = (req, res) => {
  Beat.findAll()
    .then(beats => {
      res.status(200).json(beats);
    });
};

module.exports.show = (req, res) => {
  const params = req.params.id;

  Beat.findById(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};

module.exports.create = (req, res) => {
  const params = req.body;

  Beat.create(params)
    .then(sample => {
      res.status(200).json(sample);
    });
};
