"use client"; // Ensure this is client-side only

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./noteEditorModule.css";

interface Note {
  id: string;
  title: string;
  content: string;
  font: string;
  last_updated: string;
}

export default function EditNotePage() {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Hardcoded userId and noteId
  const noteId = "67673c48358745ff0d7cadf3"; // Replace with actual hardcoded noteId

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/notes/${noteId}`
        );
        const fetchedNote = response.data;
        setNote({
          id: fetchedNote.id,
          title: fetchedNote.title,
          content: fetchedNote.content,
          font: fetchedNote.font || "Arial",
          last_updated: fetchedNote.last_updated,
        });
      } catch (err) {
        console.error("Error fetching note:", err);
        setError("Failed to load the note. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  const saveNote = useCallback(async () => {
    if (!note) return;

    setIsSaving(true);

    try {
      const updatedNote = {
        title: note.title,
        content: note.content,
        font: note.font,
        last_updated: new Date().toISOString(),
      };

      await axios.put(`http://localhost:5000/notes/${noteId}`, updatedNote);
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setIsSaving(false);
    }
  }, [note]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      saveNote();
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(debounceTimer);
  }, [note, saveNote]);

  const handleChange = (field: keyof Note, value: string) => {
    if (note) {
      setNote({
        ...note,
        [field]: value,
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!note) return <div>Note not found.</div>;

  return (
    <div className="container">
      <h1>Edit Note</h1>
      <button className="backButton" onClick={() => window.history.back()}>
        Back
      </button>
      <div className="editorForm">
        <input
          type="text"
          value={note.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="input"
          placeholder="Note title"
        />
        <textarea
          value={note.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className="textarea"
          placeholder="Note content"
        />
        <select
          value={note.font}
          onChange={(e) => handleChange("font", e.target.value)}
          className="select"
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
        </select>
        <div className="saveStatus">
          {isSaving ? "Saving..." : "All changes saved"}
        </div>
      </div>
    </div>
  );
}
