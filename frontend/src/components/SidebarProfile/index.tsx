import { SidebarProfileProps } from "@/interfaces";
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import styles from './styles.module.scss';

const SidebarProfile = ({name} : SidebarProfileProps) => {

const getNameInitials = (name : string) => {
    const splitName = name.split(' ');
    const initials = splitName[0] + ' ' + splitName[1][0] + '.';
    return initials;
};
return(
    <div className={styles.container}>
        <p>{getNameInitials(name)}</p>
        <MoreVertOutlinedIcon/>
    </div>
)
};

export default SidebarProfile;