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
import ModalDeleteSelected from './ModalDeleteSelected';

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

    const lowDate = moment().subtract(6, 'months').toDate();
    const highestAmount = 10000;

    const [state, setState] = useState({
        sales: [],
        startDate: lowDate,
        endDate: new Date(),
        minValue: 0,
        maxValue: highestAmount,
        page: 1,
        selectedRows: [],
        columnCheck: false,
        deleteSelectedModalOpen: false,
        deleteModalOpen: false,
        editModalOpen: false
    });

    useEffect(() => {
        fetch("http://18.222.68.166:8000/BAZARAPI/ventas", {
            method: "GET"
        })
        .then((response) => response.json())
        .then(data => {
            setState({ ...state, sales: data.registros });
        })
        .catch((error) => console.log(error));
    }, []);

    const handleStartDateChange = (date) => {
        setState({ ...state, startDate: date, page: 1 });
    };

    const handleEndDateChange = (date) => {
        setState({ ...state, endDate: date, page: 1 });
    };

    const handleMinValueChange = (value) => {
        if (value < 0 || value > maxValue) {
            return;
        }
        setState({ ...state,minValue: value, page: 1 });
    };

    const handleMaxValueChange = (value) => {
        if (value < 0 || value < minValue) {
            return;
        }
        setState({ ...state, maxValue: value, page: 1 });
    };

    const handlePageChange = () => {
        setState({ ...state, columnCheck: false, selectedRows: [] });
    };

    const handleRowSelect = (saleId, selected) => {
        setState(prevState => {
            const prevSelectedRows = prevState.selectedRows;
            if (selected) {
                return { ...prevState, selectedRows: [...prevSelectedRows, saleId] };
            } else {
                return { ...prevState, selectedRows: prevSelectedRows.filter(id => id !== saleId), columnCheck: false };
            }
        });
    };

    const handleSelectAllChange = (event, pageSales) => {
        const Checked = event.target.checked;
        setState(prevState => {
            if (Checked) {
                const allSaleIds = pageSales.map(sale => sale.sale_id);
                return { ...prevState, columnCheck: Checked, selectedRows: allSaleIds };
            } else {
                return { ...prevState, columnCheck: Checked, selectedRows: [] };
            }
        });
    };

    const toggleDeleteSelectedModal = () => {
        setState({ ...state, deleteSelectedModalOpen: !state.deleteSelectedModalOpen });
    };

    const toggleDeleteModal = () => {
        setState({ ...state, deleteAllModalOpen: !state.deleteAllModalOpen });
    };

    const toggleEditModal = () => {
        setState({ ...state, deleteAllModalOpen: !state.deleteAllModalOpen });
    };

    const handleDeleteSelected = () => {
        console.log(state.selectedRows);
        state.selectedRows.forEach(id => {
            deleteSale(id);
        });
        setState({ ...state, columnCheck: false, selectedRows: [], deleteSelectedModalOpen: !state.deleteSelectedModalOpen });
    
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

    const filteredSales = state.sales.filter(sale =>
        moment(sale.date).isSameOrAfter(state.startDate, 'day') &&
        moment(sale.date).isSameOrBefore(state.endDate, 'day') &&
        sale.amount >= state.minValue && sale.amount <= state.maxValue
    );

    const isLargeScreen = useMediaQuery({ minWidth: 992, maxWidth: 1300 });

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
                            minValue={state.minValue}
                            maxValue={state.maxValue}
                            handleMinValueChange={handleMinValueChange}
                            handleMaxValueChange={handleMaxValueChange}
                        />
                    </Col>
                    <Col className={classes.pickers} md={12} lg={5}>
                        <DateRangePicker
                            startDate={state.startDate}
                            endDate={state.endDate}
                            handleStartDateChange={handleStartDateChange}
                            handleEndDateChange={handleEndDateChange}
                        />
                    </Col>
                </Row>
                {state.selectedRows.length > 0 && (
                    <Button className={classes.buttonDeleteAll} variant="warning" onClick={toggleDeleteSelectedModal} >
                        <Image className={classes.image} src={iconTrash} />
                        <span>
                            Eliminar Seleccionados
                        </span>
                    </Button>
                )}
                <SalesTable 
                    columnCheck={state.columnCheck}
                    sales={filteredSales} 
                    page={state.page}
                    handlePageChange={handlePageChange}
                    handleSelectAllChange={handleSelectAllChange}
                    setPage={state.setPage} 
                    onRowSelect={handleRowSelect}
                    selectedRows={state.selectedRows}
                />
                <ModalDeleteSelected deleteSelectedModalOpen = {state.deleteSelectedModalOpen} handleDeleteSelected = {handleDeleteSelected} toggleDeleteSelectedModal={toggleDeleteSelectedModal} />
            </div>
        </div>
    );
};

export default RecordsView;
