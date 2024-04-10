import SalesTable from "../components/Table/SalesTable"
import Navbar from "../components/NavBar/Index";

const Registros = ( {sales} ) => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "centre",
				flexDirection: "column",
				alignItems: "centre",
				height: "100vh",
			}}
		>
			<Navbar />
			<SalesTable sales={sales} />
		</div>
	);
};

export default Registros;