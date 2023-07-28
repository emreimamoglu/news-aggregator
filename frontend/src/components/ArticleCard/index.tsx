import { ArticleCardProps } from "@/interfaces";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import styles from './styles.module.scss';
import { IconButton } from "@mui/material";
import ArticleService from "@/services/Article";
import { useSnackbar } from "notistack";
import { useUserContext } from "@/contexts/User";
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ArticleCard = ({ article,savedArticles, fetchSavedArticles, setSelectedArticle }: ArticleCardProps) => {
    const {enqueueSnackbar} = useSnackbar();
    const {user} = useUserContext();

    const savedArticle = savedArticles.find(s => s.article_id === article.id);

    const handleArticleSaveClick = () => {
        if(savedArticle)
        ArticleService.getInstance().unsaveArticle({article_id : savedArticle.id}).then(() => {
            enqueueSnackbar("Article unsaved", {variant : "success"});
            fetchSavedArticles();
        });

        if(!savedArticle && user)
        ArticleService.getInstance().saveArticle({article_id : article.id,user_id : user?.id}).then(() => {
            enqueueSnackbar("Article saved", {variant : "success"});
            fetchSavedArticles();
        });
    };
    
    const handleCardClick = () => {
        if(setSelectedArticle)
        setSelectedArticle(article);
    }
    

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <img src={article.image_url} className={styles.cardImage} alt="article photo"/>
            <div className={styles.cardBody}>
                <div className={styles.bookmark}>
                    <IconButton onClick={handleArticleSaveClick}>
                        {
                            savedArticles.some(s => s.article_id === article.id) ? (<BookmarkIcon/>) : (<BookmarkBorderOutlinedIcon/>)
                        }
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