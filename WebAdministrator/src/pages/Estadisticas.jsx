import React from "react";
import Navbar from "../components/NavBar/Navbar"

import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Button, Col, Image, Row, Container } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import DatesDropdown from "../components/Statistics/DatesDropdown";
import UsersDropdown from "../components/Statistics/UsersDropdown";
import classes from "../components/Statistics/StatisticsDropdowns.module.css"
import StatisticsCards from "../components/Statistics/StatisticsCards";


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
				<StatisticsCards title="Ingresos" data="$400"></StatisticsCards>			
				<StatisticsCards title="Ventas Totales" data="7"></StatisticsCards>
				<StatisticsCards title="Mejor Vendedor" data="Fer Garcia"></StatisticsCards>
			</Row>
			
			
			



			<Stack direction="row" sx={{ width: '50%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <SparkLineChart
          data={[1000, 1500, 2000, 2500, 1760, 1800, 2100, 3000]}
          xAxis={{
            scaleType: 'time',
            data: [
              new Date(2022, 5, 1),
              new Date(2022, 5, 2),
              new Date(2022, 5, 5),
              new Date(2022, 5, 6),
              new Date(2022, 5, 7),
              new Date(2022, 5, 8),
              new Date(2022, 5, 11),
              new Date(2022, 5, 12),
            ],
            valueFormatter: (value) => value.toISOString().slice(0, 10),
          }}
          height={150}
          showTooltip
          showHighlight
        />
      </Box>
	  </Stack>
			
		</div>
	);
};

export default Estadisticas;
