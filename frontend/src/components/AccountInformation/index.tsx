import { TextField } from '@mui/material';
import styles from './styles.module.scss';

const AccountInformation = () => {
    return(
        <div className={styles.container}>
            <p className={styles.text}>Account Information</p>
            <div className={styles.infos}>
                <TextField className={styles.info} label="Name" disabled/>
                <TextField className={styles.info} label="Email" disabled/>
            </div>
        </div>
    )
};

export default AccountInformation;