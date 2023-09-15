import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./styles.module.scss";
import { useQuery } from "react-query";
import AuthService from "../../services/Auth";
import { useUserContext } from "../../contexts/UserContext";
import { Routes } from "../../routes";


const GoogleCallback = () => {
    const location = useLocation();
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const { isLoading, error } = useQuery("googleCallback", () => {
        return AuthService.getInstance().googleCallback(location.search);
    }, {
        onSuccess: (data) => {
            setUser(data.data.user);
            localStorage.setItem('token', data.data.token);
            navigate(Routes.HOME);
        },
    });


    return (
        <div className={styles.container}>
            <div>
                <LoadingSpinner />
                {isLoading ? <h1>Verifying Google Login</h1> : error ? <h1>Google Login Failed</h1> : <h1>Google Login Successful, Redirecting</h1>}
            </div>
        </div>
    )
};

export default GoogleCallback;