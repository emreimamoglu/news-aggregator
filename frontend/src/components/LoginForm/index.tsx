import styles from './styles.module.scss';

const LoginForm = () => {
    return (
        <form>
            <div className={styles.container}>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log in</button>
                <a onClick={() => console.log('clicked')}>{"Create new account >"}</a>
            </div>
        </form>
    )
};

export default LoginForm;