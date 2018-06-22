import axios from 'axios';
export const reviewApiAxios = axios.create();
reviewApiAxios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});