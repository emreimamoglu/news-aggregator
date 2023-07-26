import { Article, ArticleListWithReaderProps } from '@/interfaces';
import styles from './styles.module.scss';
import ArticleCard from '../ArticleCard';
import ArticleReader from '../ArticleReader';
import { useState } from 'react';
import { FormControl, Input, InputAdornment, InputLabel, useMediaQuery } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const ArticleListWithReader = ({ articles, enableSearch=true }: ArticleListWithReaderProps) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    const md = useMediaQuery('(min-width: 1050px)');

    return (
        <div className={styles.container}>
            <div className={styles.articleList}>
                {
                    enableSearch && (
                        <FormControl fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
                            <Input
                                id="standard-adornment-search"
                                startAdornment={<InputAdornment position="start">
                                    <SearchOutlinedIcon />
                                </InputAdornment>}
                            />
                        </FormControl>
                    )
                }
                {articles.map((article) => (
                    <ArticleCard article={article} />
                ))}
            </div>
            {
                md && <div className={styles.articleReader}>
                    <ArticleReader article={selectedArticle ?? articles[0]} />
                </div>
            }
        </div>
    )
};

export default ArticleListWithReader;