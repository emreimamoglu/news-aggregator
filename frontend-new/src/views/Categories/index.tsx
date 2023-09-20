import { useQuery } from 'react-query';
import Header from '../../components/Header';
import Searchbar from '../../components/Searchbar';
import SubscriptionList from '../../components/SubscriptionList';
import { useViewport } from '../../hooks/useViewport';
import SubscriptionService from '../../services/Subscription';
import styles from './styles.module.scss';


const Categories = () => {

    const { width } = useViewport();

    const handleSearch = () => { };

    const { data, isSuccess } = useQuery({
        queryKey: ["categories"],
        queryFn: () => SubscriptionService.getInstance().getCategories(),
    })
    
    return (
        <div className={styles.container}>
            {width && width > 835 && <Header searchFn={handleSearch}/>}
            <div className={styles.content}>
                <div className={styles.title}>
                    <h1>Categories</h1>
                    {width && width < 836 && <Searchbar />}
                </div>
                {isSuccess && <SubscriptionList data={data.data}/>}
            </div>
        </div>
    )
};

export default Categories;