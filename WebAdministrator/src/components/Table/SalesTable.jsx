/* Copyright 2024 BitBrothers
 * File: SalesTable.jsx
 * Type: component */

// imports
import React, { useState } from 'react';
import classes from './SalesTable.module.css';
import { Button, ButtonGroup, Form, Image, Pagination, Table } from 'react-bootstrap';
import iconPencil from '../../assets/images/icono_pencil.png';
import iconTrash from '../../assets/images/icono_trash.png';
import PaginationComponent from './PaginationComponent';

const SalesTable = ({ sales }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 7; // Número de elementos por página
  
  const totalPages = Math.ceil(sales.length / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  
  const paginatedData = sales.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  return (
    <div className={classes.tableCover}>
      <Table bordered responsive size='lg' variant='dark' className={classes.table}>
        <thead>
          <tr>
            <th>
              <Form.Check className={classes.checkBox} />
            </th>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Cantidad</th>
            <th>Vendedor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            paginatedData.map((sale) => (
              <tr key={sale.id}>
                <td>
                  <Form.Check />
                </td>
                <td>{sale.id}</td>
                <td>{sale.date}</td>
                <td>{sale.amount}</td>
                <td>{sale.quantity}</td>
                <td>{sale.seller}</td>
                <td>
                  <ButtonGroup className={classes.buttons}>
                    <Button variant="link" className={classes.noBorder}>
                      <Image className={classes.image} src={iconTrash}/>
                    </Button>
                    <Button variant="link" className={classes.noBorder}>
                      <Image className={classes.image} src={iconPencil}/>
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr className={classes.emptyState}>
              <td colSpan='7'>No hay sales registradas hasta el momento</td>
            </tr>
          )}
        </tbody>
      </Table>
      <PaginationComponent totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
    </div>
  );
};

export default SalesTable;