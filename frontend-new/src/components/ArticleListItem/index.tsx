import saveIcon from '../../assets/save.svg';
import shareIcon from '../../assets/share.svg';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';

interface ArticleListItemProps {
    article: any;
};

const ArticleListItem = ({ article }: ArticleListItemProps) => {
    const {width} = useViewport();

    return (
        <div className={styles.article}>
            <div className={styles.description}>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.footer}>
                    <div className={styles.infos}>
                        <p>Dec 30 2021</p>
                        <p>EuroNews</p>
                        <p>4 min read</p>
                    </div>
                   {width && width > 600 && <div className={styles.icons}>
                        <img src={saveIcon} alt="save icon" />
                        <img src={shareIcon} alt="share icon" />
                    </div>}
                </div>
            </div>
            <div className={styles.image}>
                <img src="https://picsum.photos/200/300" alt="article" />
            </div>
        </div>
    )
};

export default ArticleListItem;