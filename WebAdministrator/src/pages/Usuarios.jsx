import React from "react";
import Navbar from "../components/NavBar/Navbar";

const Usuarios = () => {
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
			<h1>Usuarios</h1>
		</div>
	);
};

export default Usuarios;
