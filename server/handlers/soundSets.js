const models = require('../db/models');
const { SoundSet } = models;

module.exports.index = (req, res) => {
  SoundSet.findAll()
    .then(soundSets => {
      res.status(200).json(soundSets);
    });
};

module.exports.show = (req, res) => {
  const params = req.params.id;

  SoundSet.findById(params)
    .then(soundSet => {
      res.status(200).json(soundSet);
    });
};

module.exports.create = (req, res) => {
  const params = req.body;

  SoundSet.create(params)
    .then(soundSet => {
      res.status(200).json(soundSet);
    });
};
