import { Route, useNavigate } from 'react-router-dom';
import menuIcon from '../../assets/menu.svg';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';
import { Routes } from '../../routes';

export interface TopbarProps {
    toggleSidebar: () => void
};

const Topbar = ({ toggleSidebar }: TopbarProps) => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate(Routes.HOME);
    };

    const navigateToSettings = () => {
        navigate(Routes.SETTINGS);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img className={styles.menuIcon} src={menuIcon} alt="menu" onClick={toggleSidebar}/>
                <div className={styles.brandIcon} onClick={navigateToHome}>
                    <BrandIcon />
                </div>
                <button className={styles.profile} onClick={navigateToSettings}>
                    EI
                </button>
            </div>
        </div>
    )
};

export default Topbar;