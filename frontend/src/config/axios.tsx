import axios from "axios";

export const clearLocalStorage = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
};

const baseUrl = process.env.NEWS_APP_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accepted: 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
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
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('access_token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    })

export default axiosInstance;