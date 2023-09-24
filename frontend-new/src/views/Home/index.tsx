import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useQuery } from 'react-query';
import ArticleService from '../../services/Article';
import { ArticleQueryParams } from '../../types/Article';
import { useState } from 'react';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const { width } = useViewport();

    const { data, isSuccess } = useQuery({
        queryKey: ["my-news",searchTerm],
        queryFn: () => ArticleService.getInstance().getCustomFeed({
            ...(searchTerm.length > 0 ? { search: searchTerm } : {}),
        } as ArticleQueryParams),
    })

    const handleSearch = (term : string) => { 
        setSearchTerm(term);
    };

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>My News</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar searchFn={handleSearch}/>}
                    </div>
                </div>
                {isSuccess && <div className={styles.news}>
                    <ArticleList articles={data.data.data} />
                </div>}

            </div>
        </div>
    )
};

export default Home;