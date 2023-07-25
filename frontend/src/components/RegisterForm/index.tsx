import styles from './styles.module.scss';

const RegisterForm = () => {
    return (
        <form>
            <div className={styles.container}>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button type="submit">Sign up</button>
                <a onClick={() => console.log('clicked')}>{"Already have an account ?"}</a>
            </div>
        </form>
    )
};

export default RegisterForm;