import http from '../common/http-common';

const register = (data) => {
  return http.post(`/user/create-user`, data);
};

const userService = { register };
export default userService;
