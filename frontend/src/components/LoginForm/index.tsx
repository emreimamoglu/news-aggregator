import { useRouter } from 'next/router';
import styles from './styles.module.scss';

const LoginForm = () => {
    const router = useRouter();

    const handleCreateAccountClick = () => {
        router.push('/register');
    };
    
    return (
        <form>
            <div className={styles.container}>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log in</button>
                <a onClick={handleCreateAccountClick}>{"Create new account >"}</a>
            </div>
        </form>
    )
};

export default LoginForm;