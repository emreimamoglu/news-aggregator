import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import AuthService from "../../services/Auth";
import { useUserContext } from "../../contexts/UserContext";
import { Routes } from "../../routes";


const TwitterCallback = () => {
    const location = useLocation();
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const { isLoading, error } = useQuery(["twitterCallback"], () => {
        const verifier = localStorage.getItem('twitter_code_challenge');
        return AuthService.getInstance().twitterCallback(`${location.search}&code_verifier=${verifier}`);
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
                {isLoading ? <h1>Verifying Twitter Login</h1> : error ? <h1>Twitter Login Failed</h1> : <h1>Twitter Login Successful, Redirecting</h1>}
            </div>
        </div>
    )
};

export default TwitterCallback;