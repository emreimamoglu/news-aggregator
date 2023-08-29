import BrandIcon from "../../components/BrandIcon";
import RegisterForm from "../../components/RegisterForm";
import styles from "./styles.module.scss";

const Register = () => {
    return (
        <>
            <section className={styles.registerSection}>
                <BrandIcon />
                <RegisterForm />
            </section>
            <section className={styles.welcomeSection}>
                <div className={styles.welcomeText}>
                    <h1>Welcome back!</h1>
                    <h6>Sing in to keep yourself up to date</h6>
                    <button>Sign In</button>
                </div>
            </section>
        </>
    );
};

export default Register;