import { TextField } from '@mui/material';
import styles from './styles.module.scss';

const PasswordChange = () => {
    return(
        <div className={styles.container}>
            <p className={styles.text}>Change your password</p>
            <div className={styles.infos}>
                <TextField type='password' className={styles.info} placeholder='Current password' />
                <TextField type='password' className={styles.info} placeholder="New password" />
                <TextField type='password' className={styles.info} placeholder="Confirm new password" />
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default PasswordChange;