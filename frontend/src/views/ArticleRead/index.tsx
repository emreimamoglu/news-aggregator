import ArticleReader from '@/components/ArticleReader';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Article } from '@/interfaces';
import ArticleService from '@/services/Article';
import { CircularProgress, IconButton } from '@mui/material';
import { ArrowLeftOutlined, KeyboardArrowLeft, KeyboardArrowLeftOutlined } from '@mui/icons-material';

const ArticleRead = () => {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const {
        query: { id },
    } = useRouter();

    const fetchArticle = async () => {
        setLoading(true);
        ArticleService.getInstance().getArticle({ article_id: id as string }).then((response) => {
            setArticle(response.data);
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleBackClick = () => {
        window.history.back();
    }

    useEffect(() => {
        if (id) {
            fetchArticle();
        }
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <IconButton onClick={handleBackClick}>
                    <KeyboardArrowLeftOutlined />
                    <p>Back</p>
                </IconButton>
            </div>
            <div className={styles.article}>
                {
                    article ? <ArticleReader article={article} /> : <CircularProgress />
                }
            </div>
        </div>
    )
};

export default ArticleRead;