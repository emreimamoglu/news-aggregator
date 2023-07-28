import { Article, ArticleListWithReaderProps, SavedArticle } from '@/interfaces';
import styles from './styles.module.scss';
import ArticleCard from '../ArticleCard';
import ArticleReader from '../ArticleReader';
import { ChangeEvent, useEffect, useState } from 'react';
import { FormControl, Input, InputAdornment, InputLabel, useMediaQuery } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Pagination from '../Pagination';
import ArticleService from '@/services/Article';
import { useUserContext } from '@/contexts/User';


const ArticleListWithReader = ({ articles, enableSearch, currentPage, lastPage, callback, setSearch }: ArticleListWithReaderProps) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);

    const { user } = useUserContext();

    const md = useMediaQuery('(min-width: 1050px)');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch?.(event.target.value)

    const fetchSavedArticles = async () => {
        if (!user) return;
        ArticleService.getInstance().getSavedArticleIds().then((response) => {
            setSavedArticles(response.data);
        });
    }

    useEffect(() => {
        fetchSavedArticles();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.articleList}>
                {/* {
                    enableSearch && (
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
                            <Input
                                id="standard-adornment-search"
                                startAdornment={<InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>}
                                onChange={handleChange}
                            />
                        </FormControl>
                    )
                } */}
                {articles.map((article) => (
                    <ArticleCard article={article} savedArticles={savedArticles} fetchSavedArticles={fetchSavedArticles} setSelectedArticle={setSelectedArticle} />
                ))}
                <div className={styles.pagination}>
                    <Pagination currentPage={currentPage} lastPage={lastPage} callback={callback} />
                </div>
            </div>
            {
                md && <div className={styles.articleReader}>
                    <ArticleReader article={selectedArticle ? selectedArticle : articles[0]} />
                </div>
            }
        </div>
    )
};

export default ArticleListWithReader;