import React, {  useState } from 'react';
import { getNotes, deleteNote } from '../services/noteService';
import NoteForm from './NoteForm';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus catatan ini?')) {
      await deleteNote(id);
      fetchNotes();
    }
  };

  const startEdit = (id) => {
    setEditingId(id);
  };

  const handleSaved = () => {
    setEditingId(null);
    fetchNotes();
  };

  return (
    <div>
      <NoteForm editingId={editingId} onSaved={handleSaved} cancelEdit={() => setEditingId(null)} />

      <h2>Daftar Catatan</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
            <button onClick={() => startEdit(note.id)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
