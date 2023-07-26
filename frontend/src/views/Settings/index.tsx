import AccountInformation from '@/components/AccountInformation';
import styles from './styles.module.scss';
import PasswordChange from '@/components/PasswordChange';

const Settings = () => {
    return (
        <div className={styles.container}>
            <p className={styles.settings}>Settings</p>
            <AccountInformation/>
            <PasswordChange/>
        </div>
    )
};


export default Settings;