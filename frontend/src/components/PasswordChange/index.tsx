import { TextField } from '@mui/material';
import styles from './styles.module.scss';

const PasswordChange = () => {
    return(
        <div className={styles.container}>
            <p className={styles.text}>Change your password</p>
            <div className={styles.infos}>
                <TextField className={styles.info} placeholder='Current password' disabled/>
                <TextField className={styles.info} placeholder="New password" disabled/>
                <TextField className={styles.info} placeholder="Confirm new password" disabled/>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>Save</button>
                </div>
            </div>
        </div>
    )
};

export default PasswordChange;