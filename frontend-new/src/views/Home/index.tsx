import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useQuery } from 'react-query';
import ArticleService from '../../services/Article';
import { ArticleQueryParams } from '../../types/Article';

const Home = () => {

    const { width } = useViewport();
    const handleSearch = () => { };

    const { data } = useQuery({
        queryKey: ["my-news"],
        queryFn: () => ArticleService.getInstance().getCustomFeed({} as ArticleQueryParams),
    })

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>My News</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar />}
                    </div>
                </div>
                {data && <div className={styles.news}>
                    <ArticleList articles={data.data.data} />
                </div>}

            </div>
        </div>
    )
};

export default Home;