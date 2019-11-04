const express = require('express');

const controller = require('./notes.controller');

const router = express.Router();

router.get('/', controller.get); // get all notes
router.post('/', controller.createNote);
router.delete('/:id', controller.deleteNote);

module.exports = router;
