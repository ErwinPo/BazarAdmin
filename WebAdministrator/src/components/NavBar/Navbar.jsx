import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import logo from "../../assets/images/LogoHNP.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 980);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className={classes.logo_container}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </div>
      <div
        className={classes.menu}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? classes.open : ""}>
        <li>
          <NavLink to="/Ventas">Ventas</NavLink>
        </li>
        <li>
          <NavLink to="/Usuarios">Usuarios</NavLink>
        </li>
        <li>
          <NavLink to="/Estadisticas">Estadísticas</NavLink>
        </li>
        <li>
          <NavLink to="/Registros">Registros</NavLink>
        </li>
        {isMobile && (
          <li>
            <NavLink to="/" className={classes.nav_btn_link}>
              Cerrar Sesión
            </NavLink>
          </li>
        )}
      </ul>
      {!isMobile && (
        <div className={classes.logout_container}>
          <NavLink to="/" className={classes.nav_btn_link}>
            Cerrar Sesión
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
