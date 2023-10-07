import classNames from 'classnames';
import minusIcon from '../../assets/minus.svg';
import plusIcon from '../../assets/plus.svg';
import styles from './styles.module.scss';
import withAuth from '../../components/withAuth';

const AppearanceSettings = () => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Appearance</h1>
            </div>
            <div className={styles.themeSelection}>
                <p>Color scheme</p>
                <div className={styles.themes}>
                    <div className={styles.light} />
                    <div className={styles.dark} />
                </div>
                <p>background color</p>
            </div>
            <div className={styles.fontSelection}>
                <p>Letter Size</p>

                <div className={styles.selectionContainer}>
                    <div className={styles.button}>
                        <div className={styles.text}>
                            <p>A</p>
                            <p>Smaller</p>
                        </div>
                        <img src={minusIcon} alt='minus' />
                    </div>
                    <div className={styles.percentage}><p>100%</p></div>
                    <div className={styles.button}>
                        <img src={plusIcon} alt='plus' />
                        <div className={classNames(styles.text,{
                            [styles.large]: true
                        })}>
                            <p>A</p>
                            <p>Larger</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(AppearanceSettings);