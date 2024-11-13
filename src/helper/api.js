// api.js
import axios from 'axios';
import { DB_URL } from './db';

const api = axios.create({
  baseURL: DB_URL
});

export default api;
