import axios from "axios";

export const clearLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
};

const baseUrl = import.meta.env.NEWS_APP_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accepted: 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            clearLocalStorage();
        }
        return Promise.reject(error);
    })

export default axiosInstance;