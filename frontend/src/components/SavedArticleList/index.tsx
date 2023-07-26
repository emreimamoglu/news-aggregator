import { ArticleListProps } from '@/interfaces';
import styles from './styles.module.scss';
import ArticleCard from '../ArticleCard';

const SavedArticleList = ({ articles }: ArticleListProps) => { 

    return (
        <div className={styles.container}>
            {
                articles.map((article) => (
                    <ArticleCard article={article}/>
                ))
            }
        </div>
    )
};

export default SavedArticleList;