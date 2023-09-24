import { useNavigate } from "react-router-dom";
import BrandIcon from "../../components/BrandIcon";
import RegisterForm from "../../components/RegisterForm";
import styles from "./styles.module.scss";
import { Routes } from "../../routes";

const Register = () => {
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate(Routes.LOGIN);
    }

    return (
        <div className={styles.container}>
            <section className={styles.registerSection}>
                <div className={styles.brandIcon}>
                    <BrandIcon />
                </div>
                <RegisterForm />
            </section>
            <section className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                    <h1>Welcome back!</h1>
                    <h6>Sing in to keep yourself up to date</h6>
                    <button onClick={handleSignInClick}>Sign In</button>
                </div>
            </section>
        </div>
    );
};

export default Register;