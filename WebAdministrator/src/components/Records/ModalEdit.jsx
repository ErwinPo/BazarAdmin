/* Copyright 2024 BitBrothers
 * File: ModalEdit.jsx
 * Type: component */

import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import classes from './Modals.module.css';

const ModalEdit = ({ sale, editModalOpen, handleEdit, toggleEditModal }) =>{
    return (
        <Modal isOpen={editModalOpen}>
            <ModalHeader className={classes.modal_header}>
                <div>
                <h3>Editar Venta</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                <label>Id:</label>
                <input className='form-control' readOnly type='text' value={sale.sale_id} />
                </FormGroup>
                <FormGroup>
                <label>Monto:</label>
                <input className='form-control' name='amount' type='text' value={sale.amount}  />
                </FormGroup>
                <FormGroup>
                <label>Cantidad:</label>
                <input className='form-control' name='quantity' type='text' value={sale.quantity}  />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Btn color='success' onClick={() => {handleEdit(sale.amount, sale.sale_id, sale.quantity)}}>Guardar</Btn>
                <Btn color='danger' onClick={toggleEditModal}>Cancelar</Btn>
            </ModalFooter>
        </Modal>
    );
}

export default ModalEdit