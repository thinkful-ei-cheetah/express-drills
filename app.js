'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});




