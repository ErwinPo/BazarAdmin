import React from "react";
import Navbar from "../components/NavBar/Navbar";
import classes from "./Download.module.css";

const Download = () => {
    return(
        <div>
            <Navbar/>
            <br/>
            <h1 className={classes.header_title}>¡Descarga la Aplicacion Móvil!</h1>
            <h5 className={classes.text_under}>Disponible solo para dispositivos Android</h5>
            <img src="src/assets/images/qr_test.png" alt="QR Code" className={classes.qr_image}/>
            <h5 className={classes.text_alt}>Si estas viendo esto desde un dispositivo móvil, descargala <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">aqui</a></h5>
        </div>
    );
};

export default Download;