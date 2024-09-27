// src/services/axiosInstance.ts

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api' // Your base API URL
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors
  }
);

export default axiosInstance;
