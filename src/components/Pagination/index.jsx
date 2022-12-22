import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="&raquo;"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="&laquo;"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
