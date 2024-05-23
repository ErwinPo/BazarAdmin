import React, { useState } from "react";
import classes from "./ResetPassword.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ResetPassword = () => {
    const {uidb64} = useParams();
    const {token} = useParams();
    const [validated, setValidated] = useState(false);
    const passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
    const navigate = useNavigate();

    const handleChangePassword = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if(form.checkValidity() === false){
            event.preventDefault();
			event.stopPropagation();
            toast.error("Error: Contraseña no valida.");

            form.elements.passwordGrp.value = "";
            form.elements.passwordConGrp.value = "";
            setValidated(true);
        } else {
            if(form.elements.passwordGrp.value != form.elements.passwordConGrp.value){
                event.preventDefault();
                event.stopPropagation();
                toast.error("Error: Las Contraseñas no coinciden.");

                form.elements.passwordGrp.value = "";
                form.elements.passwordConGrp.value = "";
                setValidated(false);
            } else {
                setValidated(true);
                navigate("/");
            }
        }
    }
    
    return(
        <div className={classes.content}>
            <br/>
            <h1 className={classes.header_title}>Reseteo de Contraseña</h1>
            <br/>
            <Form noValidate validated={validated} onSubmit={handleChangePassword}>
                <Form.Group className={classes.form_grp} controlId="passwordGrp">
                    <Form.Label>Nueva Contraseña</Form.Label>
                    <Form.Control pattern={passwordPattern} className={classes.control_input} required />
                    <Form.Control.Feedback type="invalid">La contraseña debe tener al menos 8 caracteres y al menos un número.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className={classes.form_grp} controlId="passwordConGrp">
                    <Form.Label>Confirmación de Nueva Contraseña</Form.Label>
                    <Form.Control pattern={passwordPattern} className={classes.control_input} required />
                    <Form.Control.Feedback type="invalid">La contraseña debe tener al menos 8 caracteres y al menos un número.</Form.Control.Feedback>
                </Form.Group>

                <Button variant="warning" type="submit" className={classes.changePwd_btn}>
                    Cambiar
                </Button> 
            </Form>
        </div>
    );
};

export default ResetPassword;