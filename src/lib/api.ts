import axios from 'axios';

// Create an Axios instance for common configuration
const api = axios.create({
  // Point to the local Next.js API routes
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
