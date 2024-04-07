import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import "./NavbarStyles.css";

import logo from "../../assets/images/LogoHNP.png";

const Navbar = () => {

    return (
        <>
            <nav className="nav">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>

                <FaBars className="bars" />
                <div className="nav-menu">
                    <Link to="/Ventas" className="nav-link" activeClassName="active">
                        Ventas
                    </Link>
                    <Link to="/Usuarios" className="nav-link" activeClassName="active">
                        Usuarios
                    </Link>
                    <Link to="/Estadisticas" className="nav-link" activeClassName="active">
                        Estadisticas
                    </Link>
                    <Link to="/Registros" className="nav-link" activeClassName="active">
                        Registros
                    </Link>
                </div>
                <nav className="nav-btn">
                    <Link to="/logout" className="nav-btn-link">
                        Cerrar Sesión
                    </Link>
                </nav>
            </nav>
        </>
    );
};

export default Navbar;
