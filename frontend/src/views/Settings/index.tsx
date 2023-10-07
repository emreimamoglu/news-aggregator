import { useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/mynews.svg';
import tileIcon from '../../assets/tile.svg';

import styles from './styles.module.scss';
import { Routes } from '../../routes';
import withAuth from '../../components/withAuth';

const Settings = () => {

    const navigate = useNavigate();

    const navigateTo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const targetRoute = e.currentTarget.getAttribute('data-route');
        if (targetRoute) {
            navigate(targetRoute as Routes);
        }
    }

    return(
        <div className={styles.container}>
            <h1>Settings</h1>
            <div className={styles.settings}>
                <div className={styles.settingsOption} data-route={Routes.ACCOUNT} onClick={navigateTo}>
                    <img src={profileIcon} alt="Account" />
                    <p>Account</p>
                </div>
                <div className={styles.settingsOption} data-route={Routes.APPEARANCE} onClick={navigateTo}>
                    <img src={tileIcon} alt="Appearance" />
                    <p>Appearance</p>
                </div>
            </div>
        </div>
    )
};

export default withAuth(Settings);