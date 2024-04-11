import SalesTable from "../components/Table/SalesTable"
import Navbar from "../components/NavBar/Index";
import DateRangePicker from "../components/DateRangePicker";
import { Button, Col, Row } from 'react-bootstrap';
import classes from './Registros.module.css';

const Registros = ( {sales} ) => {
	return (
		<div className="salesLog">
			<Navbar />
			<Row className={classes.filters}>
				<Col>
					<Button variant="warning">Exportar</Button>
				</Col>
      			<Col md={12} lg={5}>
					<DateRangePicker />
				</Col>
				<Col md={12} lg={5}>
					<DateRangePicker />
				</Col>
			</Row>
			<SalesTable sales={sales} />
		</div>
	);
};

export default Registros;