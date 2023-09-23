import { Category, Source } from '../../types/Article';
import classnames from 'classnames';
import styles from './styles.module.scss';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';

export interface ExtendedSource extends Source {
    isSubscribed: boolean
}

export interface ExtendedCategory extends Category {
    isSubscribed: boolean
}

type SubscriptionListProps = {
    data: ExtendedSource[] | ExtendedCategory[]
    subscribeFn: (id: string, subscribed: boolean) => Promise<void>
}

const SubscriptionList = ({ data, subscribeFn }: SubscriptionListProps) => {
    return (
        <div className={styles.subscriptions}>
            {
                data.map((item) => {
                    const [loading, setLoading] = useState(false);
                    return (
                        <div key={item.id} className={classnames(styles.subscription, {
                            [styles.subscribed]: item.isSubscribed,
                            [styles.loading]: loading
                        })}>
                            <div className={styles.info}>
                                <p>{item.name}</p>
                                <p>theverge.com</p>
                            </div>
                            <div className={styles.button}>
                                <button onClick={async() => {
                                    try {
                                        setLoading(true);
                                        await subscribeFn(item.id, item.isSubscribed)
                                        setLoading(false);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}>
                                    {loading ? <LoadingSpinner width={15} height={15} color='#FFF'/> : item.isSubscribed ? "Unsubscribe" : "Subscribe"}
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default SubscriptionList;