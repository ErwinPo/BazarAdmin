import Navbar from "../components/NavBar/Navbar";
import UsersTable from "../components/Table/UsersTable";
import { Button } from 'react-bootstrap';
import classes from '../components/Table/UsersTable.module.css';

const Usuarios = ({users}) => {
	return (
		<div>
			<Navbar />
			<Button className={classes.addButton}>Agregar Usuario</Button>
			<UsersTable users={users} />
		</div>
	);
};

export default Usuarios;
