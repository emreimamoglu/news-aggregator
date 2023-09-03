import styles from './styles.module.scss';

const SubscriptionList = () => {
    return (
        <div className={styles.subscriptions}>
            {
                Array.from({ length: 30 }).map((_, index) => (
                    <div key={index} className={styles.subscription}>
                        <div className={styles.info}>
                            <p>The Verge</p>
                            <p>theverge.com</p>
                        </div>
                        <div className={styles.button}>
                            <button>Subscribe</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
};

export default SubscriptionList;