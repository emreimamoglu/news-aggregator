import { SidebarIconProps } from '@/interfaces';
import styles from './styles.module.scss';
const SidebarIcon = ({name} : SidebarIconProps) => {
    return (
        <div className={styles.container}>
            <p className={styles.icon}>P | Press</p>
            <p className={styles.name}>{name}</p>
        </div>
    )
};

export default SidebarIcon;