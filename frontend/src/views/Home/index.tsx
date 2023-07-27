import ArticleListWithReader from '@/components/ArticleListWithReader';
import styles from './styles.module.scss';
import { Article } from '@/interfaces';
import { useEffect, useState } from 'react';
import ArticleService from '@/services/Article';

const Home = () => {
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
                <h1>News</h1>
            </div>
            <div className={styles.body}>
                <ArticleListWithReader articles={articles} />
            </div>
        </div>
    )
};


export default Home;