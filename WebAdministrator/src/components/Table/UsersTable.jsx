/* Copyright 2024 BitBrothers
 * File: UsersTable.jsx
 * Type: component */

// imports
import React, { useState } from 'react';
import classes from './UsersTable.module.css';
import {Button, ButtonGroup, Form, Image, Table, Container} from 'react-bootstrap';
import {Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import iconPencil from '../../assets/images/icon_pencil.png';
import iconTrash from '../../assets/images/icon_trash.png';

const users = [
  { id: 1, username: "Gissel", password: "Hola1234", usertype: "Administrador"},
  { id: 2, username: "Leticia", password: "contraseña123", usertype: "Vendedor"},
  { id: 3, username: "Israel", password: "abc123", usertype: "Vendedor"}
];

class UsersTable extends React.Component {
  state={
    users: users,
    form: {
      id:'',
      username: '',
      password: '',
      usertype: ''
    },
    insertModal: false,
    editModal: false,
    deleteModal: false,
  };

  handleChange = e=>{
    this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  showModalInsert=()=>{
    this.setState({insertModal: true});
  }

  hideModalInsert=()=>{
    this.setState({insertModal: false});
  }

  showModalEdit=(user)=>{
    this.setState({editModal: true, form: user});
  }

  hideModalEdit=()=>{
    this.setState({editModal: false});
  }

  showModalDelete=(user)=>{
    this.setState({deleteModal: true, form: user});
  }

  hideModalDelete=()=>{
    this.setState({deleteModal: false});
  }

  insertUser = () => {
    const { username, password, usertype } = this.state.form;
    if (!username || !password || !usertype) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const newUser = { ...this.state.form };
    newUser.id = this.state.users.length + 1;
    const updatedUsers = [...this.state.users, newUser];
    this.setState({ users: updatedUsers, insertModal: false });
  }
  
  editUser = () => {
    const { id, username, password, usertype } = this.state.form;
    if (!username || !password || !usertype) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    const updatedUsers = this.state.users.map(user => {
      if (user.id === id) {
        return { ...user, username, password, usertype };
      }
      return user;
    });
    
    this.setState({ users: updatedUsers, editModal: false });
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
              <th>
                <Form.Check className={classes.checkBox} />
              </th>
              <th>ID</th>
              <th>Nombre</th>
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
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={this.state.users.length+1}/>
          </FormGroup>
          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name='username' type='text' onChange={this.handleChange}/>
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
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={this.state.form.id}/>
          </FormGroup>
          <FormGroup>
            <label>Nombre:</label>
            <input className='form-control' name='username' type='text' onChange={this.handleChange} value={this.state.form.username}/>
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
          <Btn color='success' onClick={()=>this.editUser(this.state.form)}>Guardar</Btn>
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

    </>
    )
  }
};

export default UsersTable;