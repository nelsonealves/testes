import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://wirelink-back.herokuapp.com/',
  // baseURL: 'https://portal2-back.wirelink.com.br/',
  baseURL: 'http://localhost:8001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:3000', 
    // 'Access-Control-Allow-Credentials': true,

  },
});
// api.defaults.baseURL = 'http://localhost:3000'
api.defaults.xsrfCookieName = 'csrftoken';
api.defaults.xsrfHeaderName = 'X-CSRFToken';

export default api;
