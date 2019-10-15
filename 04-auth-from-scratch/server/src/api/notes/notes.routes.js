const express = require('express');

const controller = require('./notes.controller');

const router = express.Router();

router.get('/', controller.get);
router.post('/', controller.createNote);

module.exports = router;
