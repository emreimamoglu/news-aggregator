import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import filterIcon from '../../assets/filter.svg';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';

const News = () => {

    const { width } = useViewport();

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>News</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar />}
                        <img src={filterIcon} alt='filter icon' />
                    </div>
                </div>
                <div className={styles.news}>
                    <ArticleList/>
                </div>

            </div>
        </div>
    )
};

export default News;