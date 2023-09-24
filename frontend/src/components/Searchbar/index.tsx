import styles from './styles.module.scss';
import searchIcon from '../../assets/search.svg';

const Searchbar = ({searchFn} : {
    searchFn?: (searchTerm: string) => void;
}) => {
    return (
        <div className={styles.container}>
            <label id='search'>
                <input type="text" placeholder=' ' onChange={(e) => searchFn?.(e.target.value as string)}/>
                <span>Search</span>
                <img src={searchIcon} alt='search icon'/>
            </label>
        </div>
    )
};

export default Searchbar;