import { ArticleCardProps } from "@/interfaces";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import styles from './styles.module.scss';
import { IconButton } from "@mui/material";

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <div className={styles.card}>
            <img src={article.imate_url} className={styles.cardImage} alt="article photo" />
            <div className={styles.cardBody}>
                <div className={styles.bookmark}>
                    <IconButton>
                        <BookmarkBorderOutlinedIcon />
                    </IconButton>
                </div>
                <h5 className={styles.title}>{article.title}</h5>
                <div className={styles.info}>
                    <p className={styles.infoText}>{article.source}</p>
                    <p className={styles.infoText}>{article.published_at}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;