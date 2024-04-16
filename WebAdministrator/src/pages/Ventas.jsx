import React from "react";
import Navbar from "../components/NavBar/Navbar";

const Ventas = () => {
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
			<h1>Ventas</h1>
		</div>
	);
};

export default Ventas;
