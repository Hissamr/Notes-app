import axios from 'axios';

// Resolve API base URL in a robust way so the code works both in Vite and
// non-Vite (webpack/dev-server) environments where `import.meta.env` may not
// be available at runtime. Try Vite's import.meta.env first, then fall back to
// common environment vars exposed by other setups, finally default to localhost.
const getApiBaseUrl = () => {
  // Try Vite's import.meta.env (use typeof to avoid reference errors)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) {
      return import.meta.env.VITE_API_URL;
    }
  } catch (e) {
    // import.meta may not be supported in some bundlers/environments; ignore
  }

  // Fall back to process.env variables commonly used in CRA/webpack setups
  // Use typeof to avoid "process is not defined" errors in browser environments
  if (typeof process !== 'undefined' && process.env) {
    const envUrl = process.env.REACT_APP_VITE_API_URL || 
                   process.env.VITE_API_URL || 
                   process.env.REACT_APP_API_URL;
    if (envUrl) return envUrl;
  }

  // Final default
  return 'http://localhost:8080/api';
};

// Debug: Log the API URL being used
const API_BASE_URL = getApiBaseUrl();
console.log('🌐 API Base URL:', API_BASE_URL);
console.log('📦 Environment Check:', {
  'import.meta.env.VITE_API_URL': typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : 'not available',
  'process.env.REACT_APP_API_URL': typeof process !== 'undefined' ? process.env?.REACT_APP_API_URL : 'not available'
});

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Making API request:', {
    method: request.method,
    url: request.url,
    headers: request.headers,
    data: request.data
  });
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API error:', {
      status: error.response?.status,
      url: error.config?.url,
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