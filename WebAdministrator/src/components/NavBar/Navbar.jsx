import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import logo from "../../assets/images/LogoHNP.png";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
      <div className={classes.logo_container}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </div>
      <div className={classes.menu} onClick={() => {
        setMenuOpen(!menuOpen)
      }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <>
      <ul className={menuOpen ? classes.open : ""}>
        <li><NavLink to="/Ventas">Ventas</NavLink></li>
        <li><NavLink to="/Usuarios">Usuarios</NavLink></li>
        <li><NavLink to="/Estadisticas">Estadísticas</NavLink></li>
        <li><NavLink to="/Registros">Registros</NavLink></li>
      </ul>
      <div className={classes.logout_container}>
        <Link to="/" className={classes.nav_btn_link}>Cerrar Sesión</Link>
      </div>
      </>
    </nav>
  );
};

export default Navbar;