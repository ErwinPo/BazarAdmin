/* Copyright 2024 BitBrothers
 * File: Registros.jsx
 * Type: component */

import React, {useState} from 'react';
import SalesTable from "../components/Table/SalesTable";
import Navbar from "../components/NavBar/Index";
import ValueRangePicker from "../components/ValueRangePicker";
import { Button, Col, Row } from 'react-bootstrap';
import classes from './Registros.module.css';
import DateRangePicker from "../components/DateRangePicker";
import moment from "moment";

const Registros = ({ sales }) => {
	const lowestDate = moment(Math.min(...sales.map(sale => moment(sale.date, 'DD/MM/YYYY HH:mm:ss').valueOf()))).toDate();
	const [startDate, setStartDate] = useState(lowestDate);
	const [endDate, setEndDate] = useState(new Date());
  
	const handleStartDateChange = (date) => {
	  setStartDate(date);
	};
  
	const handleEndDateChange = (date) => {
	  setEndDate(date);
	};
  
	const filteredSales = sales.filter(sale =>
		moment(sale.date, 'DD/MM/YYYY HH:mm:ss').isSameOrAfter(startDate, 'day') &&
		moment(sale.date, 'DD/MM/YYYY HH:mm:ss').isSameOrBefore(endDate, 'day')
	  );
  
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
			<DateRangePicker
			  startDate={startDate}
			  endDate={endDate}
			  handleStartDateChange={handleStartDateChange}
			  handleEndDateChange={handleEndDateChange}
			/>
		  </Col>
		</Row>
		<SalesTable sales={filteredSales} />
	  </div>
	);
  };
  
export default Registros;
