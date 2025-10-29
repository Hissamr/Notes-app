import axios from 'axios';

// API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const notesAPI = {
  getNotes: () => api.get('/notes'),
  createNote: (note) => api.post('/notes', note),
  updateNote: (id, note) => api.put(`/notes/${id}`, note),
  deleteNote: (id) => api.delete(`/notes/${id}`),
  getChildNotes: (childId) => api.get(`/notes/child/${childId}`)
};

export const foldersAPI = {
  getFolders: () => api.get('/folders'),
  createFolder: (folder) => api.post('/folders', folder),
  updateFolder: (id, folder) => api.put(`/folders/${id}`, folder),
  deleteFolder: (id) => api.delete(`/folders/${id}`)
};

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  linkChild: (childUsername) => api.post('/auth/link-child', { childUsername: childUsername }),
  getLinkedChildren: () => api.get('/auth/children'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword })
};

export default api;