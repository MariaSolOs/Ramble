import axios from 'axios';

const instance = axios.create();
instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization = token ? `JWT ${token}`: '';
    return config;
});

export default instance;