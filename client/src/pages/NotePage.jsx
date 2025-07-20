import React from 'react'
import { useState } from 'react';
import NoteForm from '../components/NoteForm';

const NotePage = () => {
    const [notes, setNotes] = useState([]);

  const handleNoteCreated = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <NoteForm onNoteCreated={handleNoteCreated} />
     
    </div>
  );
}

export default NotePage
