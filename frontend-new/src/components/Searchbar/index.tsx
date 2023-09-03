import styles from './styles.module.scss';
import searchIcon from '../../assets/search.svg';

const Searchbar = () => {
    return (
        <div className={styles.container}>
            <label id='search'>
                <input type="text" placeholder=' ' />
                <span>Search</span>
                <img src={searchIcon} alt='search icon'/>
            </label>
        </div>
    )
};

export default Searchbar;