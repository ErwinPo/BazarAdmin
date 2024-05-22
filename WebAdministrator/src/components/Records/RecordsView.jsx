/* Copyright 2024 BitBrothers
 * File: RecordsView.jsx
 * Type: component */

import React, { useState, useEffect } from 'react';
import classes from './RecordsView.module.css';
import DateRangePicker from './DateRangePicker';
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
import { useMediaQuery } from 'react-responsive';
import ExcelJS from 'exceljs';
import 'react-toastify/dist/ReactToastify.css';


const RecordsView = () => {      
    const dummySales = [
        { id: 1, date: '2024-04-24 1:22:33', amount: 1.00, quantity: 2, username: 'John Doe' },
        { id: 2, date: '2024-04-04 1:22:33', amount: 1.00, quantity: 3, username: 'Jane Smith' },
        { id: 3, date: '2024-04-04 1:22:33', amount: 200.69, quantity: 1, username: 'Alice Johnson' },
        { id: 4, date: '2024-04-04 1:22:33', amount: 120, quantity: 2, username: 'Bob Brown' },
        { id: 5, date: '2024-04-04 1:22:33', amount: 180.00, quantity: 4, username: 'Eve Williams' },
        { id: 6, date: '2024-04-04 1:22:33', amount: 100.00, quantity: 2, username: 'John Doe' },
        { id: 7, date: '2024-04-04 1:22:33', amount: 150.00, quantity: 3, username: 'Jane Smith' },
        { id: 8, date: '2024-04-04 1:22:33', amount: 200.00, quantity: 1, username: 'Alice Johnson' },
        { id: 9, date: '2024-04-04 1:22:33', amount: 120.12, quantity: 2, username: 'Bob Brown' },
        { id: 10, date: '2024-04-04 1:22:33', amount: 180.00, quantity: 4, username: 'Eve Williams' },
        { id: 11, date: '2024-04-04 1:22:33', amount: 100.00, quantity: 2, username: 'John Doe' },
        { id: 12, date: '2024-04-04 1:22:33', amount: 150.00, quantity: 3, username: 'Jane Smith' },
        { id: 13, date: '2024-04-04 1:22:33', amount: 200.00, quantity: 1, username: 'Alice Johnson' },
        { id: 14, date: '2024-04-04 1:22:33', amount: 120.00, quantity: 2, username: 'Bob Brown' },
        { id: 15, date: '2024-04-04 1:22:33', amount: 180.00, quantity: 4, username: 'Eve Williams' },
        { id: 16, date: '2024-04-04 1:22:33', amount: 100.00, quantity: 2, username: 'John Doe' },
        { id: 17, date: '2024-04-04 1:22:33', amount: 150.00, quantity: 3, username: 'Jane Smith' },
        { id: 18, date: '2024-04-04 1:22:33', amount: 200.00, quantity: 1, username: 'Alice Johnson' },
        { id: 19, date: '2024-04-04 1:22:33', amount: 120.00, quantity: 2, username: 'Bob Brown' },
        { id: 20, date: '2024-04-04 1:22:33', amount: 180.00, quantity: 4, username: 'Eve Williams' },
        { id: 21, date: '2024-04-04 1:22:33', amount: 100.00, quantity: 2, username: 'John Doe' },
        { id: 22, date: '2024-04-04 1:22:33', amount: 150.00, quantity: 3, username: 'Jane Smith' },
        { id: 23, date: '2024-04-04 1:22:33', amount: 200.00, quantity: 1, username: 'Alice Johnson' },
        { id: 24, date: '2024-04-04 1:22:33', amount: 900.00, quantity: 2, username: 'Bob Brown' },
        { id: 25, date: '2024-04-04 1:22:33', amount: 180.00, quantity: 4, username: 'Eve Williams' },
    ];

    const lowDate = moment().subtract(6, 'months').toDate();
    const highestAmount = 10000;

    const [currentSaleEdit, setCurrentSaleEdit] = useState({ id: 1, date: '19/01/2024 - 01:22:33', amount: 100, quantity: 6, username: 'John Doe' });
    const [currentSaleIdDelete, setCurrentSaleIdDelete] = useState(0);
    const [page, setPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState(null);
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
        fetch("http://3.146.65.111:8000/bazar/sales//", {
            method: "GET"
        })
        .then((response) => response.json())
        .then(data => {
            setState({ ...state, sales: data ?? [] });
            console.log(data);
        })
        .catch((error) => {console.log(error);});
    }, []);

    const handleStartDateChange = (date) => {
        setState({ ...state, startDate: date, page: 1 });
    };

    const handleEndDateChange = (date) => {
        setState({ ...state, endDate: date, page: 1 });
    };

    const handleMinValueChange = (value) => {
        if (value === undefined) {
            if (errorMessage == null) {
                setErrorMessage("El monto inferior debe ser un número válido.");
            }
        } else if (value < 0) {
            value = 0;
        } else if (value > state.maxValue) {
            setErrorMessage("El monto inferior debe ser un número válido y menor al monto superior.");
        } else {
            setErrorMessage(null);
        }
        setState({ ...state, minValue: value, page: 1 });
    };
    
    const handleMaxValueChange = (value) => {
        if (value === undefined) {
            if (errorMessage == null) {
                setErrorMessage("El monto superior debe ser un número válido.");
            }
        } else if (value < 0) {
            value = 0;
        } else if (value < state.minValue) {
            setErrorMessage("El monto superior debe ser un número válido y superior al monto inferior.");
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
        // console.log(id)
        fetch(`http://3.146.65.111:8000/bazar/sales//${id}/`, {
            method: "DELETE"
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
        // console.log(id)
        fetch(`http://3.146.65.111:8000/bazar/delete-sales/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sales: sale_ids})
        })
        .then(response => {
            if (response.ok) {
                console.log(sale_ids)
                const updatedSales = state.sales.filter(sale => !sale_ids.includes(sale.id));
                setState({ ...state, sales: updatedSales, deleteSelectedModalOpen: false });
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
        // console.log(id + ' amount: ' + amount + ' quantity: ' + quantity)
        fetch(`http://3.146.65.111:8000/bazar/sales//${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
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

    const filteredSales = state.sales.filter(sale =>
        moment(sale.date).isSameOrAfter(state.startDate, 'day') &&
        moment(sale.date).isSameOrBefore(state.endDate, 'day') &&
        sale.amount >= state.minValue && sale.amount <= state.maxValue
    );

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
                <Row className={classes.filters}>
                    <Col lg={isLargeScreen ? 12 : 'auto'}>
                        <Button className={classes.button} variant="warning" onClick={exportData} >
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
            </div>
        </>
    );
};

export default RecordsView;
