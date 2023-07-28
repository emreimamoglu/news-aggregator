import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import styles from './styles.module.scss';
import { SearchRounded } from '@mui/icons-material';
import { Category, CategorySubscriptions, SectionListProps, Source, SourceSubscriptions } from '@/interfaces';
import { useEffect, useState } from 'react';
import SubscriptionService from '@/services/Subscription';
import { useUserContext } from '@/contexts/User';
import { useSnackbar } from 'notistack';

const SelectionList = ({ type, items }: SectionListProps) => {
    const [checked, setChecked] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');
    const [sources, setSources] = useState<Source[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    const { user } = useUserContext();
    const { enqueueSnackbar } = useSnackbar();

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearch(value);
    };

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            if (type === 'source' && user)
                SubscriptionService.getInstance().subscribeToSource({ user_id: user.id, source_id: value }).then((res) => {
                    enqueueSnackbar("Successfully subscribed to the source", { variant: 'success' });
                });
            if (type === 'category' && user)
                SubscriptionService.getInstance().subscribeToCategory({ user_id: user.id, category_id: value }).then((res) => {
                    enqueueSnackbar("Successfully subscribed to the category", { variant: 'success' });
                });;
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
            if (type === 'source' && user)
                // @ts-ignore
                SubscriptionService.getInstance().unsubscribeFromSource({ source_id: sources.find((s : any) => s.source_id === value).id}).then((res) => {
                    enqueueSnackbar("Successfully unsubscribed from the source", { variant: 'success' });
                });;
            if (type === 'category' && user)
                // @ts-ignore
                SubscriptionService.getInstance().unsubscribeFromCategory({ category_id: categories.find((s : any) => s.category_id === value).id}).then((res) => {
                    enqueueSnackbar("Successfully unsubscribed from the category", { variant: 'success' });
                }
                );;
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        if (type === 'source' && user) {
            SubscriptionService.getInstance().getSourceSubscriptions().then((res) => {
                setSources(res.data);
                setChecked(res.data.map((source : SourceSubscriptions) => source.source_id));
            });
        }
        if (type === 'category' && user) {
            SubscriptionService.getInstance().getCategorySubscriptions().then((res) => {
                setCategories(res.data);
                setChecked(res.data.map((category : CategorySubscriptions) => category.category_id));
            });
        }
    }, []);

    return (
        <List
            className={styles.list}
            subheader={<ListSubheader>
                <p>Select {type}</p>
                <TextField onChange={handleTextChange} placeholder={`Search ${type}`} InputProps={{
                    startAdornment: (
                        <SearchRounded />
                    )
                }} />
            </ListSubheader>}
        >
            {
                items.filter(i => i.name.includes(search)).map((item) => (
                    <ListItem>
                        <ListItemText id={`search-list-item-${item.id}`} primary={item.name} />
                        <Switch
                            edge="end"
                            onChange={handleToggle(item.id)}
                            checked={checked.indexOf(item.id) !== -1}
                        />
                    </ListItem>
                ))
            }
        </List>
    );
};

export default SelectionList;