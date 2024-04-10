import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import "./NavbarStyles.css"
import logo from "../../assets/images/LogoHNP.png";

const Navbar = () => {
    return (
        <div className="nav-bar-container">
            <nav className="nav-custom">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <FaBars className="bars" />
                <div className="nav-menu">
                    <Link to="/Ventas" className="nav-link" activeclassname="active">
                        Ventas
                    </Link>
                    <Link to="/Usuarios" className="nav-link" activeclassname="active">
                        Usuarios
                    </Link>
                    <Link to="/Estadisticas" className="nav-link" activeclassname="active">
                        Estadisticas
                    </Link>
                    <Link to="/Registros" className="nav-link" activeclassname="active">
                        Registros
                    </Link>
                    <nav className="nav-btn">
                    <Link to="/logout" className="nav-btn-link">
                        Cerrar Sesión
                    </Link>
                    </nav>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
