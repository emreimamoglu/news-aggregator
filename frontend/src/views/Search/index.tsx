import ArticleListWithReader from '@/components/ArticleListWithReader';
import styles from './styles.module.scss';
import { Article } from '@/interfaces';
import ArticleService from '@/services/Article';
import { useState, useEffect } from 'react';

const Search = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        setLoading(true);
        ArticleService.getInstance().getArticles({}).then((response) => {
            setArticles(response.data.data);
            setLoading(false);
        });
    },[])
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Search News</h1>
            </div>
            <div className={styles.body}>
                <ArticleListWithReader enableSearch articles={articles} />
            </div>
        </div>
    )
};


export default Search;