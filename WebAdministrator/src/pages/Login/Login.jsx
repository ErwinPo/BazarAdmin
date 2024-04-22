import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";
import logo from "../../assets/images/LogoHNP1.png";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  function signIn(e) {
    e.preventDefault();
    if (user === "" || password === "") {
      setEmptyFieldError(true);
      setLoginError(false);
    } else if (user === "admin" && password === "hola123") {
      navigate('/Ventas');
    } else {
      setLoginError(true);
      setEmptyFieldError(false);
      setUser("");
      setPassword("");
    }
  }

  return (
    <div className="Login-form-container">
      <form className="Login-form" id="Login-f" onSubmit={signIn}>
        <div className="Login-form-content">
          <div className="logo-containerL">
            <img src={logo} alt="Logo" className="logoL" />
          </div>
          <h3 className="Login-form-title">INICIO DE SESIÓN</h3>
          <div className="form-group mt-3">
            {emptyFieldError && <p className="error-message">Por favor llena los campos vacíos</p>}
            {loginError && <p className="error-message">Usuario y/o Contraseña incorrecto(s)</p>}
            <h5 className="Login-form-name">Usuario</h5>
            <input
              type="text"
              className="form-control mt-1"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <h5 className="Login-form-name">Contraseña</h5>
            <input
              type="password"
              className="form-control mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br/>
          <div className="d-grid gap-2 mt-3 button-container">
            <button type="submit" className="btn btn-primary btn-login">
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
