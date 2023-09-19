import axios from '../../config/axios';
import { ChangePasswordFormData, LoginFormData, RegisterFormData } from '../../types/Auth';

const endpoints = {
    LOGIN: '/login',
    REGISTER : '/register',
    CHANGE_PASSWORD: '/change-password',
    GOOGLE_LOGIN: '/auth/google',
    GOOGLE_CALLBACK: '/auth/google/callback',
    TWITTER_LOGIN: '/auth/twitter',
    TWITTER_CALLBACK: '/auth/twitter/callback',
    META_LOGIN: '/auth/meta',
    META_CALLBACK: '/auth/meta/callback',
};

class AuthService {
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthService();
        }

        return this.instance;
    }

    private static instance: AuthService;

    public login(data: LoginFormData) {
        return axios
            .post<any>(endpoints.LOGIN, data)
            .then((res) => res.data)
    }

    public register(data: RegisterFormData) {
        return axios
            .post<any>(endpoints.REGISTER, data)
            .then((res) => res.data)
    }

    public changePassword(data: ChangePasswordFormData) {
        return axios
            .post<any>(endpoints.CHANGE_PASSWORD, data)
            .then((res) => res.data)
    }

    public googleLogin() {
        return axios
            .get<any>(endpoints.GOOGLE_LOGIN)
            .then((res) => res.data)
    };

    public googleCallback(query: string) {
        return axios
            .get<any>(`${endpoints.GOOGLE_CALLBACK}${query}`)
            .then((res) => res.data)
    };

    public twitterLogin() {
        return axios
            .get<any>(endpoints.TWITTER_LOGIN)
            .then((res) => res.data)
    };

    public twitterCallback(query: string) {
        return axios
            .get<any>(`${endpoints.TWITTER_CALLBACK}${query}`)
            .then((res) => res.data)
    };

    public metaLogin() {
        return axios
            .get<any>(endpoints.META_LOGIN)
            .then((res) => res.data)
    };

    public metaCallback(query: string) {
        return axios
            .get<any>(`${endpoints.META_CALLBACK}${query}`)
            .then((res) => res.data)
    };
}

export default AuthService;
