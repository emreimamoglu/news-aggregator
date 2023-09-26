import styles from './styles.module.scss';
import Searchbar from '../Searchbar';
import classnames from 'classnames';
import { useViewport } from '../../hooks/useViewport';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

interface HeaderProps {
    searchFn?: (searchTerm: string) => void;
}


const Header = ({ searchFn }: HeaderProps) => {
    const { width } = useViewport();
    const navigate = useNavigate();

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
                        {(false ? (<></>) : (
                            <div className={styles.imgPlaceholder}>
                                EI
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Header;