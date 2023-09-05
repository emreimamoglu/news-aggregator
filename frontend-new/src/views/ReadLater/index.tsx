import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';

const ReadLater = () => {

    const { width } = useViewport();

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Saved Articles</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar />}
                    </div>
                </div>
                <div className={styles.news}>
                    <ArticleList/>
                </div>

            </div>
        </div>
    )
};

export default ReadLater;