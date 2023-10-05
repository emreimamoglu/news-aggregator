import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useQuery } from '@tanstack/react-query';
import ArticleService from '../../services/Article';
import { Article } from '../../types/Article';
import { ExtendedArticle } from '../../components/ArticleListItem';
import { useState } from 'react';

const ReadLater = () => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);

    const { width } = useViewport();
    const { data } = useQuery({
        queryKey: ["saved-articles"],
        queryFn: () => ArticleService.getInstance().getSavedArticlesList(),
    })

    const handleSearch = (search: string) => {
        setSearchTerm(search);
    };

    const applySearch = (articles: Article[]): Article[] => {
        if (!searchTerm) return articles;
        return articles.filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
    };

    const addSavedField = (articles: Article[]): ExtendedArticle[] => {
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
                    <ArticleList articles={addSavedField(applySearch(data.data))} />
                </div>}

            </div>
        </div>
    )
};

export default ReadLater;