/* Copyright 2024 BitBrothers
 * File: ModalEdit.jsx
 * Type: component */

import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import classes from './Modals.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalEdit = ({ sale, editModalOpen, handleEdit, toggleEditModal, setCurrentSaleEdit }) =>{
    const handleInputChange = (field, value) => {
        if (field === 'quantity' && (value === '' || /^\d+$/.test(value)) && value >= 0 && value <= 1000000) {
            setCurrentSaleEdit(prevState => ({
                ...prevState,
                [field]: value
            }));
        } else if (field === 'amount' && (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) && value >= 0 && value <= 1000000) {
            setCurrentSaleEdit(prevState => ({
                ...prevState,
                [field]: value
            }));
        }
    };    

    const handleEditIfValid = (amount, id, quantity, sale_index) => {
        if (amount && quantity && amount > 0 && quantity > 0) {
            handleEdit(amount, id, quantity, sale_index);
        }
        else if (amount <= 0 || quantity <= 0) {
            toast.error("Monto o Cantidad inválidos."); 
        } 
        else {
            toast.error("Por favor, complete todos los campos.");
        }
    };    
    
    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <Modal isOpen={editModalOpen}>
                <ModalHeader className={classes.modal_header}>
                    <div>
                    <h3>Editar Venta</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <label>Id:</label>
                    <input className='form-control' readOnly type='text' value={sale.id} />
                    </FormGroup>
                    <FormGroup>
                    <label>Monto:</label>
                    <input className='form-control' onChange={(e) => handleInputChange('amount', e.target.value)} name='amount' type='text' value={sale.amount}  />
                    </FormGroup>
                    <FormGroup>
                    <label>Cantidad:</label>
                    <input className='form-control' onChange={(e) => handleInputChange('quantity', e.target.value)} name='quantity' type='text' value={sale.quantity}  />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Btn color='success' onClick={() => {handleEditIfValid(sale.amount, sale.id, sale.quantity, sale.sale_index)}}>Guardar</Btn>
                    <Btn color='danger' onClick={toggleEditModal}>Cancelar</Btn>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ModalEdit