/* Copyright 2024 BitBrothers
 * File: Login.jsx
 * Type: component */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/LogoHNP1.png";
import classes from "./Login.module.css";

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
    } else if (user === "admin" && password === "hola1234") {
      navigate('/Ventas');
    } else {
      setLoginError(true);
      setEmptyFieldError(false);
      setUser("");
      setPassword("");
    }
  }

  function handleUserChange(e) {
    setUser(e.target.value);
    setEmptyFieldError(false);
    setLoginError(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setEmptyFieldError(false);
    setLoginError(false);
  }

  return (
    <div className={classes.Login_form_container}>
      <form className={classes.Login_form} id="Login-f" onSubmit={signIn}>
        <div className={classes.Login_form_content}>
          <div className={classes.logo_containerL}>
            <img src={logo} alt="Logo" className={classes.logoL} />
          </div>
          <h3 className={classes.Login_form_title}>INICIO DE SESIÓN</h3>
          <div className={`${classes.form_group} mt-3`}>
            {emptyFieldError && <p className={classes.error_message}>Por favor llena los campos vacíos</p>}
            {loginError && <p className={classes.error_message}>Usuario y/o Contraseña incorrecto(s)</p>}
            <h5 className={classes.Login_form_name}>Usuario</h5>
            <input
              type="text"
              className={`${classes.form_control} mt-1`}
              value={user}
              onChange={handleUserChange}
            />
          </div>
          <div className={`${classes.form_group} mt-3`}>
            <h5 className={classes.Login_form_name}>Contraseña</h5>
            <input
              type="password"
              className={`${classes.form_control} mt-1`}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <br/>
          <div className={`d-grid gap-2 mt-3 ${classes.button_container}`}>
            <button type="submit" className={`btn btn-primary ${classes.btn_login}`}>
              Ingresar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
