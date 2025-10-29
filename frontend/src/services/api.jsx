import axios from 'axios';

// For Create React App, environment variables MUST start with REACT_APP_
// They are embedded at BUILD TIME, not runtime
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Debug: Log the API URL being used
console.log('🌐 API Base URL:', API_BASE_URL);
console.log('📦 Environment:', process.env.NODE_ENV);
console.log('🔧 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Making API request:', {
    method: request.method,
    url: request.url,
    baseURL: request.baseURL,
    fullURL: `${request.baseURL}${request.url}`,
    headers: request.headers,
  });
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API response success:', {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  error => {
    console.error('API error:', {
      status: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

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