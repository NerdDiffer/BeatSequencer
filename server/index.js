const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* Middleware */

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pathToStaticDir = path.resolve(__dirname, '..', 'client');
app.use(express.static(pathToStaticDir));

/* Routes */

app.get('/', function(req, res) {
  res.status(200).send();
});

/* Initialize */

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server is listening on port', port);
