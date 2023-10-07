import { useNavigate } from 'react-router-dom';
import menuIcon from '../../assets/menu.svg';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';
import { Routes } from '../../routes';
import { useUserContext } from '../../contexts/UserContext';
import { getFirstLetter } from '../../utils';

export interface TopbarProps {
    toggleSidebar: () => void
};

const Topbar = ({ toggleSidebar }: TopbarProps) => {
    const navigate = useNavigate();
    const { user } = useUserContext();

    const navigateToHome = () => {
        navigate(Routes.HOME);
    };

    const navigateToSettings = () => {
        navigate(Routes.SETTINGS);
    };

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img className={styles.menuIcon} src={menuIcon} alt="menu" onClick={toggleSidebar} />
                <div className={styles.brandIcon} onClick={navigateToHome}>
                    <BrandIcon />
                </div>
                <button className={styles.profile} onClick={navigateToSettings}>
                    {(user?.avatar?.url ? (<img className={styles.image} src={user?.avatar?.url} />) : (
                        <div className={styles.imgPlaceholder}>
                            {user?.name && getFirstLetter(user?.name)}
                        </div>
                    ))}
                </button>
            </div>
        </div>
    )
};

export default Topbar;