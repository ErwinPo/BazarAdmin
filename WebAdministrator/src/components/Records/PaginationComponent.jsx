/* Copyright 2024 BitBrothers
 * File: PaginationComponent.jsx
 * Type: component */

import React from 'react';
import classes from './PaginationComponent.module.css';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ totalPages, page, handlePageChange }) => {
  const isSmallScreen = window.innerWidth <= 768;
  const maxPageItems = isSmallScreen ? 2 : 10;
  
  let startPage = 1;
  if (totalPages > maxPageItems) {
    startPage = Math.max(1, Math.min(page - Math.floor(maxPageItems / 2), totalPages - maxPageItems + 1));
  }
  
  return (
    <div className={classes.paginationCover}>
      <Pagination className={classes.pagination} size='sm'>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
        {Array.from({ length: Math.min(totalPages, maxPageItems) }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <Pagination.Item
            className={classes.paginationActive}
              key={pageNumber}
              active={pageNumber === page}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Pagination.Item>
          );
        })}
        {totalPages > maxPageItems && page <= totalPages - Math.floor(maxPageItems / 2) && <Pagination.Ellipsis />}
        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
