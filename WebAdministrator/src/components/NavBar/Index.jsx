import React from "react";
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from "./NavbarElements";

import logo from "../../assets/images/LogoHNP.png"

const Navbar = () => {
	return (
		<>
			<Nav>
				<div style={{ display: 'flex', alignItems: 'center', marginLeft: '0px' }}>
                    <img src={logo} alt="Logo" style={{ height: '85px', width: 'auto' }} />
                </div>
				<Bars />
				<NavMenu>
					<NavLink to="/Ventas" >
						Ventas
					</NavLink>
					<NavLink to="/Usuarios" activeStyle>
						Usuarios
					</NavLink>
					<NavLink to="/Estadisticas" activeStyle>
						Estadisticas
					</NavLink>
					<NavLink to="/Registros" activeStyle>
						Registros
					</NavLink>
				</NavMenu>
				<NavBtn>
					<NavBtnLink to="/logout">
						Cerrar Sesión
					</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
