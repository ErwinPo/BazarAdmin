import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import classes from "./Ventas.module.css";
import { Button, Form } from "react-bootstrap";

const Ventas = () => {
	const [validated, setValidated] = useState(false);
	const [success_txt_hidden, setSuccess_txt_hidden] = useState(true);

	useEffect(() => {
        const successState = localStorage.getItem("successState");
        if (successState === "true") {
            setSuccess_txt_hidden(false);
			setTimeout(() => {
                localStorage.removeItem("successState"); 
                setSuccess_txt_hidden(true); 
            }, 5000); 
        }
    }, []);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		
		if(form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			setSuccess_txt_hidden(true);
			localStorage.setItem("successState", "false");
		} else {
			setSuccess_txt_hidden(false); 
            localStorage.setItem("successState", "true"); 
		}
		setValidated(true);
	};

	return (
		<div>
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
			<h4 hidden={success_txt_hidden} className={classes.success_txt}>¡Felicidades! Registró una Venta con Éxito.</h4>
		</div>
	);
};

export default Ventas;
