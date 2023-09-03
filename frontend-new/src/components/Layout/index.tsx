import { useCallback, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import styles from './styles.module.scss';
import { useViewport } from '../../hooks/useViewport';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { width } = useViewport();


    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);


    return (
        <div className={styles.container}>

            <Sidebar open={isSidebarOpen} closeSidebar={closeSidebar} />

            {
                width && width < 836 && (
                    <Topbar toggleSidebar={toggleSidebar} />
                )
            }
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;