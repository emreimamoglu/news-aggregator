import { useUserContext } from '@/contexts/User';
import styles from './styles.module.scss';
import { SettingsOutlined, SettingsRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { Article, SavedArticle } from '@/interfaces';
import SavedArticleList from '@/components/SavedArticleList';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import ArticleService from '@/services/Article';

const Profile = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    const { user } = useUserContext();
    const router = useRouter();

    const handleSettingsClick = () => {
        router.push('/settings');
    };


    const fetchSavedArticles = async () => {
        ArticleService.getInstance().getSavedArticlesList().then((response) => {
            setArticles(response.data);
        });
    }

    useEffect(() => {
        fetchSavedArticles();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.username}>{user?.name}</p>
                <div className={styles.settings} onClick={handleSettingsClick}>
                    <SettingsOutlined />
                    <p>Settings</p>
                </div>
                <h2>Saved News</h2>
            </div>
            <div className={styles.body}>
                <SavedArticleList articles={articles} fetchSavedArticles={fetchSavedArticles}/>
            </div>
        </div>
    )
};

export default Profile;