import ArticleListWithReader from '@/components/ArticleListWithReader';
import styles from './styles.module.scss';
import { Article } from '@/interfaces';


const articles: Article[] = [
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
        title: 'Article 2',
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
        title: 'Article 3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
        image_url: 'https://picsum.photos/200/300',
        source: 'Source 1',
        published_at: '2023-07-24',
        url: 'https://picsum.photos/200/300',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies aliquam, nisl nisl aliquet nisl, vitae ali',
        author: 'Author 1',
        category: 'Category 1',
    }
]
const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>News</h1>
            </div>
            <div className={styles.body}>
                <ArticleListWithReader articles={articles} />
            </div>
        </div>
    )
};


export default Home;