import axios from "axios";

const baseUrl = process.env.NEWS_APP_URL || 'http://localhost:8000/api';

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accepted: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;