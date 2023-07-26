import { SidebarProfileProps } from "@/interfaces";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import styles from './styles.module.scss';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { sidebarProfileRoutes } from "../routes";

const SidebarProfile = ({ name }: SidebarProfileProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const getNameInitial = (name: string) => {
        const splitName = name.split(' ');
        const initial = splitName[0];
        return initial;
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.container} onClick={handleClick}>
            <p>{getNameInitial(name)}</p>
            <IconButton>
                <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    sidebarProfileRoutes.map((route) => (
                        <MenuItem onClick={handleClose}>{route.name}</MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
};

export default SidebarProfile;