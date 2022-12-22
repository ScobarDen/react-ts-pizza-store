import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import {useState} from "react";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];



function Pagination({ onPageChange }) {

  return (
        <ReactPaginate className={styles.root}
            breakLabel="..."
            nextLabel="&raquo;"
            onPageChange={(e)=>onPageChange(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="&laquo;"
            renderOnZeroPageCount={null}
        />
  );
}

export default Pagination;
