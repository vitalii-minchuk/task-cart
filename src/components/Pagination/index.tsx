import { Dispatch, SetStateAction } from 'react';
import Button from '../common/Button';
import styles from './Pagination.module.css';

interface PaginationProps {
  totalItems: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  productsPerPage: number;
  currentPage: number;
}

function Pagination({
  totalItems,
  productsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const buttons = [] as Array<number>;

  for (let i = 1; i <= Math.ceil(totalItems / productsPerPage); i += 1) {
    buttons.push(i);
  }

  if (buttons.length === 1) return null;

  return (
    <div className={styles.box}>
      {buttons?.map((button, index) => (
        <Button
          size="small"
          color={button === currentPage ? 'blue' : 'trans'}
          onClick={() => setCurrentPage(index + 1)}
          key={button}
        >
          {button}
        </Button>
      ))}
    </div>
  );
}

export default Pagination;
