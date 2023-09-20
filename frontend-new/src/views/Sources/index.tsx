import { useQuery } from 'react-query';
import Header from '../../components/Header';
import Searchbar from '../../components/Searchbar';
import SubscriptionList from '../../components/SubscriptionList';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';


const Sources = () => {

    const { width } = useViewport();

    const handleSearch = () => { };
    
    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Sources</h1>
                    {width && width < 836 && <Searchbar />}
                </div>
                <SubscriptionList />
            </div>
        </div>
    )
};

export default Sources;