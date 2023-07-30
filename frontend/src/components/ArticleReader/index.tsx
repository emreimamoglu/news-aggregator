import { ArticleReaderProps } from '@/interfaces';
import styles from './styles.module.scss';
import format from 'date-fns/format';
import { parseISO } from 'date-fns';

const ArticleReader = ({ article }: ArticleReaderProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.imageAndInfo}>

                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://picsum.photos/200/300" alt="article" />
                </div>
                <div className={styles.info}>
                    <div className={styles.infoText}>Source</div>
                    <div className={styles.infoText}>{format(parseISO(article.published_at), 'yyyy/MM/dd')}</div>
                </div>
            </div>
            <div className={styles.article}>
                <h3 className={styles.title}>{article?.title || ''}</h3>
                <p className={styles.content}>{article?.content || ''}</p>
            </div>
        </div>
    );
};

export default ArticleReader;