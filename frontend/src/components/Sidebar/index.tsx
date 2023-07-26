import { useRouter } from 'next/router';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './styles.module.scss';
import { useUserContext } from '@/contexts/User';
import SidebarProfile from '../SidebarProfile';
import SidebarMenu from '../SidebarMenu';
import SidebarIcon from '../SidebarIcon';

const Sidebar = () => {
    const { route } = useRouter();
    const { user } = useUserContext()

    return (
        <div className={styles.container}>
            {
                user && (
                    <div className={styles.sidebarLoggedIn}>
                        <SidebarIcon />
                        <SidebarMenu />
                        <SidebarProfile name={user.name}/>
                    </div>
                )
            }
            {
                !user && route === '/register' ? <RegisterForm /> :
                    !user && route === '/login' ? <LoginForm /> : null
            }
        </div>
    )
}


export default Sidebar;