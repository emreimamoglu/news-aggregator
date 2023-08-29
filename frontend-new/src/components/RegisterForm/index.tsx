import styles from './styles.module.scss';
import classnames from 'classnames';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';
import googleIcon from '../../assets/google.svg';

const RegisterForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.registerText}>
                    <h1>Create Your Account</h1>
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
                    <div className={styles.nameField}>
                        <label id='first_name'>
                            <input type="text" placeholder=' ' />
                            <span>First Name</span>
                        </label>
                        <label id='last_name'>
                            <input type="text" placeholder=' ' />
                            <span>Last Name</span>
                        </label>
                    </div>
                    <div className={styles.dateFields}>
                        <label id='bd_month'>
                            <input type="text" placeholder=' ' />
                            <span>Month</span>
                        </label>
                        <label id='bd_day'>
                            <input type="text" placeholder=' ' />
                            <span>Day</span>
                        </label>
                        <label id='bd_year'>
                            <input type="text" placeholder=' ' />
                            <span>Year</span>
                        </label>
                    </div>
                    <select id='location_select'>
                        <option value="1">America</option>
                        <option value="2">Europe</option>
                        <option value="3">Turkey</option>
                    </select>
                    <button>Sign Up</button>
                </form>

                <div className={styles.forgotPasswordOrUseAccount}>
                    <p>or use account</p>
                </div>

                <div className={styles.socialMediaButtons}>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.twitterButton
                    )}><img src={twitterIcon} />Twitter</button>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.facebookButton
                    )}><img src={facebookIcon} />Facebook</button>
                    <button className={classnames(
                        styles.socialMediaButton,
                        styles.googleButton
                    )}><img src={googleIcon} />Google</button>
                </div>
            </div>
        </div>
    )
};

export default RegisterForm;