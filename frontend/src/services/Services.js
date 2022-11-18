import axios from 'axios';

const register = (data) => {
  return axios.post(`http://localhost:5000/api/users/addUsers`, data, {
    headers: {
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
    },
  });
};

const getusers = () => {
  return axios.get('http://localhost:5000/api/users/userList', {
  });
};

const login = (data) => {
  return axios.post(`http://localhost:5000/api/login`, data);
};

const saveMessage = (data) => {
  console.log(data)
  return axios.post(`http://localhost:5000/api/message/add`, data, {
    headers: {
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
    },
  });
};

const uploadFile = (data) => {
  return axios.post(`http://localhost:5000/api/file/add`, data, {
    headers: {
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
    },
  });
};

const services = { register, getusers, login, saveMessage, uploadFile };
export default services;
