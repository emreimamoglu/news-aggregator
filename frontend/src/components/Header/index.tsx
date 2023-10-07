import styles from './styles.module.scss';
import Searchbar from '../Searchbar';
import classnames from 'classnames';
import { useViewport } from '../../hooks/useViewport';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';
import { useUserContext } from '../../contexts/UserContext';
import { getFirstLetter } from '../../utils';

interface HeaderProps {
    searchFn?: (searchTerm: string) => void;
}


const Header = ({ searchFn }: HeaderProps) => {
    const { width } = useViewport();
    const navigate = useNavigate();
    const { user } = useUserContext();

    const handleLogoClick = () => {
        navigate(Routes.SETTINGS);
    };

    return (
        <div className={(styles.header)}>
            <div className={classnames(styles.searchAndImage, {
                [styles.noSearch]: !searchFn
            })}>
                {searchFn && <div className={styles.search}>
                    <Searchbar searchFn={searchFn} />
                </div>}
                {width && width > 835 &&
                    <div onClick={handleLogoClick}>
                        {(user?.avatar?.url ? (<img className={styles.image} src={user?.avatar?.url}/>) : (
                            <div className={styles.imgPlaceholder}>
                                {user?.name && getFirstLetter(user?.name)}
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;