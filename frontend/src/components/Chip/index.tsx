import styles from './styles.module.scss';
import classnames from 'classnames';

interface ChipProps {
    label: string;
    selected?: boolean;
    onClick?: () => void;
}
const Chip = ({ label, selected, onClick }: ChipProps) => {
    return (
        <div className={classnames(styles.chip, {
            [styles.selected]: selected
        })}
            onClick={onClick}
        >
            <p>{label}</p>
        </div>
    )
};

export default Chip;