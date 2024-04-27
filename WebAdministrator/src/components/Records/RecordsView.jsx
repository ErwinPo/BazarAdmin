/* Copyright 2024 BitBrothers
 * File: RecordsView.jsx
 * Type: component */

import React, { useState, useEffect } from 'react';
import SalesTable from "./SalesTable";
import Navbar from "../NavBar/Navbar";
import ValueRangePicker from "./ValueRangePicker";
import { Button, Col, Image, Row } from 'react-bootstrap';
import classes from './RecordsView.module.css';
import DateRangePicker from "./DateRangePicker";
import moment from "moment";
import iconExport from '../../assets/images/icon_export.png';
import iconTrash from '../../assets/images/icon_trash.png';
import { useMediaQuery } from 'react-responsive';

const RecordsView = () => {      
    const dummySales = [
        { id: '#1', date: '19/01/2024 - 01:22:33', amount: 1, quantity: 2, seller: 'John Doe' },
        { id: '#2', date: '19/02/2024 - 01:22:33', amount: 1, quantity: 3, seller: 'Jane Smith' },
        { id: '#3', date: '19/03/2024 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#4', date: '19/02/2024 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#5', date: '19/02/2024 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#6', date: '19/02/2024 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#7', date: '13/04/2024 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#8', date: '14/04/2024 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#9', date: '10/04/2024 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#10', date: '19/03/2024 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#11', date: '19/01/2024 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#12', date: '19/02/2024 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#13', date: '19/01/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#14', date: '19/02/2023 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#15', date: '19/03/2023 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#16', date: '19/04/2023 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#17', date: '19/05/2023 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#18', date: '19/06/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#19', date: '19/07/2023 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
        { id: '#20', date: '19/08/2023 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
        { id: '#21', date: '19/09/2023 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
        { id: '#22', date: '19/10/2023 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
        { id: '#23', date: '19/11/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
        { id: '#24', date: '19/12/2023 - 01:22:33', amount: 900, quantity: 2, seller: 'Bob Brown' },
        { id: '#25', date: '19/01/2025 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
      ];

    const [sales, setSales] = useState([]);
    const lowDate = moment().subtract(6, 'months').toDate();
    const highestAmount = 10000;
    const [startDate, setStartDate] = useState(lowDate);
    const [endDate, setEndDate] = useState(new Date());
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(highestAmount);
    const [page, setPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [columnCheck, setColumnCheck] = useState(false);

    useEffect(() => {
        fetch("http://18.222.68.166:8000/BAZARAPI/ventas", {
            method: "GET"
        })
        .then((response) => response.json())
        .then(data => {
            setSales(data.registros);
        })
        .catch((error) => console.log(error));
    }, []);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setPage(1);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setPage(1);
    };

    const handleMinValueChange = (value) => {
        if (value < 0 || value > maxValue) {
            return;
        }
        setMinValue(value);
        setPage(1);
    };

    const handleMaxValueChange = (value) => {
        if (value < 0 || value < minValue) {
            return;
        }
        setMaxValue(value);
        setPage(1);
    };

    const handlePageChange = () => {
        setColumnCheck(false)
        setSelectedRows([]);
    };

    const handleRowSelect = (saleId, selected) => {
        setSelectedRows((prevSelectedRows) => {
            if (selected) {
                return [...prevSelectedRows, saleId];
            } else {
                setColumnCheck(false)
                return prevSelectedRows.filter((id) => id !== saleId);
            }
        });
    };

    const handleSelectAllChange = (event, pageSales) => {
        const Checked = event.target.checked
        setColumnCheck(Checked)
        if (Checked) {
            const allSaleIds = pageSales.map(sale => sale.sale_id);
            setSelectedRows(allSaleIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleDeleteSelected = () => {
        console.log(selectedRows)
        selectedRows.forEach(id => {
            deleteSale(id);
        });
        setColumnCheck(false)
        setSelectedRows([]);
    };

    const deleteSale = (id) => {
        fetch(`http://18.222.68.166:8000/BAZARAPI/eliminarventa/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Assuming success means the sale was deleted, you can update the state accordingly
            // setSales(sales.filter(sale => sale.id !== id));
        })
        .catch(error => {
            console.error("Error deleting sale:", error);
            // Optionally, you can set an error state here to handle it in your UI
        });
    };    

    const filteredSales = sales.filter(sale =>
        moment(sale.date).isSameOrAfter(startDate, 'day') &&
        moment(sale.date).isSameOrBefore(endDate, 'day') &&
        sale.amount >= minValue && sale.amount <= maxValue
    );

    const isLargeScreen = useMediaQuery({ minWidth: 992, maxWidth: 1152 });

    return (
        <div className="salesLog">
            <Navbar />
            <div className={classes.salesLog}>
                <Row className={classes.filters}>
                    <Col lg={isLargeScreen ? 12 : 'auto'}>
                        <Button className={classes.button} variant="warning" >
                            <Image className={classes.image} src={iconExport} />
                            <span>
                                Exportar
                            </span>
                        </Button>
                    </Col>
                    <Col className={classes.pickers} md={12} lg={5}>
                        <ValueRangePicker
                            minValue={minValue}
                            maxValue={maxValue}
                            handleMinValueChange={handleMinValueChange}
                            handleMaxValueChange={handleMaxValueChange}
                        />
                    </Col>
                    <Col className={classes.pickers} md={12} lg={5}>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            handleStartDateChange={handleStartDateChange}
                            handleEndDateChange={handleEndDateChange}
                        />
                    </Col>
                </Row>
                {selectedRows.length > 0 && (
                    <Button className={classes.buttonDeleteAll} variant="warning" onClick={handleDeleteSelected} >
                        <Image className={classes.image} src={iconTrash} />
                        <span>
                            Eliminar Seleccionados
                        </span>
                    </Button>
                )}
                <SalesTable 
                    columnCheck={columnCheck}
                    sales={filteredSales} 
                    page={page}
                    handlePageChange={handlePageChange}
                    handleSelectAllChange={handleSelectAllChange}
                    setPage={setPage} 
                    onRowSelect={handleRowSelect}
                    selectedRows={selectedRows}
                />
            </div>
        </div>
    );
};

export default RecordsView;
