import styles from './styles.module.scss';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';
import googleIcon from '../../assets/google.svg';
import classnames from 'classnames';

const LoginForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.loginText}>
                    <h1>Login</h1>
                </div>
                <form>
                    <label id='email_label'>
                        <input type="text" placeholder=' ' />
                        <span>Enter your email address</span>
                    </label>
                    <label id='password_label'>
                        <input type="password" placeholder=' ' />
                        <span>Enter your password</span>
                    </label>
                    <button>Login</button>
                </form>

                <div className={styles.forgotPasswordOrUseAccount}>
                    <a>Forgot Password?</a>
                    <p>or use account</p>
                </div>

                <div className={styles.socialMediaButtons}>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.twitterButton
                    )}><img src={twitterIcon}/>Twitter</button>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.facebookButton
                    )}><img src={facebookIcon}/>Facebook</button>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.googleButton
                    )}><img src={googleIcon}/>Google</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;