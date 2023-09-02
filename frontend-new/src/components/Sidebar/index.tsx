import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useViewport } from '../../hooks/useViewport';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';
import classnames from 'classnames';
import newsIcon from '../../assets/news.svg';
import myNewsIcon from '../../assets/mynews.svg';
import readLaterIcon from '../../assets/saved.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

export interface SidebarProps {
    open: boolean;
    closeSidebar: () => void;
};

const SidebarMenu = () => {
    const route = useLocation();
    const navigate = useNavigate();

    const navigateTo = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        const targetRoute = e.currentTarget.getAttribute('data-route');
        if (targetRoute) {
            navigate(targetRoute as Routes);
        }
    }

    return (
        <div className={styles.menuOptions}>
            <div className={styles.menuOption} data-route={Routes.NEWS} onClick={navigateTo}>
                <div className={classnames(styles.menuOptionItem, {
                    [styles.active]: route.pathname === Routes.NEWS
                })}>
                    <p>News</p>
                    <img src={newsIcon} alt="News" />
                </div>
            </div>
            <div className={styles.menuOption} data-route={Routes.HOME} onClick={navigateTo}>
                <div className={classnames(styles.menuOptionItem, {
                    [styles.active]: route.pathname === Routes.HOME
                })}>
                    <p>My News</p>
                    <img src={myNewsIcon} alt="My News" />
                </div>
            </div>
            <div className={styles.menuOption} data-route={Routes.READ_LATER} onClick={navigateTo}>
                <div className={classnames(styles.menuOptionItem, {
                    [styles.active]: route.pathname === Routes.READ_LATER
                })}>
                    <p>Read Later</p>
                    <img src={readLaterIcon} alt="Read Later" />
                </div>
            </div>
            <div className={styles.menuOptionSubs}>
                <div className={styles.subHeader}>
                    <p>Subscriptions</p>
                </div>
                <div className={styles.menuSubItem} data-route={Routes.SOURCES} onClick={navigateTo}>
                    <div className={classnames(styles.menuSubItemInner, {
                        [styles.active]: route.pathname === Routes.SOURCES
                    })}>
                        <p>Sources</p>
                        <p>306</p>
                    </div>
                </div>
                <div className={styles.menuSubItem} data-route={Routes.CATEGORIES} onClick={navigateTo}>
                    <div className={classnames(styles.menuSubItemInner, {
                        [styles.active]: route.pathname === Routes.CATEGORIES
                    })}>
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