import React from 'react';
import NoteItem from './NoteItem.jsx';
import './NotesList.css';

function NotesList({ notes, onNoteEdit, onNoteDeleted, selectedFolder }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>No notes yet</h3>
        <p>
          {selectedFolder 
            ? `No notes in the "${selectedFolder.name}" folder yet. Create one to get started!`
            : 'You haven\'t created any notes yet. Click "Add New Note" to create your first one!'}
        </p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      <div className="list-header">
        <h3>
          {selectedFolder ? `📂 ${selectedFolder.name}` : '📝 All Notes'}
          <span className="notes-count">({notes.length} {notes.length === 1 ? 'note' : 'notes'})</span>
        </h3>
      </div>
      <div className="notes-grid">
        {notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={onNoteEdit}
            onDeleted={onNoteDeleted}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesList;