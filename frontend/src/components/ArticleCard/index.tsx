import { ArticleCardProps } from "@/interfaces";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import styles from './styles.module.scss';
import { IconButton, useMediaQuery } from "@mui/material";
import ArticleService from "@/services/Article";
import { useSnackbar } from "notistack";
import { useUserContext } from "@/contexts/User";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useRouter } from "next/router";
import { format, parseISO } from "date-fns";

const ArticleCard = ({ article,savedArticles, fetchSavedArticles, setSelectedArticle }: ArticleCardProps) => {
    const {enqueueSnackbar} = useSnackbar();
    const {user} = useUserContext();
    const router = useRouter();
    const md = useMediaQuery('(min-width: 1050px)');

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
        if(setSelectedArticle && md)
        setSelectedArticle(article);

        if(!md)
        router.push(`/article-read/${article.id}`);
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
                    <p className={styles.infoText}>{format(parseISO(article.published_at), 'yyyy/MM/dd')}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;