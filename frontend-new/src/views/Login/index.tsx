import { useNavigate } from 'react-router-dom';
import BrandIcon from '../../components/BrandIcon';
import LoginForm from '../../components/LoginForm';
import styles from './styles.module.scss';
import { Routes } from '../../routes';

const Login = () => {

    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate(Routes.REGISTER);
    }

    return (
        <div className={styles.container}>
            <section className={styles.loginSection}>
                <div className={styles.brandIcon}>
                    <BrandIcon />
                </div>
                <LoginForm />
            </section>
            <section className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                    <h1>Hello, Reader!</h1>
                    <h6>Enter your personal details and start the journey with us</h6>
                    <button onClick={handleSignupClick}>Sign Up</button>
                </div>
            </section>
        </div>
    )
}

export default Login;