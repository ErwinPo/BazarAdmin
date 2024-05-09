import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../assets/images/LogoHNP1.png";
import classes from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }, []);

  async function signIn(e) {
    e.preventDefault();
    if (user === "" || password === "") {
      toast.error("Por favor, complete todos los campos.");
    } else {
      try {
        const response = await fetch('http://3.146.65.111:8000/bazar/api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            password: password
          })
        });
        if (!response.ok) {
          throw new Error('Usuario y/o contraseña incorrecto(s).');
        }
        const data = await response.json();
        const isSuperuserResponse = await fetch('http://3.146.65.111:8000/bazar/is-superuser/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${data.access}`
          }
        });
        const isSuperuserData = await isSuperuserResponse.json();
        if (!isSuperuserResponse.ok || isSuperuserData.is_superuser !== true) {
          throw new Error('No tienes permiso para iniciar sesión.');
        }
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        window.location.reload();
      } catch (error) {
        toast.error(error.message);
        setUser("");
        setPassword("");
      }
    }
  }

  function handleUserChange(e) {
    setUser(e.target.value);
    setLoginError(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setLoginError(false);
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className={classes.Login_form_container}>
        <form className={classes.Login_form} id="Login-f" onSubmit={signIn}>
          <div className={classes.Login_form_content}>
            <div className={classes.logo_containerL}>
              <img src={logo} alt="Logo" className={classes.logoL} />
            </div>
            <h3 className={classes.Login_form_title}>INICIO DE SESIÓN</h3>
            <div className={`${classes.form_group} mt-3`}>
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
    </>
  );
}
