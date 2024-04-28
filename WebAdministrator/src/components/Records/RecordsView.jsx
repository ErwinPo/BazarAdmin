/* Copyright 2024 BitBrothers
 * File: RecordsView.jsx
 * Type: component */

import React, { useState, useEffect } from 'react';
import classes from './RecordsView.module.css';
import DateRangePicker from "./DateRangePicker";
import iconExport from '../../assets/images/icon_export.png';
import iconTrash from '../../assets/images/icon_trash.png';
import ModalDelete from './ModalDelete';
import ModalDeleteSelected from './ModalDeleteSelected';
import ModalEdit from './ModalEdit';
import moment from "moment";
import Navbar from "../NavBar/Navbar";
import SalesTable from "./SalesTable";
import ValueRangePicker from "./ValueRangePicker";
import { Button, Col, Image, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import 'react-toastify/dist/ReactToastify.css';


const RecordsView = () => {      
    const dummySales = [
        { sale_id: 1, date: '2024-04-24 1:22:33', amount: 1, quantity: 2, user_id: 'John Doe' },
        { sale_id: 2, date: '2024-04-04 1:22:33', amount: 1, quantity: 3, user_id: 'Jane Smith' },
        { sale_id: 3, date: '2024-04-04 1:22:33', amount: 200, quantity: 1, user_id: 'Alice Johnson' },
        { sale_id: 4, date: '2024-04-04 1:22:33', amount: 120, quantity: 2, user_id: 'Bob Brown' },
        { sale_id: 5, date: '2024-04-04 1:22:33', amount: 180, quantity: 4, user_id: 'Eve Williams' },
        { sale_id: 6, date: '2024-04-04 1:22:33', amount: 100, quantity: 2, user_id: 'John Doe' },
        { sale_id: 7, date: '2024-04-04 1:22:33', amount: 150, quantity: 3, user_id: 'Jane Smith' },
        { sale_id: 8, date: '2024-04-04 1:22:33', amount: 200, quantity: 1, user_id: 'Alice Johnson' },
        { sale_id: 9, date: '2024-04-04 1:22:33', amount: 120, quantity: 2, user_id: 'Bob Brown' },
        { sale_id: 10, date: '2024-04-04 1:22:33', amount: 180, quantity: 4, user_id: 'Eve Williams' },
        { sale_id: 11, date: '2024-04-04 1:22:33', amount: 100, quantity: 2, user_id: 'John Doe' },
        { sale_id: 12, date: '2024-04-04 1:22:33', amount: 150, quantity: 3, user_id: 'Jane Smith' },
        { sale_id: 13, date: '2024-04-04 1:22:33', amount: 200, quantity: 1, user_id: 'Alice Johnson' },
        { sale_id: 14, date: '2024-04-04 1:22:33', amount: 120, quantity: 2, user_id: 'Bob Brown' },
        { sale_id: 15, date: '2024-04-04 1:22:33', amount: 180, quantity: 4, user_id: 'Eve Williams' },
        { sale_id: 16, date: '2024-04-04 1:22:33', amount: 100, quantity: 2, user_id: 'John Doe' },
        { sale_id: 17, date: '2024-04-04 1:22:33', amount: 150, quantity: 3, user_id: 'Jane Smith' },
        { sale_id: 18, date: '2024-04-04 1:22:33', amount: 200, quantity: 1, user_id: 'Alice Johnson' },
        { sale_id: 19, date: '2024-04-04 1:22:33', amount: 120, quantity: 2, user_id: 'Bob Brown' },
        { sale_id: 20, date: '2024-04-04 1:22:33', amount: 180, quantity: 4, user_id: 'Eve Williams' },
        { sale_id: 21, date: '2024-04-04 1:22:33', amount: 100, quantity: 2, user_id: 'John Doe' },
        { sale_id: 22, date: '2024-04-04 1:22:33', amount: 150, quantity: 3, user_id: 'Jane Smith' },
        { sale_id: 23, date: '2024-04-04 1:22:33', amount: 200, quantity: 1, user_id: 'Alice Johnson' },
        { sale_id: 24, date: '2024-04-04 1:22:33', amount: 900, quantity: 2, user_id: 'Bob Brown' },
        { sale_id: 25, date: '2024-04-04 1:22:33', amount: 180, quantity: 4, user_id: 'Eve Williams' },
    ];

    const lowDate = moment().subtract(6, 'months').toDate();
    const highestAmount = 10000;

    const [currentSaleEdit, setCurrentSaleEdit] = useState({ id_sale: 1, date: '19/01/2024 - 01:22:33', amount: 100, quantity: 6, user_id: 'John Doe' });
    const [currentSaleIdDelete, setCurrentSaleIdDelete] = useState(0);
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
        sales: [],
        startDate: lowDate,
        endDate: new Date(),
        minValue: 0,
        maxValue: highestAmount,
        selectedRows: [],
        columnCheck: false,
        deleteSelectedModalOpen: false,
        deleteModalOpen: false,
        editModalOpen: false
    });

    useEffect(() => {
        fetch("http://18.222.68.166:8000/bazar/sales//", {
            method: "GET"
        })
        .then((response) => response.json())
        .then(data => {
            setState({ ...state, sales: data ?? [] });
        })
        .catch((error) => {console.log(error)
            setState({ ...state, sales: dummySales });});
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


    const toggleDeleteModal = () => {
        setState({ ...state, deleteModalOpen: !state.deleteModalOpen });
    };

    const handleDelete = (saleId) => {
        deleteSale(saleId);
    };

    const toggleEditModal = () => {
        setState({ ...state, editModalOpen: !state.editModalOpen });
    };

    const handleEdit = (amount, id, quantity, sale_index) => {
        editSale(amount, id, quantity, sale_index);
    };

    const toggleDeleteSelectedModal = () => {
        setState({ ...state, deleteSelectedModalOpen: !state.deleteSelectedModalOpen });
    };

    const handleDeleteSelected = async () => {
        const deletePromises = state.selectedRows.map(id => deleteSale(id));
        await Promise.all(deletePromises);

        const updatedSales = state.sales.filter(sale => !state.selectedRows.includes(sale.id));
        setState({ ...state, columnCheck: false, selectedRows: [], sales: updatedSales, deleteSelectedModalOpen: false  });
    };

    const deleteSale = (id) => {
        // console.log(id)
        fetch(`http://18.222.68.166:8000/bazar/sales//${id}/`, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                const updatedSales = state.sales.filter(sale => sale.sale_id !== id);
                setState({ ...state, sales: updatedSales, deleteModalOpen: false });
                toast.success("Venta seleccionada eliminada con éxito.");
            }
            else {
                console.error(response)
                toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
                setState({ ...state, deleteModalOpen: false });
            }
        })
        .catch(error => {
            console.error("Error deleting sale:", error);
            toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
        });
    };      

    const editSale = (amount, id, quantity, sale_index) => {
        // console.log(id + ' amount: ' + amount + ' quantity: ' + quantity)
        fetch(`http://18.222.68.166:8000/bazar/sales//${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'amount': amount, 'quantity': quantity })
        })
        .then(response => {
            if (response.ok) {
                console.log(sale_index)
                const updatedSales = [...state.sales];
                updatedSales[sale_index] = { ...updatedSales[sale_index], amount, quantity };
                setState({ ...state, sales: updatedSales, editModalOpen: false });
                toast.success("Venta seleccionada editada con éxito.");
            }
            else {
                console.error(response)
                toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
                setState({ ...state, editModalOpen: false });
            }
        })
        .catch(error => {
            console.error("Error updating sale:", error);
            toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
        });
    };    

    const filteredSales = state.sales.filter(sale =>
        moment(sale.date).isSameOrAfter(state.startDate, 'day') &&
        moment(sale.date).isSameOrBefore(state.endDate, 'day') &&
        sale.amount >= state.minValue && sale.amount <= state.maxValue
    );

    const isLargeScreen = useMediaQuery({ minWidth: 992, maxWidth: 1300 });

    return (
        <>
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
                    page={page}
                    handlePageChange={handlePageChange}
                    handleSelectAllChange={handleSelectAllChange}
                    setPage={setPage} 
                    onRowSelect={handleRowSelect}
                    selectedRows={state.selectedRows}
                    toggleDeleteModal={toggleDeleteModal}
                    setCurrentSaleIdDelete={setCurrentSaleIdDelete}
                    setCurrentSaleEdit={setCurrentSaleEdit}
                    toggleEditModal={toggleEditModal}
                />
                <ModalEdit sale = {currentSaleEdit} editModalOpen = {state.editModalOpen} handleEdit = {handleEdit} toggleEditModal={toggleEditModal} setCurrentSaleEdit={setCurrentSaleEdit} />
                <ModalDelete sale_id = {currentSaleIdDelete} deleteModalOpen = {state.deleteModalOpen} handleDelete = {handleDelete} toggleDeleteModal={toggleDeleteModal} />
                <ModalDeleteSelected deleteSelectedModalOpen = {state.deleteSelectedModalOpen} handleDeleteSelected = {handleDeleteSelected} toggleDeleteSelectedModal={toggleDeleteSelectedModal} />
            </div>
            <ToastContainer position="top-center" autoClose={5000} />
        </>
    );
};

export default RecordsView;
