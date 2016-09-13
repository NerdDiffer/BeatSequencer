const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();

/* Middleware */

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pathToStaticDir = path.resolve(__dirname, '..', 'client', 'public');
app.use(express.static(pathToStaticDir));

/* Routes */

app.use('/api', routes)

/* Initialize */

const port = process.env.PORT || 3000;
app.listen(port);
console.log('Server is listening on port', port);
