import Searchbar from '../../components/Searchbar';
import SubscriptionList from '../../components/SubscriptionList';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';


const Sources = () => {

    const { width } = useViewport();

    return (
        <div className={styles.container}>
            {width && width > 835 && <div className={styles.header}>
                <div className={styles.searchAndImage}>
                    <div className={styles.search}>
                        <Searchbar />
                    </div>
                    {
                        false ? (<></>) : (
                            <div className={styles.imgPlaceholder}>
                                EI
                            </div>
                        )
                    }
                </div>
            </div>}
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