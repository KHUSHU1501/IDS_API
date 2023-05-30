// src/routes/index.js

const express = require('express');

// version and author from package.json
const { version, author } = require('../../package.json');

const router = express.Router();

router.use(`/api`, require('./api'));

router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  // Send a 200 'OK' response
  res.status(200).json({
    status: 'ok',
    author,
    version,
  });
});

module.exports = router;