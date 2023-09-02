import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useViewport } from '../../hooks/useViewport';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';
import classnames from 'classnames';
import newsIcon from '../../assets/news.svg';
import myNewsIcon from '../../assets/mynews.svg';
import readLaterIcon from '../../assets/saved.svg';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../routes';

export interface SidebarProps {
    open: boolean;
    closeSidebar: () => void;
};

const SidebarMenu = () => {
    return (
        <div className={styles.menuOptions}>
            <div className={styles.menuOption}>
                <div className={styles.menuOptionItem}>
                    <p>News</p>
                    <img src={newsIcon} alt="News" />
                </div>
            </div>
            <div className={styles.menuOption}>
                <div className={styles.menuOptionItem}>
                    <p>My News</p>
                    <img src={myNewsIcon} alt="My News" />
                </div>
            </div>
            <div className={styles.menuOption}>
                <div className={styles.menuOptionItem}>
                    <p>Read Later</p>
                    <img src={readLaterIcon} alt="Read Later" />
                </div>
            </div>
            <div className={styles.menuOptionSubs}>
                <div className={styles.subHeader}>
                    <p>Subscriptions</p>
                </div>
                <div className={styles.menuSubItem}>
                    <div className={styles.menuSubItemInner}>
                        <p>Sources</p>
                        <p>306</p>
                    </div>
                </div>
                <div className={styles.menuSubItem}>
                    <div className={styles.menuSubItemInner}>
                        <p>Categories</p>
                        <p>201</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

const SidebarSettingsMenu = () => {
    return (
        <div className={styles.settingOptions}>
            <div className={styles.settingOption}>
                <p>News</p>
                <img src={newsIcon} alt="News" />
            </div>

        </div>
    )
};

const Sidebar = ({ open, closeSidebar }: SidebarProps) => {
    const ref = useOutsideClick(closeSidebar);
    const { width } = useViewport();
    const location = useLocation();

    return (
        <aside ref={ref} className={classnames(styles.sidebar, {
            [styles.sidebarOpen]: (open || (width && width > 835))
        })}>
            <div className={styles.brandlogo}>
                <BrandIcon />
            </div>
            <div className={styles.sidebarOptions}>
                {
                    location.pathname !== Routes.SETTINGS ? <SidebarMenu /> : <SidebarSettingsMenu />
                }
            </div>
        </aside>
    )
};

export default Sidebar;