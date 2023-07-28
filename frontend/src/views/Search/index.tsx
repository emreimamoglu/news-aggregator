import ArticleListWithReader from '@/components/ArticleListWithReader';
import styles from './styles.module.scss';
import { Article } from '@/interfaces';
import ArticleService from '@/services/Article';
import { useState, useEffect } from 'react';

const Search = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [categoryIds, setCategoryIds] = useState<string[]>([]);
    const [sourceIds, setSourceIds] = useState<string[]>([]);


    const fetchArticles = async (page: number) => {
        setLoading(true);
        ArticleService.getInstance().getArticles({ page: page.toString(), search: search, category_ids: categoryIds.toString(), source_ids : sourceIds.toString() }).then((response) => {
            setArticles(response.data.data);
            setLastPage(response.data.total);
            setLoading(false);
        });
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchArticles(currentPage);
    }, [search,categoryIds,sourceIds]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Search News</h1>
            </div>
            <div className={styles.body}>
                <ArticleListWithReader enableSearch articles={articles} currentPage={currentPage} lastPage={lastPage} callback={fetchArticles} setSearch={setSearch} setCategoryIds={setCategoryIds} setSourceIds={setSourceIds}/>
            </div>
        </div>
    )
};


export default Search;