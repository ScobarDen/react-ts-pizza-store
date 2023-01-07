import styles from './Pagination.module.scss';
import ReactPaginate, {ReactPaginateProps} from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import React from "react";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const onPageChange = (e: any) => {
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
    />
  );
};

export default Pagination;
