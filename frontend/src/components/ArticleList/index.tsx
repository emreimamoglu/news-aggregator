import { ArticleListProps } from '../../types/Article';
import ArticleListItem from '../ArticleListItem';
import styles from './styles.module.scss';

const ArticleList = ({articles} : ArticleListProps) => {

    return (
        <div className={styles.articleList}>
            {articles.map((article) => (
                <ArticleListItem article={article} key={article.id}/>
            ))}
        </div>
    )
};

export default ArticleList;

