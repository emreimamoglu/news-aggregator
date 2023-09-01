import menuIcon from '../../assets/menu.svg';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';

export interface TopbarProps {
    toggleSidebar: () => void
};

const Topbar = ({ toggleSidebar }: TopbarProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img className={styles.menuIcon} src={menuIcon} alt="menu" onClick={toggleSidebar}/>
                <div className={styles.brandIcon}>
                    <BrandIcon />
                </div>
                <button className={styles.profile}>
                    EI
                </button>
            </div>
        </div>
    )
};

export default Topbar;