import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/', // change selon ton .env
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // utile si tu gères les cookies (sessions)
});

export default api;
