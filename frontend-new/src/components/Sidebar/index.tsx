import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useViewport } from '../../hooks/useViewport';
import BrandIcon from '../BrandIcon';
import styles from './styles.module.scss';
import classnames from 'classnames';

export interface SidebarProps {
    open: boolean;
    closeSidebar: () => void;
};

const Sidebar = ({open,closeSidebar} : SidebarProps) => {
    const ref = useOutsideClick(closeSidebar);
    const {width} = useViewport();

    return (
        <aside ref={ref} className={classnames(styles.sidebar,{
            [styles.sidebarOpen]: (open || (width && width > 835))
        })}>
            <div className={styles.brandlogo}>
                <BrandIcon />
            </div>
            <div className={styles.sidebarOptions}></div>
        </aside>
    )
};

export default Sidebar;