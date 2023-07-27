import { LayoutProps } from "@/interfaces";
import Sidebar from "../Sidebar"
import styles from './styles.module.scss';
import { useUserContext } from "@/contexts/User";
import { useEffect } from "react";

const Layout = ({ children }: LayoutProps) => {
    const {setUser} = useUserContext();
    

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

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