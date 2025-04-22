import React, { useState, useEffect } from 'react';
import { addNote, updateNote, getNoteById } from '../services/noteService';

const NoteForm = ({ editingId, onSaved, cancelEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingId) {
      getNoteById(editingId).then(note => {
        setTitle(note.title);
        setContent(note.content);
      });
    }
  }, [editingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, content };

    if (editingId) {
      await updateNote(editingId, note);
    } else {
      await addNote(note);
    }

    setTitle('');
    setContent('');
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingId ? 'Edit Note' : 'Add Note'}</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul" required />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Isi Catatan" required />
      <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      {editingId && <button onClick={cancelEdit}>Cancel</button>}
    </form>
  );
};

export default NoteForm;
