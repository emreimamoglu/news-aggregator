import { ArticleReaderProps } from '@/interfaces';
import styles from './styles.module.scss';

const ArticleReader = ({ article }: ArticleReaderProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageAndInfo}>

                <img className={styles.image} src="https://picsum.photos/200/300" alt="article" />

                <div className={styles.info}>
                    <div className={styles.infoText}>Source</div>
                    <div className={styles.infoText}>2023-07-24</div>
                </div>
            </div>
            <div className={styles.article}>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.content}>{article.content}</p>
            </div>
        </div>
    );
};

export default ArticleReader;