import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/LogoHNP.png";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu" onClick={() => {
        setMenuOpen(!menuOpen)
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li><NavLink to="/Ventas">Ventas</NavLink></li>
        <li><NavLink to="/Usuarios">Usuarios</NavLink></li>
        <li><NavLink to="/Estadisticas">Estadísticas</NavLink></li>
        <li><NavLink to="/Registros">Registros</NavLink></li>
        <Link to="/" className="nav-btn-link">Cerrar Sesión</Link>
      </ul>
    </nav>
  );
};

export default Navbar;