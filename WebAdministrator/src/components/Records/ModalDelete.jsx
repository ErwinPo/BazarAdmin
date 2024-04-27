/* Copyright 2024 BitBrothers
 * File: ModalDelete.jsx
 * Type: component */

import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import classes from './Modals.module.css';

const ModalDelete = ({ sale_id, deleteModalOpen, handleDelete, toggleDeleteModal }) =>{
    return (
        <Modal isOpen={deleteModalOpen}>
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
            <Btn color='success' onClick={() => {handleDelete(sale_id)}}>Confirmar</Btn>
            <Btn color='danger' onClick={toggleDeleteModal}>Cancelar</Btn>
            </ModalFooter>
        </Modal>
    );
}

export default ModalDelete