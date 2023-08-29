import BrandIcon from '../../components/BrandIcon';
import LoginForm from '../../components/LoginForm';
import styles from './styles.module.scss';

const Login = () => {
    return(
        <div className={styles.container}>
        <section className={styles.loginSection}>
            <BrandIcon/>
            <LoginForm/>
        </section>
        <section className={styles.welcomeSection}>
            <div className={styles.welcomeText}>
                <h1>Hello, Reader!</h1>
                <h6>Enter your personal details and start the journey with us</h6>
                <button>Sign Up</button>
            </div>
        </section>
        </div>
    )
}

export default Login;