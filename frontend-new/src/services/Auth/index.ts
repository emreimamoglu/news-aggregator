import axios from '../../config/axios';
import { ChangePasswordFormData, LoginFormData, RegisterFormData } from '../../types/Auth';

const endpoints = {
    LOGIN: '/login',
    REGISTER : '/register',
    CHANGE_PASSWORD: '/change-password',
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
            .catch((err) => {
            });
    }

    public register(data: RegisterFormData) {
        return axios
            .post<any>(endpoints.REGISTER, data)
            .then((res) => res.data)
            .catch((err) => {
            });
    }

    public changePassword(data: ChangePasswordFormData) {
        return axios
            .post<any>(endpoints.CHANGE_PASSWORD, data)
            .then((res) => res.data)
            .catch((err) => {
            });
    }
}

export default AuthService;
