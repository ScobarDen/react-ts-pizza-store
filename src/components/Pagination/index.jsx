import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

function Pagination() {
  const dispatch = useDispatch();
  const onPageChange = (e) => {
    dispatch(setCurrentPage(e.selected + 1));
  };
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel="&raquo;"
      onPageChange={onPageChange}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="&laquo;"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
