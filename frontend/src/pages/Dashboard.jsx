import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import NotesList from '../components/NotesList.jsx';
import NoteForm from '../components/NoteForm.jsx';
import FoldersList from '../components/FoldersList.jsx';
import { notesAPI, foldersAPI } from '../services/api.jsx';
import './Dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'CHILD') {
      fetchNotes();
      fetchFolders();
    }
  }, [user]);

  // Redirect parents to their dashboard
  if (user && user.role === 'PARENT') {
    return <Navigate to="/parent" />;
  }

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await notesAPI.getNotes();
      setNotes(response.data);
    } catch (error) {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  };

  const fetchFolders = async () => {
    try {
      const response = await foldersAPI.getFolders();
      setFolders(response.data);
    } catch (error) {
      // Silently handle error
    }
  };

  const handleNoteCreated = () => {
    fetchNotes();
    setShowNoteForm(false);
    setEditingNote(null);
  };

  const handleNoteUpdated = () => {
    fetchNotes();
    setEditingNote(null);
    setShowNoteForm(false);
  };

  const handleNoteDeleted = () => {
    fetchNotes();
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowNoteForm(true);
  };

  const filteredNotes = selectedFolder
    ? notes.filter(note => note.folderId === selectedFolder.id)
    : notes.filter(note => !note.folderId);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Notes</h1>
        <button 
          className="btn-primary"
          onClick={() => {
            setEditingNote(null);
            setShowNoteForm(true);
          }}
        >
          + Add New Note
        </button>
      </div>

      <div className="dashboard-content">
        <div className="sidebar">
          <FoldersList 
            folders={folders}
            selectedFolder={selectedFolder}
            onFolderSelect={setSelectedFolder}
            onFoldersChanged={fetchFolders}
          />
        </div>

        <div className="main-content">
          {showNoteForm && (
            <NoteForm
              folders={folders}
              editingNote={editingNote}
              onNoteCreated={handleNoteCreated}
              onNoteUpdated={handleNoteUpdated}
              onCancel={() => {
                setShowNoteForm(false);
                setEditingNote(null);
              }}
            />
          )}

          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : (
            <NotesList
              notes={filteredNotes}
              onNoteEdit={handleEditNote}
              onNoteDeleted={handleNoteDeleted}
              selectedFolder={selectedFolder}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;