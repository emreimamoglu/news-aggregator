import { LayoutProps } from "@/interfaces";
import Sidebar from "../Sidebar"
import styles from './styles.module.scss';

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    );
}

export default Layout;