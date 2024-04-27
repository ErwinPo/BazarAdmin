/* Copyright 2024 BitBrothers
 * File: ModalDeleteSelected.jsx
 * Type: component */

import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import classes from './Modals.module.css';

const ModalDeleteSelected = ({ deleteAllModalOpen, handleDeleteSelected, toggleDeleteAllModal }) =>{
    return (
        <Modal isOpen={deleteAllModalOpen}>
            <ModalHeader className={classes.modal_header}>
            <div>
                <h3>Eliminar Ventas Seleccionadas</h3>
            </div>
            </ModalHeader>
            <ModalBody>
            <FormGroup>
                <label>¿Estás seguro que deseas eliminar todas las ventas que has seleccionado?</label>
            </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Btn color='success' onClick={handleDeleteSelected}>Confirmar</Btn>
            <Btn color='danger' onClick={toggleDeleteAllModal}>Cancelar</Btn>
            </ModalFooter>
        </Modal>
    );
}

export default ModalDeleteSelected