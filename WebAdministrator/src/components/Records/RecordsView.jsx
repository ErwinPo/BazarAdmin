/* Copyright 2024 BitBrothers
 * File: RecordsView.jsx
 * Type: component */

import React, { useState, useEffect } from 'react';
import classes from './RecordsView.module.css';
import DatesDropdown from './DatesDropdown';
import ExcelJS from 'exceljs';
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
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import 'react-toastify/dist/ReactToastify.css';


const RecordsView = () => {      
    const token = localStorage.getItem('access_token');

    const [currentSaleEdit, setCurrentSaleEdit] = useState({ id: 1, date: '19/01/2024 - 01:22:33', amount: 100, quantity: 6, username: 'John Doe' });
    const [currentSaleIdDelete, setCurrentSaleIdDelete] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [page, setPage] = useState(1);
    const [state, setState] = useState({
        sales: [],
        startDate: new Date(),
        endDate: new Date(),
        minValue: "",
        maxValue: "",
        selectedRows: [],
        columnCheck: false,
        deleteSelectedModalOpen: false,
        deleteModalOpen: false,
        editModalOpen: false
    });

    useEffect(() => {
        setLoading(true);
        fetch("http://3.144.21.179:8000/bazar/sales//", {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then(data => {
            setState({ ...state, sales: data ?? [] });
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        });
        
    }, []);

    const handleStartDateChange = (date) => {
        setState(prevState => ({
            ...prevState,
            startDate: date,
            page: 1
        }));
    };

    const handleEndDateChange = (date) => {
        setState(prevState => ({
            ...prevState,
            endDate: date,
            page: 1
        }));
    };

    const handleMinValueChange = (receivedValue) => {
        let value = receivedValue === "" ? "" : Number(receivedValue);
    
        if (value === "" || isNaN(value)) {
            setState({ ...state, minValue: "", page: 1 });
            setErrorMessage(null);
            return;
        }
    
        if (value < 0) {
            value = 0;
        }
    
        if (state.maxValue !== "" && value > Number(state.maxValue)) {
            setErrorMessage("El monto inferior debe ser menor al monto superior.");
        } else {
            setErrorMessage(null);
        }
        
        setState({ ...state, minValue: value, page: 1 });
    };
    
    
    const handleMaxValueChange = (receivedValue) => {
        let value = receivedValue === "" ? "" : Number(receivedValue);
    
        if (value === "" || isNaN(value)) {
            setState({ ...state, maxValue: "", page: 1 });
            setErrorMessage(null);
            return;
        }
    
        if (value < 0) {
            value = 0;
        }
    
        if (state.minValue !== "" && value < Number(state.minValue)) {
            setErrorMessage("El monto superior debe ser mayor al monto inferior.");
        } else {
            setErrorMessage(null);
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
                const allSaleIds = pageSales.map(sale => sale.id);
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
        deleteSelectedSales(state.selectedRows);
    };

    const deleteSale = (id) => {
        fetch(`http://3.144.21.179:8000/bazar/sales//${id}/`, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                const updatedSales = state.sales.filter(sale => sale.id !== id);
                setState({ ...state, sales: updatedSales, deleteModalOpen: false }, toast.success("Venta seleccionada eliminada con éxito."));
                
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

    const deleteSelectedSales = (sale_ids) => {
        fetch(`http://3.144.21.179:8000/bazar/delete-sales/`, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sales: sale_ids})
        })
        .then(response => {
            if (response.ok) {
                const updatedSales = state.sales.filter(sale => !sale_ids.includes(sale.id));
                setState({ ...state, sales: updatedSales, columnCheck: false, deleteSelectedModalOpen: false, selectedRows: []  });
                setPage(1);
                toast.success("Ventas seleccionadas eliminadas con éxito.");
            }
            else {
                console.error(response)
                toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
                setState({ ...state, deleteSelectedModalOpen: false });
            }
        })
        .catch(error => {
            console.error("Error deleting sale:", error);
            toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
        });
    };      

    const editSale = (amount, id, quantity, sale_index) => {
        fetch(`http://3.144.21.179:8000/bazar/sales//${id}/`, {
            method: "PUT",
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'amount': amount, 'quantity': quantity })
        })
        .then(response => {
            if (response.ok) {
                const updatedSales = [...state.sales];
                updatedSales[sale_index] = { ...updatedSales[sale_index], amount, quantity };
                setState({ ...state, sales: updatedSales, editModalOpen: false }, toast.success("Venta seleccionada editada con éxito."));
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

    const filteredSales = state.sales.filter(sale => {
        const isWithinDateRange = moment(sale.date).isSameOrAfter(state.startDate, 'day') && 
                                  moment(sale.date).isSameOrBefore(state.endDate, 'day');
        
        let isWithinAmountRange = false;
    
        if (state.minValue === "" && state.maxValue === "") {
            isWithinAmountRange = true;
        } else if (state.maxValue === "") {
            isWithinAmountRange = sale.amount >= parseFloat(state.minValue);
        } else if (state.minValue === "") {
            isWithinAmountRange = sale.amount <= parseFloat(state.maxValue);
        } else {
            isWithinAmountRange = sale.amount >= parseFloat(state.minValue) && 
                                  sale.amount <= parseFloat(state.maxValue);
        }
    
        return isWithinDateRange && isWithinAmountRange;
    });    

    const exportData = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");
        
        for (let colNumber = 1; colNumber <= 5; colNumber++) { // Columns A to E
            const cell = sheet.getCell(1, colNumber); // Row 1, current column
            cell.border = {
                top: {style: "thin", color: { argb: "ff000000" } },
                left: {style: "thin", color: { argb: "ff000000" } },
                bottom: {style: "thin", color: { argb: "ff000000" } },
                right: {style: "thin", color: { argb: "ff000000" } },
            };
        
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ff539165" },
            };
        
            cell.font = {
                family: 4,
                size: 12,
                bold: true,
                color: { argb: "ffffffff" }
            };
        }       

        sheet.columns = [
            {header: "ID", key: "id", width: 10, },
            {header: "Fecha", key: "date", width: 25 },
            {header: "Monto", key: "amount", width: 15, },
            {header: "Cantidad", key: "quantity", width: 10, },
            {header: "Vendedor", key: "username", width: 25, },
        ];

        sheet.getColumn(3).numFmt = '$#,##0.00';

        filteredSales.map((sale) => {
            sheet.addRow({
                id: sale.id,
                date: moment(sale.date).format('DD/MM/YYYY - HH:mm:ss'),
                amount: Number(sale.amount),
                quantity: sale.quantity,
                username: sale.username,
            });
        });

        workbook.xlsx.writeBuffer().then(function (data) {
            const blob = new Blob([data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement("a");
            anchor.href = url;
            anchor.download = "ventas.xlsx";
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    };

    const isLargeScreen = useMediaQuery({ minWidth: 992, maxWidth: 1300 });

    return (
        <>
            <Navbar />
            <div className={classes.salesLog}>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <>
                        <Row className={classes.filters}>
                            {filteredSales.length > 0 &&
                                <Col lg={isLargeScreen ? 12 : 'auto'}>
                                    <Button className={classes.button} variant="warning" onClick={exportData} >
                                        <Image className={classes.image} src={iconExport} />
                                        <span>
                                            Exportar
                                        </span>
                                    </Button>
                                </Col>
                            }
                            <Col className={classes.pickers} md={12} lg={5}>
                                <ValueRangePicker
                                    minValue={state.minValue}
                                    maxValue={state.maxValue}
                                    handleMinValueChange={handleMinValueChange}
                                    handleMaxValueChange={handleMaxValueChange}
                                />
                            </Col>
                            <Col className={classes.datesDropDown} md="auto">
                                <DatesDropdown
                                    handleStartDateChange={handleStartDateChange}
                                    handleEndDateChange={handleEndDateChange}
                                />
                            </Col>
                        </Row>
                        {errorMessage && (
                            <div className={classes.errorMessage}>
                            <span>{errorMessage}</span>
                            </div>
                        )}
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
                    </>
                )}
            </div>
        </>
    );
};

export default RecordsView;
