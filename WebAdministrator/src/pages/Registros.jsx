/* Copyright 2024 BitBrothers
 * File: Registros.jsx
 * Type: component */

import React, { useState, useEffect } from 'react';
import SalesTable from "../components/Table/SalesTable";
import Navbar from "../components/NavBar/Navbar";
import ValueRangePicker from "../components/ValueRangePicker";
import { Button, Col, Image, Row } from 'react-bootstrap';
import classes from './Registros.module.css';
import DateRangePicker from "../components/DateRangePicker";
import moment from "moment";
import iconExport from '../assets/images/icon_export.png';
import { useMediaQuery } from 'react-responsive';


const sales = [
    { id: '#1', date: '19/01/2024 - 01:22:33', amount: 1, quantity: 2, seller: 'John Doe' },
    { id: '#2', date: '19/02/2024 - 01:22:33', amount: 1, quantity: 3, seller: 'Jane Smith' },
    { id: '#3', date: '19/03/2024 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
    { id: '#4', date: '19/02/2024 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
    { id: '#5', date: '19/02/2024 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
    { id: '#6', date: '19/02/2024 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
    { id: '#7', date: '13/04/2024 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
    { id: '#8', date: '14/04/2024 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
    { id: '#9', date: '10/04/2024 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
    { id: '#10', date: '19/03/2024 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
    { id: '#11', date: '19/01/2024 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
    { id: '#12', date: '19/02/2024 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
    { id: '#13', date: '19/01/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
    { id: '#14', date: '19/02/2023 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
    { id: '#15', date: '19/03/2023 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
    { id: '#16', date: '19/04/2023 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
    { id: '#17', date: '19/05/2023 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
    { id: '#18', date: '19/06/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
    { id: '#19', date: '19/07/2023 - 01:22:33', amount: 120, quantity: 2, seller: 'Bob Brown' },
    { id: '#20', date: '19/08/2023 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
    { id: '#21', date: '19/09/2023 - 01:22:33', amount: 100, quantity: 2, seller: 'John Doe' },
    { id: '#22', date: '19/10/2023 - 01:22:33', amount: 150, quantity: 3, seller: 'Jane Smith' },
    { id: '#23', date: '19/11/2023 - 01:22:33', amount: 200, quantity: 1, seller: 'Alice Johnson' },
    { id: '#24', date: '19/12/2023 - 01:22:33', amount: 900, quantity: 2, seller: 'Bob Brown' },
    { id: '#25', date: '19/01/2025 - 01:22:33', amount: 180, quantity: 4, seller: 'Eve Williams' },
  ];

const Registros = () => {

    const lowestDate = moment(Math.min(...sales.map(sale => moment(sale.date, 'DD/MM/YYYY HH:mm:ss').valueOf()))).toDate();
	const highestAmount = Math.max(...sales.map(sale => sale.amount));
    const [startDate, setStartDate] = useState(lowestDate);
    const [endDate, setEndDate] = useState(new Date());
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(highestAmount);
    const [page, setPage] = useState(1);
    const [sales, setSales] = useState(null);

    useEffect(() => {
        fetch("http://xx.xx.xx.xx/BAZARAPI/ventas", {
          method: "GET"
        })
          .then((response) => response.json())
          .then((data) => {
            setSales(data.registros)
            console.log(data.registros);
          })
          .catch((error) => console.log(error));
      }, [sales]);

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
