import axios from 'axios';
const instance = axios.create();

instance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    config.headers.Authorization = token ? `JWT ${token}`: '';
    return config;
});

//To keep the token updated
instance.interceptors.response.use((res) => {
    const storedToken = window.localStorage.getItem('token');
    if(res.data.token && res.data.token !== storedToken) {
        window.localStorage.setItem('token', res.data.token);
    }
    return res;
});

export default instance;