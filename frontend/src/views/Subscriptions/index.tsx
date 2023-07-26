import SelectionList from '@/components/SelectionList';
import styles from './styles.module.scss';
const Subscriptions = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Subscriptions</h1>
            </div>
            <div className={styles.subscriptionsContainer}>
                <div className={styles.sources}>
                    <SelectionList type='source' items={
                        [
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                            {
                                id: '1',
                                name: 'Source 1'
                            },
                        ]} />
                </div>

                <div className={styles.categories}>
                    <SelectionList type='category' items={[]} />
                </div>
            </div>
        </div>
    )
};

export default Subscriptions;