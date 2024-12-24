'use client'; // Ensure this is client-side only

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './notes.module.css';

interface Note {
  id: string;
  title: string;
  content: string;
  font?: string;
  updatedAt: string;
  formattedDate?: string; // Add this property for formatted date
}

export default function NotesPage() {
  const [notesData, setNotesData] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const hardcodedUserId = 'user123';
      const hardcodedCourseId = 'course456';
      const response = await axios.get(
        `http://localhost:5000/notes/user/${hardcodedUserId}/course/${hardcodedCourseId}`
      );
      setNotesData(
        response.data.map((note: any) => ({
          ...note,
          updatedAt: note.last_updated,
          formattedDate: new Date(note.last_updated).toLocaleString(), // Format the date here
        }))
      );
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this note?'
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/notes/${id}`);
      if (response.status === 200) {
        const updatedNotes = notesData.filter((note) => note.id !== id);
        setNotesData(updatedNotes);
        alert('Note deleted successfully');
      } else {
        alert('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('There was an error deleting the note. Please try again.');
    }
  };

  function AddNoteForm({
    fetchNotes,
    setNotesData,
  }: {
    fetchNotes: () => void;
    setNotesData: React.Dispatch<React.SetStateAction<Note[]>>;
  }) {
    const [newNoteTitle, setNewNoteTitle] = useState('');

    const handleAddNote = async () => {
      try {
        const response = await axios.post('http://localhost:5000/notes', {
          title: newNoteTitle,
          content: 'Your note content',
          course_id: 'course456',
          user_id: 'user123',
          font: 'Arial',
          created_at: new Date().toISOString(),
          last_updated: new Date().toISOString(),
        });
        fetchNotes();
        setNewNoteTitle('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    };

    return (
      <div className={styles.addNoteForm}>
        <input
          type="text"
          placeholder="New note title"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleAddNote} className={styles.button}>
          Add Note
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Notes</h1>
      <AddNoteForm fetchNotes={fetchNotes} setNotesData={setNotesData} />
      <div className={styles.noteGrid}>
        {notesData.map((note, index) => (
          <div key={note.id || index} className={styles.noteCard}>
            <h2 className={styles.noteTitle}>{note.title}</h2>
            <p className={styles.noteDate}>{note.formattedDate}</p>
            <Link href={`/notes/${note.id}`} className={styles.editLink}>
              Edit
            </Link>
            <button
              onClick={() => handleDeleteNote(note.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
