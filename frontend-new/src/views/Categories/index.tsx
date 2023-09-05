import Header from '../../components/Header';
import Searchbar from '../../components/Searchbar';
import SubscriptionList from '../../components/SubscriptionList';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';


const Categories = () => {

    const { width } = useViewport();

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Categories</h1>
                    {width && width < 836 && <Searchbar />}
                </div>
                <SubscriptionList />
            </div>
        </div>
    )
};

export default Categories;