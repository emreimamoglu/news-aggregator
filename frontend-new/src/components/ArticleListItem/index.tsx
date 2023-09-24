import { useMutation } from '@tanstack/react-query';
import saveIcon from '../../assets/save.svg';
import savedIcon from '../../assets/saved.svg';
import shareIcon from '../../assets/share.svg';
import { useViewport } from '../../hooks/useViewport';
import { Article } from '../../types/Article';
import styles from './styles.module.scss';
import ArticleService from '../../services/Article';
import { useUserContext } from '../../contexts/UserContext';


export interface ExtendedArticle extends Article {
    isSaved : boolean
}
interface ArticleListItemProps {
    article: ExtendedArticle;
};

const ArticleListItem = ({ article }: ArticleListItemProps) => {
    const { width } = useViewport();
    const { user } = useUserContext();

    const { mutateAsync: saveArticle } = useMutation({
        mutationFn: ({ article_id }: { article_id: string }) => ArticleService.getInstance().saveArticle({
            article_id: article_id,
            user_id: user?.id as string
        }),
    })

    const { mutateAsync: unsaveArticle } = useMutation({
        mutationFn: ({ article_id }: { article_id: string }) => ArticleService.getInstance().unsaveArticle({
            article_id: article_id,
        }),
    })

    const saveUnsaveArticle = async () => {
        try {
            if(article.isSaved){
                await unsaveArticle({
                    article_id: article.id
                });
            }else{
                await saveArticle({
                    article_id: article.id
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.article}>
            <div className={styles.description}>
                <h3 className={styles.title}>{article.title}</h3>
                <div className={styles.footer}>
                    <div className={styles.infos}>
                        <p>Dec 30 2021</p>
                        <p>{article.source_name}</p>
                        <p>4 min read</p>
                    </div>
                    {width && width > 600 && <div className={styles.icons}>
                        {
                            article.isSaved ? <img src={savedIcon} alt="saved icon" onClick={saveUnsaveArticle} /> : <img src={saveIcon} alt="save icon" onClick={saveUnsaveArticle} />
                        }
                        <img src={shareIcon} alt="share icon" />
                    </div>}
                </div>
            </div>
            <div className={styles.image}>
                <img src={article.image_url} alt="article" />
            </div>
        </div>
    )
};

export default ArticleListItem;