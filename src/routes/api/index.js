// src/routes/api/index.js

const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();

// Definining our routes
router.get('/tasks', require('./get'));
router.get('/tasks/:taskId', require('./getById'));
router.post('/tasks', require('./post'));
router.put('/tasks/:taskId', require('./put'));
router.delete('/tasks/:taskId', require('./delete'));

module.exports = router;