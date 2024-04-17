import React from "react";
import Navbar from "../components/NavBar/Navbar";
import classes from "./Ventas.module.css";
import { Button, Form } from "react-bootstrap";

const Ventas = () => {
	return (
		<div>
			<Navbar />
			<Form>
				<Form.Group controlId="formMonto">
					<Form.Label>Monto Total</Form.Label>
					<Form.Control type="number"/>
				</Form.Group>

				<Form.Group controlId="formCantidad">
					<Form.Label>Número Total de Articulos Vendidos</Form.Label>
					<Form.Control type="number"/>
				</Form.Group>

				<Button variant="warning" type="submit" className={classes.register_btn}>
					Registrar Venta
				</Button>
			</Form>
		</div>
	);
};

export default Ventas;
