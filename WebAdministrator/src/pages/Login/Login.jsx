import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css";
import logo from "../../assets/images/LogoHNP1.png";

export default function Login(){

    const navigate = useNavigate();

    const [myLogin, setLogin] = useState("false");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    /*function signIn(e){
        e.preventDefault();
        var txt_user = document.getElementById("txt_user").value;
        var txt_pswd = document.getElementById("txt_pswd").value;
        if(txt_user.length===0 || txt_pswd.length==0){
            alert("Completa los datos faltantes");
        } else{
            if(user === "admin" && password === "hola123"){
                setLogin("true")
            } else{
                setLogin("false")
                alert("Usuario y/o Contraseña incorrecto(s)");
                document.getElementById("txt_user").value = "";
                document.getElementById("txt_pswd").value = "";
                document.getElementById("txt_user").focus();
            }
        }
    }*/

    function signIn(e){
      e.preventDefault();
      setLogin("true")
    }

	return (
        <div className="Login-form-container">
        <form className="Login-form" id="Login-f">
          <div className="Login-form-content">
            <div className="logo-containerL">
                <img src={logo} alt="Logo" className="logoL" />
            </div>
            <h3 className="Login-form-title">INICIO DE SESIÓN</h3>
            <div className="form-group mt-3">
              <h5 className="Login-form-name">Usuario</h5>
              <input
                type="text"
                id="txt_user"
                className="form-control mt-1"
                onChange={ (e)=>setUser(e.target.value) }
                required
              />
            </div>
            <div className="form-group mt-3">
              <h5 className="Login-form-name">Contraseña</h5>
              <input
                type="password"
                id="txt_pswd"
                className="form-control mt-1"
                onChange={ (e)=>setPassword(e.target.value) }
                required
              />
            </div>
            <br/>
            <div className="d-grid gap-2 mt-3 button-container">
              <button type="submit" 
              className="btn btn-primary btn-login"
              onClick={ signIn }
              >
                Ingresar
              </button>
            </div>
            <br></br>
          </div>
        </form>

        { myLogin === "true" && navigate('/Ventas')}

      </div>
	);
};