import React from "react";
import Navbar from "../components/NavBar/Navbar";
import classes from "./Download.module.css";

const Download = () => {
    return(
        <div>
            {localStorage.getItem('access_token') && (
                <Navbar/>
            )}
            <br/>
            <h1 className={classes.header_title}>¡Descarga la Aplicacion Móvil!</h1>
            <h5 className={classes.text_under}>Disponible solo para dispositivos Android</h5>
            <img src="src/assets/images/qr_image.png" alt="QR Code" className={classes.qr_image}/>
            <h5 className={classes.text_alt}>Si estas viendo esto desde un dispositivo móvil, descargala <a href="http://3.146.65.111:8000/bazar/download-apk-hnp/">aqui</a></h5>
        </div>
    );
};

export default Download;