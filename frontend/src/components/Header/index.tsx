import styles from './styles.module.scss';
import Searchbar from '../Searchbar';
import classnames from 'classnames';
import { useViewport } from '../../hooks/useViewport';

interface HeaderProps {
    searchFn?: (searchTerm: string) => void;
}

const Header = ({ searchFn }: HeaderProps) => {
    const { width } = useViewport();

    return (
        <div className={(styles.header)}>
            <div className={classnames(styles.searchAndImage,{
                [styles.noSearch]: !searchFn
            })}>
                {searchFn && <div className={styles.search}>
                    <Searchbar searchFn={searchFn}/>
                </div>}
                { width && width > 835 && 
                    (false ? (<></>) : (
                        <div className={styles.imgPlaceholder}>
                            EI
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Header;