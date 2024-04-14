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
	const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);
  
	const handleStartDateChange = (date) => {
	  setStartDate(date);
	};
  
	const handleEndDateChange = (date) => {
	  setEndDate(date);
	};

	const handleMinValueChange = (value) => {
        setMinValue(value);
    };

    const handleMaxValueChange = (value) => {
        setMaxValue(value);
    };
  
	const filteredSales = sales.filter(sale =>
		moment(sale.date, 'DD/MM/YYYY HH:mm:ss').isSameOrAfter(startDate, 'day') &&
		moment(sale.date, 'DD/MM/YYYY HH:mm:ss').isSameOrBefore(endDate, 'day') &&
        sale.amount >= minValue && sale.amount <= maxValue
	  );
  
	return (
	  <div className="salesLog">
		<Navbar />
		<Row className={classes.filters}>
		  <Col>
			<Button variant="warning">Exportar</Button>
		  </Col>
		  <Col className={classes.pickers} md={12} lg={5}>
			<ValueRangePicker
				minValue={minValue}
				maxValue={maxValue}
				handleMinValueChange={handleMinValueChange}
				handleMaxValueChange={handleMaxValueChange}
			/>
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
