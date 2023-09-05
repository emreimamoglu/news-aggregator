import styles from './styles.module.scss';
import classnames from 'classnames';

interface ChipProps {
    label: string;
    selected?: boolean;
}
const Chip = ({ label, selected }: ChipProps) => {
    return (
        <div className={classnames(styles.chip, {
            [styles.selected]: selected
        })}>
            <p>{label}</p>
        </div>
    )
};

export default Chip;