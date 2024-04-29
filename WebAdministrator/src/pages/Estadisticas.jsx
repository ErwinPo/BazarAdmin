import React from "react";
import Navbar from "../components/NavBar/Navbar"

import { Button, Col, Image, Row, Container } from 'react-bootstrap'
import DatesDropdown from "../components/Statistics/DatesDropdown";
import UsersDropdown from "../components/Statistics/UsersDropdown";
import classes from "../components/Statistics/StatisticsDropdowns.module.css"
import StatisticsCards from "../components/Statistics/StatisticsCards";
import SalesGraph from "../components/Statistics/SalesGraph";


const Estadisticas = () => {
	return (
		<div>
			<Navbar />

	
			<Row className={classes.row}>
				<Col md={{offset: 2}} xs lg="2">Filtros:</Col>
				<Col xs lg="2">
					<DatesDropdown></DatesDropdown>
				</Col>
				<Col xs lg="2">
					<UsersDropdown></UsersDropdown>
				</Col>
			</Row>

			<Row >
				<StatisticsCards title="Ingresos" data="$400000" increasePercentage="10%"></StatisticsCards>			
				<StatisticsCards title="Ventas Totales" data="7" increasePercentage="22%"></StatisticsCards>
				<StatisticsCards title="Mejor Vendedor" data="Fer Garcia"></StatisticsCards>
			</Row>
			
      
      <SalesGraph></SalesGraph>

    
			
		</div>
	);
};

export default Estadisticas;
