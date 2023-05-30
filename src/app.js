const express = require('express');
const cors = require('cors');
// version and author from our package.json file
const { version, author } = require('../package.json');
const app = express();

app.use('/', require('./routes'));
  
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      error: {
        message: 'not found',
        code: 404,
      },
    });
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'unable to process request';
  
    res.status(status).json({
      status: 'error',
      error: {
        message,
        code: status,
      },
    });
  });
  
  // Export our `app` so we can access it in server.js
  module.exports = app;