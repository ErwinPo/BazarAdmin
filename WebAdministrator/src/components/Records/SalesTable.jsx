/* Copyright 2024 BitBrothers
 * File: SalesTable.jsx
 * Type: component */

// imports
import React, { useEffect, useState } from 'react';
import classes from './SalesTable.module.css';
import iconPencil from '../../assets/images/icon_pencil.png';
import iconTrash from '../../assets/images/icon_trash.png';
import moment from 'moment';
import PaginationComponent from './PaginationComponent';
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, Image, Row, Table } from 'react-bootstrap';

const SalesTable = ({ columnCheck, sales, page, handlePageChange, handleSelectAllChange, setPage, onRowSelect, selectedRows, toggleDeleteModal, setCurrentSaleIdDelete, toggleEditModal, setCurrentSaleEdit }) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageSales, setPageSales] = useState(sales.slice(0, itemsPerPage));
    const [checkedColumn, setCheckedColumn] = useState(columnCheck || false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

    useEffect(() => {
        const startIdx = (page - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        setPageSales(sales.slice(startIdx, endIdx));
        setCheckedColumn(columnCheck || false);
    }, [columnCheck, sales, page, itemsPerPage]);

    useEffect(() => {
        const sortedSales = [...sales].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];
        
            if (sortConfig.key === 'date') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } 
            else if (sortConfig.key !== 'user_id') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }
        
            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });           
        setPageSales(sortedSales.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    }, [sales, sortConfig, page, itemsPerPage]);

    const totalPages = Math.ceil(sales.length / itemsPerPage);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const handlePaginationChange = (pageNumber) => {
        handlePageChange();
        setPage(pageNumber);
    };

    const handleCheckboxChange = (event, saleId) => {
        onRowSelect(saleId, event.target.checked);
    };

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '↑' : '↓';
        }
        return '';
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
                        <th onClick={() => requestSort('id')}>ID Venta <span className={classes.thArrow}>{getArrow('id')}</span></th>
                        <th onClick={() => requestSort('date')}>Fecha <span className={classes.thArrow}>{getArrow('date')}</span></th>
                        <th onClick={() => requestSort('amount')}>Monto <span className={classes.thArrow}>{getArrow('amount')}</span></th>
                        <th onClick={() => requestSort('quantity')}>Cantidad <span className={classes.thArrow}>{getArrow('quantity')}</span></th>
                        <th onClick={() => requestSort('user_id')}>Vendedor <span className={classes.thArrow}>{getArrow('user_id')}</span></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pageSales.length > 0 ? (
                        pageSales.map((sale, sale_index) => (
                            <tr key={sale_index}>
                                <td>
                                    <Form.Check
                                        className={classes.checkBox}
                                        checked={selectedRows.includes(sale.id)}
                                        onChange={(event) => handleCheckboxChange(event, sale.id)}
                                    />
                                </td>
                                <td>{sale.id}</td>
                                <td>{moment(sale.date).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                <td className={classes.alignStart}>$ {sale.amount}</td>
                                <td>{sale.quantity}</td>
                                <td>{sale.user_id}</td>
                                <td>
                                    <ButtonGroup className={classes.buttons}>
                                        <Button
                                            variant="link"
                                            className={classes.noBorder}
                                            onClick={() => {
                                                toggleDeleteModal();
                                                setCurrentSaleIdDelete(sale.id);
                                            }}
                                        >
                                            <Image className={classes.image} src={iconTrash} />
                                        </Button>
                                        <Button
                                            variant="link"
                                            className={classes.noBorder}
                                            onClick={() => {
                                                toggleEditModal();
                                                setCurrentSaleEdit({ ...sale, sale_index });
                                            }}
                                        >
                                            <Image className={classes.image} src={iconPencil} />
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className={classes.emptyState}>
                            <td colSpan='7'>No se encontraron ventas</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            {sales.length > 6 &&
            <Row className={classes.paginationRow}>
                <Col className={classes.paginationOptions}>
                    <DropdownButton
                        as={ButtonGroup}
                        key={'dropdown-items-per-page'}
                        id={'dropdown-items-per-page'}
                        title={`Ventas por página: ${itemsPerPage}`}
                        onSelect={(eventKey) => setItemsPerPage(parseInt(eventKey))}
                        className={classes.drpBtn}
                        variant="warning"
                    >
                        {[5, 10, 15, 20, 50, 100, sales.length].filter(option => option <= sales.length).map((perPage) => (
                            <Dropdown.Item key={perPage} eventKey={perPage}>
                                {perPage}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <p className={classes.paginationText}><strong>Total Results:&nbsp;&nbsp;</strong> {sales.length}</p>
                </Col>
                <Col className={classes.pagination}>
                    <PaginationComponent totalPages={totalPages} page={page} handlePageChange={handlePaginationChange} />
                </Col>
            </Row>
            }
        </div>
    );
};

export default SalesTable;
