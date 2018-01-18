import axios from 'axios';

let headers = { 'Content-Type': 'application/json' };

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers
});

export default instance;
