import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import AuthService from "../../services/Auth";
import { useUserContext } from "../../contexts/UserContext";
import { Routes } from "../../routes";


const MetaCallback = () => {
    const location = useLocation();
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const { isLoading, error } = useQuery(["metaCallback"], () => {
        return AuthService.getInstance().metaCallback(`${location.search}`);
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
                <LoadingSpinner color="#119C59"/>
                {isLoading ? <h1>Verifying Facebook Login</h1> : error ? <h1>Facebook Login Failed</h1> : <h1>Facebook Login Successful, Redirecting</h1>}
            </div>
        </div>
    )
};

export default MetaCallback;