import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

// api axios instance
function serverAxios() {
    const instance = axios.create({
        baseURL: VITE_BASE_URL,
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            //Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    instance.interceptors.request.use((config) => {
        config.headers['authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    });

    return instance;
}

export { serverAxios };
