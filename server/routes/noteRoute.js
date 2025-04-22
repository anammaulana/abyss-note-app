const express = require('express');
const router = express.Router();
const { getNotes, addNote } = require('../controllers/noteController');

router.get('/', getNotes);  // Get all notes
router.post('/', addNote);  // Add a new note

module.exports = router;
