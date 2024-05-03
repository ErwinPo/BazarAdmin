import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/Navbar";
import { Button, Col, Image, Row, Container } from 'react-bootstrap';
import DatesDropdown from "../components/Statistics/DatesDropdown";
import UsersDropdown from "../components/Statistics/UsersDropdown";
import classes from "../components/Statistics/StatisticsDropdowns.module.css";
import StatisticsCards from "../components/Statistics/StatisticsCards";
import SalesGraph from "../components/Statistics/SalesGraph";

const Estadisticas = () => {
    const [salesData, setSalesData] = useState([]); // State to hold sales data
    const [rangeOfDates, setRangeOfDates] = useState([]); // State to hold sales data

    // Function to handle data update from DatesDropdown component
    const handleSalesDataUpdate = (data) => {
        setSalesData(data);
    };

    // Function to handle data update from DatesDropdown component
    const handleRangeOfDates = (data) => {
        setRangeOfDates(data);
    };

    useEffect(() => {
        // console.log("Sales Data: ", ...salesData);
    }, [salesData]);

    useEffect(() => {
        // console.log("Range of dates Estadisticas: ", ...rangeOfDates);
    }, [rangeOfDates]);


    return (
        <div>
            <Navbar />
            <Row className={classes.row}>
                <Col md={{offset: 2}} xs lg="2">Filtros:</Col>
                <Col xs lg="2">
                    {/* Pass handleSalesDataUpdate function as prop */}
                    <DatesDropdown onDataUpdate={handleSalesDataUpdate} onRangeOfDatesUpdate={handleRangeOfDates} start/>
                </Col>
                <Col xs lg="2">
                    <UsersDropdown rangeOfDates={rangeOfDates} />
                </Col>
            </Row>
            <Row>
                <StatisticsCards title="Ingresos" data="$400000" increasePercentage="10%" />
                <StatisticsCards title="Ventas Totales" data="7" increasePercentage="22%" />
                <StatisticsCards title="Mejor Vendedor" data="Fer Garcia" />
            </Row>
            {/* Pass salesData state to SalesGraph component */}
            <SalesGraph salesData={salesData} />
        </div>
    );
};

export default Estadisticas;
