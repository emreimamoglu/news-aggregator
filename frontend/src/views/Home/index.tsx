import ArticleListWithReader from '@/components/ArticleListWithReader';
import styles from './styles.module.scss';
import { Article } from '@/interfaces';
import { useEffect, useState } from 'react';
import ArticleService from '@/services/Article';

const Home = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);

    const fetchArticles = async (page : number) => {
        setLoading(true);
        ArticleService.getInstance().getArticles({page : page.toString()}).then((response) => {
            setArticles(response.data.data);
            setLastPage(response.data.total);
            setLoading(false);
        });
        setCurrentPage(page);
    };
    
    useEffect(() => {
        fetchArticles(currentPage);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>News</h1>
            </div>
            <div className={styles.body}>
                <ArticleListWithReader articles={articles} currentPage={currentPage} lastPage={lastPage} callback={fetchArticles}/>
            </div>
        </div>
    )
};


export default Home;