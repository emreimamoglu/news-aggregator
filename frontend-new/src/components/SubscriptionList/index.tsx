import { Category, Source } from '../../types/Article';
import classnames from 'classnames';
import styles from './styles.module.scss';

export interface ExtendedSource extends Source{
    isSubscribed: boolean
}

export interface ExtendedCategory extends Category{
    isSubscribed: boolean
}

type SubscriptionListProps = {
    data: ExtendedSource[] | ExtendedCategory[]
    subscribeFn: (id: string, subscribed : boolean) => Promise<void>
}

const SubscriptionList = ({ data, subscribeFn }: SubscriptionListProps) => {
    
    return (
        <div className={styles.subscriptions}>
            {
                data.map((item) => (
                    <div key={item.id} className={classnames(styles.subscription,{
                        [styles.subscribed]: item.isSubscribed
                    })}>
                        <div className={styles.info}>
                            <p>{item.name}</p>
                            <p>theverge.com</p>
                        </div>
                        <div className={styles.button}>
                            <button onClick={() => subscribeFn(item.id,item.isSubscribed)}>{item.isSubscribed ? 'Unsubscribe' : 'Subscribe'}</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default SubscriptionList;