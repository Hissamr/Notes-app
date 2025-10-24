import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
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
  getLinkedChildren: () => api.get('/auth/children')
};

export default api;