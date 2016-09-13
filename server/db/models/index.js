'use strict';

const fs           = require('fs');
const path         = require('path');
const Sequelize    = require('sequelize');

/* Set up environment */
const env          = process.env.NODE_ENV || 'development';
const pathToConfig = path.join(__dirname, '..', 'config.json');
const config       = require(pathToConfig)[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  const { database, username, password } = config;
  sequelize = new Sequelize(database, username, password, config);
}

/* Build db object */
const db = {};
const basename = path.basename(module.filename);
const helpers = {
 /**
  * Returns true if all 3 conditions are true:
  * - has a `.` in front of the name (file is not 'hidden')
  * - is not the current file
  * - ends in the `.js` extension
  */
  isModelFile: (file) => {
    return (file.indexOf('.') !== 0) &&
           (file !== basename) &&
           (file.slice(-3) === '.js');
  },
  setModelToDb: (file) => {
    const pathToFile = path.join(__dirname, file);
    const model = sequelize['import'](pathToFile);
    db[model.name] = model;
  },
  associateIfPossible: (modelName) => {
    if (db[modelName].associate) { db[modelName].associate(db); }
  }
};

// Select model files & save model references to `db` object
fs.readdirSync(__dirname)
  .filter(helpers.isModelFile)
  .forEach(helpers.setModelToDb);

// Add associations between all models
const models = Object.keys(db);
models.forEach(helpers.associateIfPossible);

/* Prepare & export */
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
