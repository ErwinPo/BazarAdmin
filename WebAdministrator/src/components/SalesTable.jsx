/* Copyright 2024 BitBrothers
 * File: SalesTable.jsx
 * Type: component */

// imports
import classes from './SalesTable.module.css';
import { Button, ButtonGroup, Form, Image, Table } from 'react-bootstrap';
import iconPencil from '../assets/images/icono_pencil.png';
import iconTrash from '../assets/images/icono_trash.png';

// component
const SalesTable = ({ ventas }) => {
  return (
	<div className={classes.tableCover}>
		<Table bordered responsive size='lg' variant='dark' className={classes.table}>
		<thead>
			<tr>
			<th>
				<Form.Check className={classes.checkBox} />
			</th>
			<th>ID Venta</th>
			<th>Fecha</th>
			<th>Monto</th>
			<th>Cantidad</th>
			<th>Vendedor</th>
			<th></th>
			</tr>
		</thead>
		<tbody>
			{ventas.length > 0 ? (
			ventas.map((sale) => (
				<tr key={sale.id}>
					<td>
						<Form.Check />
					</td>
					<td>{sale.id}</td>
					<td>{sale.fecha}</td>
					<td>{sale.monto}</td>
					<td>{sale.cantidad}</td>
					<td>{sale.vendedor}</td>
					<td>
						<ButtonGroup className={classes.buttons}>
							<Button variant="link" className={classes.noBorder}>
								<Image className={classes.image} src={iconTrash}/>
							</Button>
							<Button variant="link" className={classes.noBorder}>
								<Image className={classes.image} src={iconPencil}/>
							</Button>
						</ButtonGroup>
					</td>
				</tr>
			))
			) : (
			<tr className={classes.emptyState}>
				<td colSpan='7'>No hay ventas registradas hasta el momento</td>
			</tr>
			)}
		</tbody>
		</Table>
	</div>
  );
};

export default SalesTable;
