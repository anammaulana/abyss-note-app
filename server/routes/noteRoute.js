const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNoteById);
router.post('/', noteController.addNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote); // PENTING!

module.exports = router;
