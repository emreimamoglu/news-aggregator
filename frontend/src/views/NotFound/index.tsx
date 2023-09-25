import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const NotFound = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        return setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    useEffect(() => {
        const task = navigateToHome();

        return () => {
            clearTimeout(task);
        }
    }, []);

    return (
        <div className={styles.container}>
            <h1>404</h1>
            <p>Page not found, redirecting to Home...</p>
        </div>
    )
};

export default NotFound;