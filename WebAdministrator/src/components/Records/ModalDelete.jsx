/* Copyright 2024 BitBrothers
 * File: ModalDelete.jsx
 * Type: component */

import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import classes from './Modals.module.css';

const ModalDelete = ({ deleteAllModalOpen, handleDeleteSelected, toggleDeleteAllModal }) =>{
    return (
        <Modal isOpen={deleteAllModalOpen}>
            <ModalHeader className={classes.modal_header}>
            <div>
                <h3>Eliminar Venta</h3>
            </div>
            </ModalHeader>
            <ModalBody>
            <FormGroup>
                <label>¿Estás seguro que deseas eliminar esta venta?</label>
            </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Btn color='success' onClick={handleDeleteSelected}>Confirmar</Btn>
            <Btn color='danger' onClick={toggleDeleteAllModal}>Cancelar</Btn>
            </ModalFooter>
        </Modal>
    );
}

export default ModalDelete