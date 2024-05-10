import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import logo from "../../assets/images/LogoHNP.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 845);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
    window.location.reload();
  };

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
            <button onClick={handleLogout} className={classes.nav_btn_link}>
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
      {!isMobile && (
        <div className={classes.logout_container}>
          <button onClick={handleLogout} className={classes.nav_btn_link}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
