import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';

const Home = () => {

    const { width } = useViewport();
    const { user } = useUserContext();
    const handleSearch = () => { };

    console.log(user);

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>My News</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar />}
                    </div>
                </div>
                <div className={styles.news}>
                    <ArticleList />
                </div>

            </div>
        </div>
    )
};

export default Home;