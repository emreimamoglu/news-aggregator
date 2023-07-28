import { PaginationProps } from '@/interfaces';
import styles from './styles.module.scss';
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Pagination = ({ currentPage, callback, lastPage }: PaginationProps) => {
    const handleNextPage = () => {
        callback(currentPage + 1);
    };
    
    const handlePreviousPage = () => {
        callback(currentPage - 1);
    };
    
    return (
        <div className={styles.pagination}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
            <KeyboardArrowLeftOutlined />
        </IconButton>
        <span>{currentPage}</span>
        <IconButton onClick={handleNextPage} disabled={currentPage === lastPage}>
            <KeyboardArrowRightOutlined />
        </IconButton>
        </div>
    );
 };

 export default Pagination;