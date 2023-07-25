import { LayoutProps } from "@/interfaces";
import Sidebar from "../Sidebar"
import styles from './styles.module.scss';

const Layout = ({ children } : LayoutProps) => {
    return (
        <div className={styles.container}>
        <Sidebar/>
        <main>{children}</main>
        </div>
    );
}

export default Layout;