import React, { useState } from 'react';
import { notesAPI } from '../services/api.jsx';
import './NoteItem.css';

function NoteItem({ note, onEdit, onDeleted }) {
  const [isCompleted, setIsCompleted] = useState(note.completed);
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    if (note.noteType !== 'CHECKBOX') return;
    
    setLoading(true);
    try {
      const updatedNote = { 
        title: note.title,
        content: note.content,
        noteType: note.noteType,
        folderId: note.folderId,
        tags: note.tags,
        completed: !isCompleted 
      };
      await notesAPI.updateNote(note.id, updatedNote);
      setIsCompleted(!isCompleted);
    } catch (error) {
      alert('Failed to update note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notesAPI.deleteNote(note.id);
        onDeleted();
      } catch (error) {
        alert('Failed to delete note');
      }
    }
  };

  const formatTags = (tagsString) => {
    if (!tagsString) return [];
    if (typeof tagsString === 'string') {
      try {
        const parsed = JSON.parse(tagsString);
        return Array.isArray(parsed) ? parsed : tagsString.split(',').map(tag => tag.trim());
      } catch {
        return tagsString.split(',').map(tag => tag.trim());
      }
    }
    return [];
  };

  const tags = formatTags(note.tags);
  const noteTypeClass = note.noteType === 'CHECKBOX' ? 'checkbox-note' : 'regular-note';

  return (
    <div className={`note-item ${noteTypeClass} ${isCompleted ? 'completed' : ''}`}>
      <div className="note-header">
        {note.noteType === 'CHECKBOX' && (
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            disabled={loading}
            className="note-checkbox"
            aria-label="Mark as complete"
          />
        )}
        <h4 className={isCompleted ? 'completed-text' : ''}>{note.title}</h4>
      </div>
      
      {note.content && (
        <p className={`note-content ${isCompleted ? 'completed-text' : ''}`}>
          {note.content}
        </p>
      )}

      {tags.length > 0 && (
        <div className="note-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-actions">
        <button 
          onClick={() => onEdit(note)} 
          className="btn-edit"
          title="Edit this note"
        >
          ✏️ Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="btn-delete"
          title="Delete this note"
        >
          🗑️ Delete
        </button>
      </div>

      <div className="note-meta">
        <small>
          Created: {new Date(note.createdAt).toLocaleDateString()}
          {note.updatedAt && note.updatedAt !== note.createdAt && (
            <> • Updated: {new Date(note.updatedAt).toLocaleDateString()}</>
          )}
        </small>
      </div>
    </div>
  );
}

export default NoteItem;
