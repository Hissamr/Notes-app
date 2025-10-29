import React, { useState, useEffect } from 'react';
import { notesAPI } from '../services/api.jsx';
import './NoteForm.css';

function NoteForm({ folders, editingNote, onNoteCreated, onNoteUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    noteType: 'REGULAR',
    folderId: '',
    tags: '',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title || '',
        content: editingNote.content || '',
        noteType: editingNote.noteType || 'REGULAR',
        folderId: editingNote.folderId || '',
        tags: editingNote.tags || '',
        completed: editingNote.completed || false
      });
    }
  }, [editingNote]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const noteData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        noteType: formData.noteType,
        folderId: formData.folderId ? parseInt(formData.folderId) : null,
        tags: formData.tags.trim() || null,
        completed: formData.completed
      };

      if (editingNote) {
        await notesAPI.updateNote(editingNote.id, noteData);
        setSuccess('Note updated successfully!');
        setTimeout(() => onNoteUpdated(), 500);
      } else {
        await notesAPI.createNote(noteData);
        setSuccess('Note created successfully!');
        setTimeout(() => onNoteCreated(), 500);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isEditMode = !!editingNote;

  return (
    <div className="note-form-overlay">
      <div className="note-form">
        <div className="form-header">
          <h3>{isEditMode ? '✏️ Edit Note' : '➕ Create New Note'}</h3>
          <button 
            type="button" 
            className="close-btn" 
            onClick={onCancel}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter note title..."
              required
              maxLength="100"
            />
            <small>{formData.title.length}/100</small>
          </div>

          {/* Note Type Field */}
          <div className="form-group">
            <label htmlFor="noteType">Type</label>
            <select 
              id="noteType"
              name="noteType" 
              value={formData.noteType} 
              onChange={handleChange}
            >
              <option value="REGULAR">📝 Regular Note</option>
              <option value="CHECKBOX">✓ To-Do Item</option>
            </select>
          </div>

          {/* Content Field */}
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Enter your note content here..."
              rows="5"
              maxLength="500"
            />
            <small>{formData.content.length}/500</small>
          </div>

          {/* Folder Field */}
          <div className="form-group">
            <label htmlFor="folderId">Folder</label>
            <select 
              id="folderId"
              name="folderId" 
              value={formData.folderId} 
              onChange={handleChange}
            >
              <option value="">📋 No Folder</option>
              {folders && folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  📂 {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags Field */}
          <div className="form-group">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. homework, math, important"
              maxLength="200"
            />
            <small>{formData.tags.length}/200 • Tags help organize your notes</small>
          </div>

          {/* Completion Status (for To-Do items) */}
          {formData.noteType === 'CHECKBOX' && (
            <div className="form-group checkbox-group">
              <label htmlFor="completed">
                <input
                  id="completed"
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                <span>Mark as completed</span>
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-error" role="alert">
              ⚠️ {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="alert alert-success" role="alert">
              ✓ {success}
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading || !formData.title.trim()}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                isEditMode ? '✓ Update Note' : '✓ Create Note'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;