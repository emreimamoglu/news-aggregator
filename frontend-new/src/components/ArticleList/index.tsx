import ArticleListItem from '../ArticleListItem';
import styles from './styles.module.scss';

const ArticleList = () => {

    const article = {
        title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt odio earum quisquam sint omnis quos magni eligendi nihil distinctio molestias."
    }
    return (
        <div className={styles.articleList}>
            {Array.from({ length: 30 }).map((_, index) => (
                <ArticleListItem article={article} key={index}/>
            ))}
        </div>
    )
};

export default ArticleList;

