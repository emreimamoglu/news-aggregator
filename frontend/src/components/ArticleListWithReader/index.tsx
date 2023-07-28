import { Article, ArticleListWithReaderProps, Category, SavedArticle, Source } from '@/interfaces';
import styles from './styles.module.scss';
import ArticleCard from '../ArticleCard';
import ArticleReader from '../ArticleReader';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Drawer, FormControl, IconButton, Input, InputAdornment, InputLabel, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Modal, Switch, TextField, Typography, useMediaQuery } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Pagination from '../Pagination';
import ArticleService from '@/services/Article';
import { useUserContext } from '@/contexts/User';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SubscriptionService from '@/services/Subscription';


const ArticleListWithReader = ({ articles, enableSearch, currentPage, lastPage, callback, setSearch, setCategoryIds, setSourceIds }: ArticleListWithReaderProps) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
    const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
    const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [checkedSources, setCheckedSources] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [sources, setSources] = useState<Source[]>([]);
    const [search, setSearchValue] = useState<string>("");



    const { user } = useUserContext();

    const md = useMediaQuery('(min-width: 1050px)');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSearch?.(event.target.value)

    const fetchSavedArticles = async () => {
        if (!user) return;
        ArticleService.getInstance().getSavedArticleIds().then((response) => {
            setSavedArticles(response.data);
        });
    }

    const fetchCategoriesAndSources = () => {
        if (!user) return;
        SubscriptionService.getInstance().getCategories().then((response) => {
            setCategories(response.data);
        });
        SubscriptionService.getInstance().getSources().then((response) => {
            setSources(response.data);
        });
    };

    const handleToggleCategory = (value: string) => () => {
        const currentIndex = checkedCategories.indexOf(value);
        const newChecked = [...checkedCategories];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedCategories(newChecked);
    };

    const handleToggleSource = (value: string) => () => {
        const currentIndex = checkedSources.indexOf(value);
        const newChecked = [...checkedSources];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setCheckedSources(newChecked);
    };

    const applyFilter = () => {
        setFilterModalOpen(false);

        if (setCategoryIds && setSourceIds && setSearch) {
            setSearch(search);
            setCategoryIds(checkedCategories);
            setSourceIds(checkedSources);
        }
    };

    useEffect(() => {
        fetchSavedArticles();
        fetchCategoriesAndSources();
    }, [])

    return (
        <div className={styles.container}>
            {
                enableSearch && (
                    <div className={styles.filterBox}>
                        <IconButton onClick={() => setFilterModalOpen(true)}>
                            <TuneOutlinedIcon />
                        </IconButton>
                    </div>
                )
            }
            <div className={styles.body}>
                <div className={styles.articleList}>

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
            <Modal
                open={filterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal}>
                    <div className={styles.modalSearch}>
                        <p>Search: </p>
                        <TextField size='small' value={search} onChange={(e) => setSearchValue(e.target.value)} />
                    </div>
                    <div className={styles.categoryList}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            subheader={<ListSubheader>Categories</ListSubheader>}
                        >
                            {
                                categories.map((category) => (
                                    <ListItem>
                                        <ListItemText id={`switch-list-category-${category.id}`} primary={category.name} />
                                        <Switch
                                            edge="end"
                                            onChange={handleToggleCategory(category.id)}
                                            checked={checkedCategories.indexOf(category.id) !== -1}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                    <div className={styles.sourceList}>

                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            subheader={<ListSubheader>Sources</ListSubheader>}
                        >
                            {
                                sources.map((source) => (
                                    <ListItem>
                                        <ListItemText id={`switch-list-source-${source.id}`} primary={source.name} />
                                        <Switch
                                            edge="end"
                                            onChange={handleToggleSource(source.id)}
                                            checked={checkedSources.indexOf(source.id) !== -1}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>

                    </div>
                    <div className={styles.applyButton} onClick={applyFilter}>
                        <button>Apply</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
};

export default ArticleListWithReader;