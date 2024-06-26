import React, { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import logo from "../../assets/images/LogoHNP1.png";
import iconShow from '../../assets/images/eye_show.png';
import iconHide from '../../assets/images/eye_hide.png';
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { AuthContext } from "../../App";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const { expirationMessage } = useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('login_time');
        localStorage.removeItem('user_id');
    }, []);

    async function signIn(e) {
        e.preventDefault();
        if (user === "" || password === "") {
            toast.error("Por favor, complete todos los campos.");
        } else {
            try {
                const response = await fetch('http://3.144.21.179:8000/bazar/api/login/', {
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
                    toast.error("Usuario y/o contraseña incorrecto(s)");
                    return false;
                }
                const data = await response.json();
                const isSuperuserResponse = await fetch('http://3.144.21.179:8000/bazar/is-superuser/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.access}`
                    }
                });
                const isSuperuserData = await isSuperuserResponse.json();
                if (!isSuperuserResponse.ok || isSuperuserData.is_superuser !== true) {
                    toast.error("No tienes permiso para iniciar sesión");
                    return false;
                }
                const now = new Date().getTime();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('login_time', now.toString());
                const userDataResponse = await fetch('http://3.144.21.179:8000/bazar/user-data', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.access}`
                    }
                });
                const userData = await userDataResponse.json();
                if (!userDataResponse.ok) {
                    throw new Error('Error al obtener los datos del usuario.');
                }
                localStorage.setItem('user_id', userData.user_id);
                window.location.reload();
            } catch (error) {
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
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
                            <div className={classes.password_container}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`${classes.form_control} mt-1`}
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button type="button" onClick={togglePasswordVisibility} className={classes.password_toggle_button}>
                                    <img className={classes.image} src={showPassword ? iconHide : iconShow} alt="Toggle Password Visibility" />
                                </button>
                            </div>
                        </div>
                        <br/>
                        <div className={`d-grid gap-2 mt-3 ${classes.button_container}`}>
                            <button type="submit" className={`btn btn-primary ${classes.btn_login}`}>
                                Ingresar
                            </button>
                        </div>
                        <br/>
                        <h5 className={classes.download_title}>
                                Descarga la aplicación móvil&nbsp;
                                <NavLink to="/Descarga" className={classes.download_link}>aquí</NavLink>
                            </h5>
                    </div>
                </form>
            </div>
        </>
    );
}
