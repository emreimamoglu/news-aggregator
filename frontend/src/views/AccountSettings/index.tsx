import styles from './styles.module.scss';

const AccountSettings = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Manage Account</h1>
            </div>
            <div className={styles.formAndImage}>
                <div className={styles.form}>
                    <form>
                        <div className={styles.nameField}>
                            <label id='name'>
                                <input type="text" placeholder=' ' />
                                <span>Name</span>
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
                        <div className={styles.emailPasswordField}>
                            <label id='email_label'>
                                <input type="text" placeholder=' ' />
                                <span>Enter your email address</span>
                            </label>
                            <label id='password_label'>
                                <input type="password" placeholder=' ' />
                                <span>Enter your password</span>
                            </label>
                            <label id='password_confirm_label'>
                                <input type="password" placeholder=' ' />
                                <span>Confirm your password</span>
                            </label>
                        </div>
                        <div className={styles.buttons}>
                            <button>Delete My Account</button>
                            <button>Save Changes</button>
                        </div>
                    </form>
                </div>
                <div className={styles.profilePicture}>
                    <div className={styles.profile}>
                        EI
                    </div>
                    <button>Edit Image</button>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;