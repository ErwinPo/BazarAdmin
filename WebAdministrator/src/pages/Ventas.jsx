import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import classes from "./Ventas.module.css";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const Ventas = () => {
	const [validated, setValidated] = useState(false);

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
						user_id: 1,
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
		</div>
	);
};

export default Ventas;
