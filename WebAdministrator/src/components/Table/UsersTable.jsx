/* Copyright 2024 BitBrothers
 * File: UsersTable.jsx
 * Type: component */

// imports
import React, { useState } from 'react';
import classes from './UsersTable.module.css';
import {Button, ButtonGroup, Form, Image, Table} from 'react-bootstrap';
import {Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import iconPencil from '../../assets/images/icon_pencil.png';
import iconTrash from '../../assets/images/icon_trash.png';

const users = [
  { id: 1, username: "Gissel", mail: "gissel@gmail.com", password: "Hola1234", usertype: "Administrador"},
  { id: 2, username: "Leticia", mail: "lety@gmail.com", password: "contraseña123", usertype: "Vendedor"},
  { id: 3, username: "Israel", mail: "israel@gmail.com", password: "abc123", usertype: "Vendedor"},
  { id: 4, username: "Josafat", mail: "josafat@gmail.com", password: "12345678", usertype: "Vendedor"},
  { id: 5, username: "Raúl", mail: "raul@gmail.com", password: "12345678", usertype: "Vendedor"},
  { id: 6, username: "Erwin", mail: "erwin@gmail.com", password: "12345678", usertype: "Vendedor"},
  { id: 7, username: "Diego", mail: "diego@gmail.com", password: "12345678", usertype: "Vendedor"},
  { id: 8, username: "David", mail: "david@gmail.com", password: "12345678", usertype: "Vendedor"},
  { id: 9, username: "Daniel", mail: "daniel@gmail.com", password: "12345678", usertype: "Vendedor"},
];

class UsersTable extends React.Component {
  state={
    users: users,
    form: {
      id:'',
      username: '',
      mail: '',
      password: '',
      usertype: ''
    },
    insertModal: false,
    editModal: false,
    deleteModal: false,
    errorModal: false,
    adminCountBeforeEdit: 0
  };

  handleChange = e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
      errorMessage: ''
    });
  }

  showModalInsert=()=>{
    this.setState({insertModal: true});
  }

  hideModalInsert=()=>{
    this.setState({insertModal: false});
    this.hideErrorMessage();
  }

  showModalEdit=(user)=>{
    const adminCountBeforeEdit = this.state.users.filter(u => u.usertype === 'Administrador').length;
    this.setState({ editModal: true, form: user, adminCountBeforeEdit });
  }

  hideModalEdit=()=>{
    this.setState({editModal: false});
    this.hideErrorMessage();
  }

  hideErrorMessage = () => {
    this.setState({ errorMessage: '' });
  }

  showModalDelete=(user)=>{
    const adminUsers = this.state.users.filter(user => user.usertype === 'Administrador');
    if (adminUsers.length === 1 && user.usertype === 'Administrador') {
      this.setState({errorModal: true, form: user});
    } else {
      this.setState({deleteModal: true, form: user});
    }
  }

  hideModalDelete=()=>{
    this.setState({deleteModal: false});
  }

  showModalError=(user)=>{
    this.setState({errorModal: true, form: user});
  }

  hideModalError=()=>{
    this.setState({errorModal: false});
  }

  resetForm = () => {
    this.setState({
      form: {
        id: '',
        username: '',
        mail: '',
        password: '',
        usertype: ''
      },
      errorMessage: ''
    });
  }

  checkDuplicateUsername = (username, userId) => {
    return this.state.users.some(user => user.id !== userId && user.username.toLowerCase() === username.toLowerCase());
  }
  
  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password);
  }

  insertUser = () => {
    const { username, mail, password, usertype } = this.state.form;
    if (!username || !mail || !password || !usertype) {
      this.setState({ errorMessage: "Por favor, completa todos los campos." });
      return;
    }
    if (this.checkDuplicateUsername(username)) {
      this.setState({ errorMessage: "El nombre de usuario ya está en uso." });
      return;
    }
    if (!this.validateEmail(mail)) {
      this.setState({ errorMessage: "Por favor, introduce un correo electrónico válido." });
      return;
    }
    if (!this.validatePassword(password)) {
      this.setState({ errorMessage: "La contraseña debe tener al menos 8 caracteres y contener al menos un número." });
      return;
    }
    const newUser = { ...this.state.form };
    newUser.id = this.state.users.length + 1;
    const updatedUsers = [...this.state.users, newUser];
    this.setState({ users: updatedUsers, insertModal: false });
    this.resetForm();
  }
  
  editUser=()=>{
    const { id, username, mail, password, usertype } = this.state.form;
    const { adminCountBeforeEdit } = this.state;
    if (!username || !mail || !password || !usertype) {
      this.setState({ errorMessage: "Por favor, completa todos los campos." });
      return;
    }
    if (this.checkDuplicateUsername(username, id)) {
      this.setState({ errorMessage: "El nombre de usuario ya está en uso." });
      return;
    }
    if (!this.validateEmail(mail)) {
      this.setState({ errorMessage: "Por favor, introduce un correo electrónico válido." });
      return;
    }
    if (!this.validatePassword(password)) {
      this.setState({ errorMessage: "La contraseña debe tener al menos 8 caracteres y contener al menos un número." });
      return;
    }
    if (usertype === 'Vendedor' && adminCountBeforeEdit === 1) {
      this.setState({ errorMessage: "No es posible guardar los cambios ya que debe haber al menos un usuario de tipo Administrador." });
      return;
    }
    const updatedUsers = this.state.users.map(user => {
      if (user.id === id) {
        return { ...user, username, mail, password, usertype };
      }
      return user;
    });
    this.setState({ users: updatedUsers, editModal: false });
    this.resetForm();
  }
  

  deleteUser=(data)=>{
    var cont = 0;
    var list = this.state.users;
    list.map((user)=>{
      if(data.id==user.id){
        list.splice(cont, 1);
      }
      cont++;
    });
    this.setState({data:list, deleteModal: false})
    this.resetForm();
  }

  render(){
    return(
    <>
      <>
        <div className={classes.btn_container}>
          <Button variant="warning" className={classes.addButton} onClick={()=>this.showModalInsert()}>Agregar Usuario</Button>
      </div>
      <div className={classes.tableCover}>
        <Table bordered responsive size='lg' variant='dark' className={classes.table}>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Tipo Usuario</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td><Form.Check /></td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.mail}</td>
                  <td>{'•'.repeat(user.password.length)}</td>
                  <td>{user.usertype}</td>
                  <td>
                    <ButtonGroup className={classes.buttons}>
                    <Button variant="link" className={classes.noBorder} onClick={()=>this.showModalEdit(user)}>
                        <Image className={classes.image} src={iconPencil}/>
                      </Button>
                      <Button variant="link" className={classes.noBorder} onClick={()=>this.showModalDelete(user)}>
                        <Image className={classes.image} src={iconTrash}/>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      </>
      
      <Modal isOpen={this.state.insertModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Nuevo Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          {this.state.errorMessage && <div className={classes.error_message}>{this.state.errorMessage}</div>}
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={this.state.users.length+1}/>
          </FormGroup>
          <FormGroup>
            <label>Nombre de Usuario:</label>
            <input className='form-control' name='username' type='text' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input className='form-control' name='mail' type='text' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <label>Contraseña:</label>
            <input className='form-control' name='password' type='text' onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <label>Tipo de Usuario:</label>
            <select className='form-control' name='usertype' onChange={this.handleChange} defaultValue=''>
              <option value='' disabled>Selecciona una opción</option>
              <option value='Administrador'>Administrador</option>
              <option value='Vendedor'>Vendedor</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={()=>this.insertUser()}>Crear</Btn>
          <Btn color='danger' onClick={()=>this.hideModalInsert()}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.editModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          {this.state.errorMessage && <div className={classes.error_message}>{this.state.errorMessage}</div>}
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={this.state.form.id}/>
          </FormGroup>
          <FormGroup>
            <label>Nombre de Usuario:</label>
            <input className='form-control' name='username' type='text' onChange={this.handleChange} value={this.state.form.username}/>
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input className='form-control' name='mail' type='text' onChange={this.handleChange} value={this.state.form.mail}/>
          </FormGroup>
          <FormGroup>
            <label>Contraseña:</label>
            <input className='form-control' name='password' type='text' onChange={this.handleChange} value={this.state.form.password}/>
          </FormGroup>
          <FormGroup>
            <label>Tipo de Usuario:</label>
            <select className='form-control' name='usertype' onChange={this.handleChange} value={this.state.form.usertype}>
              <option value='' disabled>Selecciona una opción</option>
              <option value='Administrador'>Administrador</option>
              <option value='Vendedor'>Vendedor</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={()=>this.editUser()}>Guardar</Btn>
          <Btn color='danger' onClick={()=>this.hideModalEdit()}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.deleteModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Eliminar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>¿Estás seguro que deseas eliminar este usuario?</label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={()=>this.deleteUser(this.state.form)}>Confirmar</Btn>
          <Btn color='danger' onClick={()=>this.hideModalDelete()}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.errorModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Error</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>No es posible eliminar este usuario ya que debe existir al menos un usuario de tipo Administrador</label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={()=>this.hideModalError()}>Aceptar</Btn>
        </ModalFooter>
      </Modal>

    </>
    )
  }
};

export default UsersTable;
