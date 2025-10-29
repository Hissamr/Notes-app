import React, { useState } from 'react';
import { foldersAPI } from '../services/api.jsx';
import './FoldersList.css';

function FoldersList({ folders, selectedFolder, onFolderSelect, onFoldersChanged }) {
  const [showForm, setShowForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    
    if (!newFolderName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await foldersAPI.createFolder({ name: newFolderName.trim() });
      setNewFolderName('');
      setShowForm(false);
      setError('');
      onFoldersChanged();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFolder = async (folderId, newName) => {
    if (!newName.trim()) {
      setError('Folder name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await foldersAPI.updateFolder(folderId, { name: newName.trim() });
      setEditingFolder(null);
      setEditingName('');
      setError('');
      onFoldersChanged();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update folder');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm('Delete this folder? (Notes will be preserved)')) {
      try {
        await foldersAPI.deleteFolder(folderId);
        if (selectedFolder && selectedFolder.id === folderId) {
          onFolderSelect(null);
        }
        setError('');
        onFoldersChanged();
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete folder');
      }
    }
  };

  return (
    <div className="folders-list">
      <div className="folders-header">
        <h3>📁 Folders</h3>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-small"
          title="Add new folder"
        >
          + Add
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleCreateFolder} className="folder-form">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name..."
            required
            maxLength="50"
            autoFocus
          />
          <div className="form-actions">
            <button type="submit" disabled={loading || !newFolderName.trim()}>
              {loading ? 'Creating...' : 'Save'}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="folders-items">
        {/* All Notes Folder */}
        <div
          className={`folder-item ${!selectedFolder ? 'active' : ''}`}
          onClick={() => onFolderSelect(null)}
          title="View all notes"
        >
          <span>📋 All Notes</span>
        </div>

        {/* User Folders */}
        {folders && folders.length > 0 ? (
          folders.map(folder => (
            <div key={folder.id} className="folder-item-container">
              {editingFolder === folder.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateFolder(folder.id, editingName);
                  }}
                  className="folder-edit-form"
                >
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    maxLength="50"
                    required
                    autoFocus
                  />
                  <button type="submit" disabled={loading}>Save</button>
                  <button type="button" onClick={() => setEditingFolder(null)}>Cancel</button>
                </form>
              ) : (
                <div
                  className={`folder-item ${selectedFolder?.id === folder.id ? 'active' : ''}`}
                  onClick={() => onFolderSelect(folder)}
                  title={`View "${folder.name}" folder`}
                >
                  <span>📂 {folder.name}</span>
                  <div className="folder-actions">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingFolder(folder.id);
                        setEditingName(folder.name);
                      }}
                      className="btn-icon"
                      title="Edit folder"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFolder(folder.id);
                      }}
                      className="btn-icon"
                      title="Delete folder"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="empty-message">No folders yet</p>
        )}
      </div>
    </div>
  );
}

export default FoldersList;