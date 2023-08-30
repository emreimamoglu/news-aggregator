import menuIcon from '../../assets/menu.svg';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';

const Topbar = () => {

    return (
        <div className={styles.container}>
            <div className={styles.topbar}>
                <img src={menuIcon} alt="menu" />
                <div className={styles.brandIcon}>
                    <BrandIcon />
                </div>
                <div className={styles.settings} />
            </div>
        </div>
    )
};

export default Topbar;