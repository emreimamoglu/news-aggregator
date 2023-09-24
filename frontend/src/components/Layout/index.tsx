import { useCallback, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import styles from './styles.module.scss';
import { useViewport } from '../../hooks/useViewport';
import { Outlet, useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { width } = useViewport();
    const navigate = useNavigate();


    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');

        if (!tokenFromLocalStorage) {
            navigate(Routes.LOGIN);
        }
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