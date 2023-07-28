import SelectionList from '@/components/SelectionList';
import styles from './styles.module.scss';
import { Category, Source } from '@/interfaces';
import { useEffect, useState } from 'react';
import SubscriptionService from '@/services/Subscription';


const Subscriptions = () => {
    const [sources, setSources] = useState<Source[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(()=>{
        Promise.all([
            SubscriptionService.getInstance().getSources(),
            SubscriptionService.getInstance().getCategories()
        ]).then(([sources,categories]) => {
            setSources(sources.data);
            setCategories(categories.data);
        }    
        )
    },[])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Subscriptions</h1>
            </div>
            <div className={styles.subscriptionsContainer}>
                <div className={styles.sources}>
                    <SelectionList type='source' items={sources} />
                </div>

                <div className={styles.categories}>
                    <SelectionList type='category' items={categories} />
                </div>
            </div>
        </div>
    )
};

export default Subscriptions;