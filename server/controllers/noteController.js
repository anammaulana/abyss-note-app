const db = require('../models/Note');
// GET all notes
const getNotes = (req, res) => {
  db.query('SELECT * FROM notes ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving notes', error: err });
    res.status(200).json(results);
  });
};

// GET note by ID
const getNoteById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(results[0]);
  });
};

// POST create note
const addNote = (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error adding note', error: err });
    res.status(201).json({ message: 'Note added successfully', noteId: result.insertId });
  });
};

// PUT update note
const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error updating note', error: err });
    res.status(200).json({ message: 'Note updated successfully' });
  });
};

// DELETE note
const deleteNote = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting note', error: err });
    res.status(200).json({ message: 'Note deleted successfully' });
  });
};

module.exports = {
  getNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
};