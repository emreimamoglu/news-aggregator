import { useRouter } from 'next/router';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './styles.module.scss';
import { useUserContext } from '@/contexts/User';
import SidebarMenu from '../SidebarMenu';
import SidebarIcon from '../SidebarIconAndName';
import { LogoutOutlined } from '@mui/icons-material';
import { clearLocalStorage } from '@/config/axios';

const Sidebar = () => {
    const { route,push } = useRouter();
    const { user } = useUserContext()

    const handleLogout = () => {
        clearLocalStorage();
        push('/');
    };

    return (
        <div className={styles.container}>
            {
                user && (
                    <div className={styles.sidebarLoggedIn}>
                        <SidebarIcon name={user.name} />
                        <SidebarMenu />
                        <div className={styles.logout} onClick={handleLogout}>
                            <LogoutOutlined />
                        </div>
                    </div>
                )
            }
            {
                !user && route === '/register' ? <RegisterForm /> :
                !user ? <LoginForm /> : null
            }
        </div>
    )
}


export default Sidebar;