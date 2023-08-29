import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brandlogo}>
                <BrandIcon />
            </div>
            <div className={styles.sidebarOptions}></div>
        </aside>
    )
};

export default Sidebar;