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
import { useQuery } from 'react-query';
import ArticleService from '../../services/Article';
import { ArticleQueryParams, Category, Source } from '../../types/Article';
import SubscriptionService from '../../services/Subscription';

const News = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [selectedSourceIds, setSelectedSourceIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");


    const { width } = useViewport();
    const ref = useOutsideClick(() => setFilterOpen(false));
    const { data } = useQuery({
        queryKey: ["news", selectedCategoryIds.join(","), selectedSourceIds.join(","), searchTerm],
        queryFn: () => ArticleService.getInstance().getArticles({
            ...(selectedCategoryIds.length > 0 ? { category_ids: selectedCategoryIds.join(",") } : {}),
            ...(selectedSourceIds.length > 0 ? { source_ids: selectedSourceIds.join(",") } : {}),
            ...(searchTerm.length > 0 ? { search: searchTerm } : {}),
        } as ArticleQueryParams),
    })

    const { data: categories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => SubscriptionService.getInstance().getCategories(),
    })

    const { data: sources } = useQuery({
        queryKey: ["sources"],
        queryFn: () => SubscriptionService.getInstance().getSources(),
    })

    const handleSearch = (term : string) => {
        setSearchTerm(term);
     };

    const toggleFilter = () => {
        setFilterOpen((prev) => !prev);
    };

    const selectUnselectCategory = (categoryId: string) => {
        if (selectedCategoryIds.includes(categoryId)) {
            setSelectedCategoryIds(prev => prev.filter(id => id !== categoryId));
        } else {
            setSelectedCategoryIds(prev => [...prev, categoryId]);
        }
    };

    const selectUnselectSource = (sourceId: string) => {
        if (selectedSourceIds.includes(sourceId)) {
            setSelectedSourceIds(prev => prev.filter(id => id !== sourceId));
        } else {
            setSelectedSourceIds(prev => [...prev, sourceId]);
        }
    };

    const resetCategories = () => {
        setSelectedCategoryIds([]);
    };

    const resetSources = () => {
        setSelectedSourceIds([]);
    };

    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch} />}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>News</h1>
                    <div className={styles.searchAndFilter}>
                        {width && width < 836 && <Searchbar searchFn={handleSearch}/>}
                        <img src={filterIcon} alt='filter icon' onClick={toggleFilter} />
                    </div>
                </div>
                {data && <div className={styles.news}>
                    <ArticleList articles={data.data.data} />
                </div>}
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
                            <Chip label='All' selected={selectedCategoryIds.length === 0} onClick={resetCategories} />
                            {
                                categories && categories.data.map((category: Category) => {
                                    return <Chip label={category.name} selected={selectedCategoryIds.includes(category.id)} key={category.id} onClick={() => selectUnselectCategory(category.id)} />
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.filterSection}>
                        <h3>Sources</h3>
                        <div className={styles.chips}>
                            <Chip label='All' selected={selectedSourceIds.length === 0} onClick={resetSources} />
                            {
                                sources && sources.data.map((source: Source) => {
                                    return <Chip label={source.name} selected={selectedSourceIds.includes(source.id)} key={source.id} onClick={() => selectUnselectSource(source.id)} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </aside>


        </div>
    )
};

export default News;