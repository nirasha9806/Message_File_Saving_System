import axios from 'axios';

const baseURL = process.env.API_URL;

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config) {
    const token = window.sessionStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
