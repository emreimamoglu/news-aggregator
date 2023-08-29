import Sidebar from '../../components/Sidebar';
import styles from './styles.module.scss';

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
        </div>
    );
};

export default Home;