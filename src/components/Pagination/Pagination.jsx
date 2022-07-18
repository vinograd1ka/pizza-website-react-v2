import React from 'react';
import cl from './Pagination.module.scss';
import ReactPaginate from "react-paginate";

const Pagination = ({ onChangePage }) => {
    return (
        <ReactPaginate
            className={cl.container}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={event => onChangePage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={2}
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;