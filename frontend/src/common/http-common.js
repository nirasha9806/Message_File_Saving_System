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
    const token = window.sessionStorage.getItem('webpart-token');
    const loginMode = window.sessionStorage.getItem('loginmode');
    const username = window.sessionStorage.getItem('username');
    const userId = window.sessionStorage.getItem('userId');

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
      config.headers['LoginMode'] = loginMode;
      config.headers['Username'] = username;
      config.headers['UserId'] = userId;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
