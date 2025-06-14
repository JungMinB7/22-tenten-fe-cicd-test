import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,  //api
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
