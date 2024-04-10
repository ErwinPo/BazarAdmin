import React from "react";
import Navbar from "../components/NavBar/Index";

const Estadisticas = () => {
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
			<h1>Estadísticas</h1>
		</div>
	);
};

export default Estadisticas;
