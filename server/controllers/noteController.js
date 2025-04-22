const db = require('../models/Note');

// Get all notes
const getNotes = (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving notes', error: err });
    } else {
      res.status(200).json(results);
    }
  });
};

// Add a note
const addNote = (req, res) => {
  const { title, content } = req.body;
  db.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Error adding note', error: err });
      } else {
        res.status(201).json({ message: 'Note added successfully', data: results });
      }
    }
  );
};

module.exports = { getNotes, addNote };
