import styles from './styles.module.scss';
import { sidebarMenuRoutes } from '../../routes';
import { useRouter } from 'next/router';

const SidebarMenu = () => {
    const router = useRouter();
    return (
        <ul className={styles.menu}>
            {
                sidebarMenuRoutes.map((route) => (
                    <li key={route.id} onClick={() => {
                        router.push(route.path);
                    }}>
                        <a>{route.name}</a>
                    </li>
                ))
            }
        </ul>
    );
};

export default SidebarMenu;