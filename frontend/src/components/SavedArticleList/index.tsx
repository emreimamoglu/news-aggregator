import { ArticleListProps, SavedArticle } from '@/interfaces';
import styles from './styles.module.scss';
import ArticleCard from '../ArticleCard';
import { useEffect, useState } from 'react';
import ArticleService from '@/services/Article';

const SavedArticleList = ({ articles, fetchSavedArticles }: ArticleListProps) => {
    const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);

    const fetchSavedArticleIDs = async () => {
        ArticleService.getInstance().getSavedArticleIds().then((response) => {
            setSavedArticles(response.data);
        });
    };

    useEffect(() => {
        fetchSavedArticleIDs();
    },[articles]);

    return (
        <div className={styles.container}>
            {
                articles.map((article) => (
                    <ArticleCard article={article} fetchSavedArticles={fetchSavedArticles} savedArticles={savedArticles}/>
                ))
            }
        </div>
    )
};

export default SavedArticleList;