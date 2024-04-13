/* Copyright 2024 BitBrothers
 * File: Registros.jsx
 * Type: component */

import SalesTable from "../components/Table/SalesTable";
import Navbar from "../components/NavBar/Index";
import ValueRangePicker from "../components/ValueRangePicker";
import { Button, Col, Row } from 'react-bootstrap';
import classes from './Registros.module.css';
import DateRangePicker from "../components/DateRangePicker";

const Registros = ({ sales }) => {
	return (
		<div className="salesLog">
			<Navbar />
				<Row className={classes.filters}>
					<Col>
						<Button variant="warning">Exportar</Button>
					</Col>
					<Col className={classes.pickers} md={12} lg={5}>
						<ValueRangePicker />
					</Col>
					<Col className={classes.pickers} md={12} lg={5}>
						<DateRangePicker />
					</Col>
				</Row>
			<SalesTable sales={sales} />
		</div>
	);
};

export default Registros;
