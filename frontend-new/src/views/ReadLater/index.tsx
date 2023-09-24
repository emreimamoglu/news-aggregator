import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useQuery } from '@tanstack/react-query';
import ArticleService from '../../services/Article';
import { Article } from '../../types/Article';
import { ExtendedArticle } from '../../components/ArticleListItem';

const ReadLater = () => {

    const { width } = useViewport();

    const handleSearch = () => { };

    const { data } = useQuery({
        queryKey: ["saved-articles"],
        queryFn: () => ArticleService.getInstance().getSavedArticlesList(),
    })

    const addSavedField = (articles: Article[]) : ExtendedArticle[] => {
        return articles.map(article => {
            return {
                ...article,
                isSaved: true
            }
        })
    };

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Saved Articles</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar />}
                    </div>
                </div>
                {data && <div className={styles.news}>
                    <ArticleList articles={addSavedField(data.data)} />
                </div>}

            </div>
        </div>
    )
};

export default ReadLater;