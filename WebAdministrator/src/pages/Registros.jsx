/* Copyright 2024 BitBrothers
 * File: Registros.jsx
 * Type: component */

import React, { useState } from 'react';
import SalesTable from "../components/Table/SalesTable";
import Navbar from "../components/NavBar/Navbar";
import ValueRangePicker from "../components/ValueRangePicker";
import { Button, Col, Image, Row } from 'react-bootstrap';
import classes from './Registros.module.css';
import DateRangePicker from "../components/DateRangePicker";
import moment from "moment";
import iconExport from '../assets/images/icon_export.png';
import { useMediaQuery } from 'react-responsive';

const Registros = ({ sales }) => {
    const lowestDate = moment(Math.min(...sales.map(sale => moment(sale.date, 'DD/MM/YYYY HH:mm:ss').valueOf()))).toDate();
	const highestAmount = Math.max(...sales.map(sale => sale.amount));
    const [startDate, setStartDate] = useState(lowestDate);
    const [endDate, setEndDate] = useState(new Date());
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(highestAmount);
    const [page, setPage] = useState(1);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setPage(1);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setPage(1);
    };

    const handleMinValueChange = (value) => {
		if (value < 0 || value > maxValue) {
			return;
		}
		setMinValue(value);
        setPage(1);
    };

    const handleMaxValueChange = (value) => {
		if (value < 0 || value < minValue) {
			return;
		}
		setMaxValue(value);
        setPage(1);
    };

    const filteredSales = sales.filter(sale =>
        moment(sale.date, 'DD/MM/YYYY HH:mm:ss').isSameOrAfter(startDate, 'day') &&
        moment(sale.date, 'DD/MM/YYYY HH:mm:ss').isSameOrBefore(endDate, 'day') &&
        sale.amount >= minValue && sale.amount <= maxValue
    );

	const isLargeScreen = useMediaQuery({ minWidth: 992, maxWidth: 1110 });

    return (
        <div className="salesLog">
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
                <SalesTable sales={filteredSales} page={page} setPage={setPage} />
            </div>
        </div>
    );
};

export default Registros;
