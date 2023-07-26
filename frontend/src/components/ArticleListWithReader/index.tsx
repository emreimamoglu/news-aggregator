import { Article, ArticleListWithReaderProps } from '@/interfaces';
import styles from './styles.module.scss';
import ArticleCard from '../ArticleCard';
import ArticleReader from '../ArticleReader';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';


const ArticleListWithReader = ({ articles, enableSearch }: ArticleListWithReaderProps) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const md = useMediaQuery('(min-width: 1050px)');

    return (
        <div className={styles.container}>
            <div className={styles.articleList}>
                {articles.map((article) => (
                    <ArticleCard article={article} />
                ))}
            </div>
            {
                md && <div className={styles.articleReader}>
                    <ArticleReader article={selectedArticle ?? articles[0]} />
                </div>
            }
        </div>
    )
};

export default ArticleListWithReader;