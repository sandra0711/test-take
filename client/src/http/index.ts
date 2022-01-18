import axios from 'axios';
const API_URL = 'http://localhost:5000';

const $api = axios.create({
  withCredentials: true, //чтобы куки цеплялись автоматически к каждому запросу
  baseURL: API_URL,
});

$api.interceptors.request.use(function (config: any) {
  // Do something before request is sent
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
});

export default $api;
