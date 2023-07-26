import { useUserContext } from '@/contexts/User';
import styles from './styles.module.scss';
import { SettingsOutlined, SettingsRounded } from '@mui/icons-material';
import { useState } from 'react';
import { Article } from '@/interfaces';
import SavedArticleList from '@/components/SavedArticleList';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';

const Profile = () => {
    const [articles, setArticles] = useState<Article[]>([]);

    const { user } = useUserContext();
    const router = useRouter();

    const handleSettingsClick = () => {
        router.push('/settings');
    };

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
                <SavedArticleList articles={[
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    },
                    {
                        id: '1',
                        title: 'Article 1asdasdasdsadsadsdsadsadasdasdsadsadasdasd',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        image_url: 'https://picsum.photos/200/300',
                        source: 'Source 1',
                        published_at: '2023-07-24',
                        url: 'https://picsum.photos/200/300',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
                        author: 'Author 1',
                        category: 'Category 1',
                    }
                ]} />
            </div>
        </div>
    )
};

export default Profile;