import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import styles from './styles.module.scss';
import { SearchRounded } from '@mui/icons-material';
import { SectionListProps } from '@/interfaces';

const SelectionList = ({ type, items }: SectionListProps) => {

    const [checked, setChecked] = React.useState(['wifi']);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    return (
        <List
            className={styles.list}
            subheader={<ListSubheader>
                <p>Select {type}</p>
                <TextField placeholder={`Search ${type}`} InputProps={{
                    startAdornment: (
                        <SearchRounded />
                    )
                }} />
            </ListSubheader>}
        >
            {
                items.map((item) => (
                    <ListItem>
                        <ListItemText id={`search-list-item-${item.id}`} primary={item.name} />
                        <Switch
                            edge="end"
                            onChange={handleToggle(item.name)}
                            checked={checked.indexOf(item.name) !== -1}
                        />
                    </ListItem>
                ))
            }
        </List>
    );
};

export default SelectionList;