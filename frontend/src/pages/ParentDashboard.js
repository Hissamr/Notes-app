import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { authAPI, notesAPI } from '../services/api';
import './ParentDashboard.css';

function ParentDashboard() {
  const { user } = useAuth();
  const [childUsername, setChildUsername] = useState('');
  const [selectedChild, setSelectedChild] = useState(null);
  const [childNotes, setChildNotes] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (user && user.role === 'CHILD') {
    return <Navigate to="/dashboard" />;
  }

  const handleLinkChild = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await authAPI.linkChild(childUsername);
      setChildUsername('');
      setMessage('Child linked successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to link child');
    } finally {
      setLoading(false);
    }
  };

  const fetchChildNotes = async (childId) => {
    setLoading(true);
    setError('');
    try {
      const response = await notesAPI.getChildNotes(childId);
      setChildNotes(response.data);
    } catch (error) {
      setError('Failed to fetch child notes');
      console.error('Failed to fetch child notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTags = (tagsString) => {
    if (!tagsString) return [];
    try {
      return JSON.parse(tagsString);
    } catch {
      return tagsString.split(',').map(tag => tag.trim());
    }
  };

  return (
    <div className="parent-dashboard">
      <h1>👨‍👩‍👧 Parent Dashboard</h1>

      <div className="link-child-section">
        <h2>Link a Child Account</h2>
        <form onSubmit={handleLinkChild} className="link-form">
          <input
            type="text"
            value={childUsername}
            onChange={(e) => setChildUsername(e.target.value)}
            placeholder="Enter child's username"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Linking...' : 'Link Child'}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <p className="info-text">
          💡 Ask your child for their username to view their notes.
        </p>
      </div>

      <div className="children-section">
        <h2>View Child's Notes</h2>
        <p className="info-text">
          Enter the Child ID to view their notes. Ask your child for their ID number.
        </p>
        
        <div className="child-selector">
          <input
            type="number"
            placeholder="Enter child ID"
            onChange={(e) => {
              const childId = parseInt(e.target.value);
              if (childId) {
                setSelectedChild(childId);
                fetchChildNotes(childId);
              }
            }}
          />
        </div>

        {selectedChild && (
          <div className="child-notes-section">
            <h3>Child's Notes (ID: {selectedChild})</h3>
            
            {loading ? (
              <p>Loading notes...</p>
            ) : childNotes.length === 0 ? (
              <div className="empty-state">
                <p>This child has no notes yet.</p>
              </div>
            ) : (
              <div className="notes-grid">
                {childNotes.map(note => (
                  <div 
                    key={note.id} 
                    className={`note-item ${note.noteType} ${note.completed ? 'completed' : ''}`}
                  >
                    <div className="note-header">
                      {note.noteType === 'CHECKBOX' && (
                        <input
                          type="checkbox"
                          checked={note.completed}
                          disabled
                          className="note-checkbox"
                        />
                      )}
                      <h4 className={note.completed ? 'completed-text' : ''}>
                        {note.title}
                      </h4>
                    </div>
                    
                    {note.content && (
                      <p className={`note-content ${note.completed ? 'completed-text' : ''}`}>
                        {note.content}
                      </p>
                    )}

                    {note.tags && formatTags(note.tags).length > 0 && (
                      <div className="note-tags">
                        {formatTags(note.tags).map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="note-meta">
                      <small>
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                        {note.updatedAt && note.updatedAt !== note.createdAt && (
                          <> • Updated: {new Date(note.updatedAt).toLocaleDateString()}</>
                        )}
                      </small>
                    </div>

                    <div className="read-only-badge">
                      👁️ Read Only
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ParentDashboard;