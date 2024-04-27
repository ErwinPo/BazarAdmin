/* Copyright 2024 BitBrothers
 * File: SalesTable.jsx
 * Type: component */

// imports
import React, { useEffect, useState } from 'react';
import classes from './SalesTable.module.css';
import { Button, ButtonGroup, Form, Image, Table } from 'react-bootstrap';
import iconPencil from '../../assets/images/icon_pencil.png';
import iconTrash from '../../assets/images/icon_trash.png';
import PaginationComponent from './PaginationComponent';

const SalesTable = ({ columnCheck, sales, page, handlePageChange, handleSelectAllChange, setPage, onRowSelect, selectedRows }) => {
    const itemsPerPage = 7; // Número de elementos por página

    const [pageSales, setPageSales] = useState(sales.slice(0, itemsPerPage));
    const [checkedColumn, setCheckedColumn] = useState(columnCheck || false);

    useEffect(() => {
        const startIdx = (page - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        setPageSales(sales.slice(startIdx, endIdx));
        setCheckedColumn(columnCheck || false);
    }, [columnCheck, sales, page, itemsPerPage]);

    const totalPages = Math.ceil(sales.length / itemsPerPage);

    const handlePaginationChange = (pageNumber) => {
        handlePageChange()
        setPage(pageNumber);
    };

    const paginatedData = sales.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleCheckboxChange = (event, saleId) => {
        onRowSelect(saleId, event.target.checked);
    };

    return (
        <div className={classes.tableCover}>
            <Table responsive size='lg' variant='dark' className={classes.table}>
                <thead>
                    <tr>
                        <th>
                            <Form.Check 
                                className={classes.checkBox} 
                                checked={checkedColumn}
                                onChange={(event) => handleSelectAllChange(event, pageSales)}
                            />
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
                        paginatedData.map((sale, saleIndex) => (
                            <tr key={saleIndex}>
                                <td>
                                    <Form.Check 
                                        className={classes.checkBox} 
                                        checked={selectedRows.includes(sale.sale_id)}
                                        onChange={(event) => handleCheckboxChange(event, sale.sale_id)}
                                    />
                                </td>
                                <td>{sale.sale_id}</td>
                                <td>{sale.date}</td>
                                <td>{sale.amount}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.user_id}</td>
                                <td>
                                    <ButtonGroup className={classes.buttons}>
                                        <Button variant="link" className={classes.noBorder}>
                                            <Image className={classes.image} src={iconTrash} />
                                        </Button>
                                        <Button variant="link" className={classes.noBorder}>
                                            <Image className={classes.image} src={iconPencil} />
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
            {totalPages > 1 &&
              <PaginationComponent totalPages={totalPages} page={page} handlePageChange={handlePaginationChange} />
            }
        </div>
    );
};

export default SalesTable;
