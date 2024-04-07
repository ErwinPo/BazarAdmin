import Table from 'react-bootstrap/Table';
import classes from './SalesTable.module.css';

const SalesTable = ( {ventas} ) => {
return (
	<Table className={classes.tableCustom} bordered hover responsive size="sm">
		<thead className={classes.tableHeadCustom}>
		<tr className={classes.example}>
			<th className={classes.example}>ID Venta</th>
			<th>Fecha</th>
			<th>Monto</th>
			<th>Cantidad</th>
			<th>Vendedor</th>
			<th>Acciones</th>
		</tr>
		</thead>
		<tbody>
			{ventas.length > 0 ? (
						ventas.map((sale) => (
							<tr key={sale.id}>
								<td>{sale.id}</td>
								<td>{sale.fecha}</td>
								<td>{sale.monto}</td>
								<td>{sale.cantidad}</td>
								<td>{sale.vendedor}</td>
								<td>Acciones</td>
							</tr>
						))
					) : (
						<tr className=''>
							<td colSpan="6">No hay ventas registradas hasta el momento</td>
						</tr>
			)}
		</tbody>
	</Table>
	);
};

export default SalesTable;
