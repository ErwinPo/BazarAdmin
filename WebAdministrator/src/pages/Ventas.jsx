import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import classes from "./Ventas.module.css";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import SalesTable from "../components/Records/SalesTable";
import ModalEdit from "../components/Records/ModalEdit";
import ModalDelete from "../components/Records/ModalDelete";
import iconTrash from '../assets/images/icon_trash.png';

const Ventas = () => {
	const [validated, setValidated] = useState(false);
	const lowDate = moment().subtract(6, 'months').toDate();
	const highestAmount = 10000;
	const [currentSaleEdit, setCurrentSaleEdit] = useState({ id: 1, date: '19/01/2024 - 01:22:33', amount: 100, quantity: 6, username: 'John Doe' });
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

	const filteredSales = state.sales.filter(sale =>
        moment(sale.date).isSameOrAfter(state.startDate, 'day') &&
        moment(sale.date).isSameOrBefore(state.endDate, 'day') &&
        sale.amount >= state.minValue && sale.amount <= state.maxValue
    );

	const handlePageChange = () => {
        setState({ ...state, columnCheck: false, selectedRows: [] });
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

	const toggleDeleteModal = () => {
        setState({ ...state, deleteModalOpen: !state.deleteModalOpen });
    };

	const toggleEditModal = () => {
        setState({ ...state, editModalOpen: !state.editModalOpen });
    };

	const handleEdit = (amount, id, quantity, sale_index) => {
        editSale(amount, id, quantity, sale_index);
    };

	const handleDelete = (saleId) => {
        deleteSale(saleId);
    };

	const toggleDeleteSelectedModal = () => {
        setState({ ...state, deleteSelectedModalOpen: !state.deleteSelectedModalOpen });
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

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		
		if(form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			toast.error("Error: Datos ingresados no validos.");
			setValidated(true);
		} else {
			try {
				setValidated(true);
				const response = await fetch("http://3.146.65.111:8000/bazar/sales//", {
					method: "POST",
					headers: {
						'Content-Type' : 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('access_token')}`
					},
					body: JSON.stringify({
						amount: form.elements.formMonto.value,
						quantity: form.elements.formCantidad.value
					})
				});

				if(!response.ok){
					console.log(response);
					throw new Error("Error al registrar la venta.");
				}

				toast.success("Venta registrada con éxito!");

				form.elements.formMonto.value = "";
				form.elements.formCantidad.value = "";
				setValidated(false);

			} catch (error) {
				console.error("Error: ", error.message);
				toast.error("Error al registrar la venta.");
			}
             
		}
		//setValidated(true);
	};

	return (
		<div>
			<ToastContainer position="top-center" autoClose={false}/>
			<Navbar />
			<Form noValidate validated={validated} onSubmit={handleSubmit}>
				<Form.Group className={classes.form_grp} controlId="formMonto">
					<Form.Label>Monto Total</Form.Label>
					<Form.Control type="number" min={1} max={1000000} step={0.01} onKeyDown={ (evt) => ((evt.key === 'e') || (evt.key === 'E')) && evt.preventDefault() } className={classes.control_input} required/>
					<Form.Control.Feedback type="invalid">Monto invalido</Form.Control.Feedback>
				</Form.Group>

				<Form.Group className={classes.form_grp} controlId="formCantidad">
					<Form.Label>Número Total de Articulos Vendidos</Form.Label>
					<Form.Control type="number" min={1} max={1000000} pattern="[0-9]" onKeyDown={ (evt) => ((evt.key === 'e') || (evt.key === 'E')) && evt.preventDefault() } className={classes.control_input} required/>
					<Form.Control.Feedback type="invalid">Cantidad de articulos invalida</Form.Control.Feedback>
				</Form.Group>

				<Button variant="warning" type="submit" className={classes.register_btn}>
					Registrar Venta
				</Button>
			</Form>
			<br/>
			<div className={classes.salesLog}>
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
			</div>
		</div>
	);
};

export default Ventas;
