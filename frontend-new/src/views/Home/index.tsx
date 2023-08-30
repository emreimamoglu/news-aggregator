import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';

const Home = () => {

    const {width} = useViewport();
    const isDesktop = width > 835;

    return (
        <div className={styles.container}>
            {isDesktop && <div className={styles.sidebar}>
                <Sidebar />
            </div>}
            <Topbar />
        </div>
    );
};

export default Home;