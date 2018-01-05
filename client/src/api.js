import axios from 'axios';

let headers = { 'Content-Type': 'application/json' };

if (localStorage.getItem('token') !== null) {
  headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers
});

export default instance;
