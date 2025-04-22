import React, { useEffect, useState } from 'react';
import { getNotes } from '../services/noteService';

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes List</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
