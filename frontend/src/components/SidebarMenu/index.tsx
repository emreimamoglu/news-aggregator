import styles from './styles.module.scss';

const SidebarMenu = () => {
    return (
        <ul className={styles.menu}>
            <li>
            <a>Home</a>
            </li>
            <li>
            <a>Search</a>
            </li>
            <li>
            <a>Subscriptions</a>
            </li>
        </ul>
    );
};

export default SidebarMenu;