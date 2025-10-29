import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Navigate } from 'react-router-dom';
import { authAPI, notesAPI } from '../services/api.jsx';
import './ParentDashboard.css';

function ParentDashboard() {
  const { user } = useAuth();
  const [childUsername, setChildUsername] = useState('');
  const [linkedChildren, setLinkedChildren] = useState([]);
  const [childrenNotes, setChildrenNotes] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Always call hooks in the same order — move effects above any early returns
  useEffect(() => {
    fetchLinkedChildren();
  }, []);

  if (user && user.role === 'CHILD') {
    return <Navigate to="/dashboard" />;
  }

  const fetchLinkedChildren = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.getLinkedChildren();
      setLinkedChildren(response.data);
      
      // Fetch notes for each child
      const notesPromises = response.data.map(child => 
        notesAPI.getChildNotes(child.id)
          .then(res => ({ childId: child.id, notes: res.data }))
          .catch(() => ({ childId: child.id, notes: [] }))
      );
      
      const allNotes = await Promise.all(notesPromises);
      const notesMap = {};
      allNotes.forEach(({ childId, notes }) => {
        notesMap[childId] = notes;
      });
      setChildrenNotes(notesMap);
    } catch (error) {
      setError('Failed to fetch linked children');
    } finally {
      setLoading(false);
    }
  };

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
      // Refresh the children list
      fetchLinkedChildren();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to link child');
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
        <h2>Linked Children & Their Notes</h2>
        
        {loading ? (
          <p>Loading children and notes...</p>
        ) : linkedChildren.length === 0 ? (
          <div className="empty-state">
            <p>No linked children yet. Link a child account above to view their notes.</p>
          </div>
        ) : (
          linkedChildren.map(child => (
            <div key={child.id} className="child-notes-section">
              <h3>📝 {child.username}'s Notes</h3>
              <p className="child-info">Email: {child.email}</p>
              
              {childrenNotes[child.id] && childrenNotes[child.id].length === 0 ? (
                <div className="empty-state">
                  <p>This child has no notes yet.</p>
                </div>
              ) : (
                <div className="notes-grid">
                  {(childrenNotes[child.id] || []).map(note => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default ParentDashboard;