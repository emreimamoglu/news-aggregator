import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import filterIcon from '../../assets/filter.svg';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import classnames from 'classnames';

const News = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const { width } = useViewport();
    const ref = useOutsideClick(() => setFilterOpen(false));

    const handleSearch = (query: string) => { };

    const toggleFilter = () => {
        setFilterOpen((prev) => !prev);
    };

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>News</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar />}
                        <img src={filterIcon} alt='filter icon' onClick={toggleFilter} />
                    </div>
                </div>
                <div className={styles.news}>
                    <ArticleList />
                </div>
            </div>
            <aside className={classnames(styles.filterSidebar, {
                [styles.filterSidebarOpen]: filterOpen
            })} ref={ref}>
                
            </aside>


        </div>
    )
};

export default News;