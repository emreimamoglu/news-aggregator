import Searchbar from '../../components/Searchbar';
import { useViewport } from '../../hooks/useViewport';
import filterIcon from '../../assets/filter.svg';
import styles from './styles.module.scss';
import ArticleList from '../../components/ArticleList';
import Header from '../../components/Header';
import { useState } from 'react';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import classnames from 'classnames';
import Chip from '../../components/Chip';
import closeIcon from '../../assets/close.svg';

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
                <div className={styles.header}>
                    <img src={closeIcon} alt='close icon' onClick={toggleFilter} />
                    <h2>Filter</h2>
                </div>
                <div className={styles.filterSections}>
                    <div className={styles.filterSection}>
                        <h3>Categories</h3>
                        <div className={styles.chips}>
                            <Chip label='All' selected />
                            <Chip label='Politics' />
                            <Chip label='Sports' />
                            <Chip label='Entertainment' />
                            <Chip label='Technology' />
                            <Chip label='Science' />
                            <Chip label='Business' />
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <h3>Sources</h3>
                        <div className={styles.chips}>
                            <Chip label='All' selected />
                            <Chip label='CNN' />
                            <Chip label='BBC' />
                            <Chip label='Fox News' />
                            <Chip label='The New York Times' />
                            <Chip label='The Washington Post' />
                        </div>
                    </div>
                </div>
            </aside>


        </div>
    )
};

export default News;