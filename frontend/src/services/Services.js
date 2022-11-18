import axios from 'axios';

const register = (data) => {
  return axios.post(`http://localhost:5000/api/users/addUsers`, data);
};

const getusers = () => {
  return axios.get('http://localhost:5000/api/users/userList');
};

const login = (data) => {
  return axios.post(`http://localhost:5000/api/login`, data);
};

const saveMessage = (data) => {
  return axios.post(`http://localhost:5000/api/message/add`, data);
};

const uploadFile = (data) => {
  return axios.post(`http://localhost:5000/api/file/add`, data);
};

const services = { register, getusers, login, saveMessage, uploadFile };
export default services;
