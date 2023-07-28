import { TextField } from '@mui/material';
import styles from './styles.module.scss';
import { useUserContext } from '@/contexts/User';

const AccountInformation = () => {
    const {user} = useUserContext();

    return(
        <div className={styles.container}>
            <p className={styles.text}>Account Information</p>
            <div className={styles.infos}>
                <TextField className={styles.info} value={user?.name} disabled/>
                <TextField className={styles.info} value={user?.email} disabled/>
            </div>
        </div>
    )
};

export default AccountInformation;