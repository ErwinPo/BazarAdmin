/* Copyright 2024 BitBrothers
 * File: UsersTable.jsx
 * Type: component */

// imports
import React, { useState, useEffect } from 'react';
import classes from './UsersTable.module.css';
import { Button, ButtonGroup, Form, Image, Table } from 'react-bootstrap';
import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import iconPencil from '../../assets/images/icon_pencil.png';
import iconTrash from '../../assets/images/icon_trash.png';

const UsersTable = () => {

  const users = [
    { id: 1, username: "GisselAdmin", email: "gissel@gmail.com", password: "Hola1234", is_superuser: true },
    { id: 2, username: "Lety77", email: "lety@gmail.com", password: "contrasena123", is_superuser: false },
    { id: 3, username: "IsraHdez58", email: "israel@gmail.com", password: "abc12345", is_superuser: false },
    { id: 4, username: "JossGC", email: "josafat@gmail.com", password: "a12345678", is_superuser: false },
    { id: 5, username: "RaulDiaz", email: "raul@gmail.com", password: "a12345678", is_superuser: false },
  ];

  /*const [ussers, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://18.222.68.166:8000/BAZARAPI/usuarios/", {
        method: "GET"
    })
    .then((response) => response.json())
    .then(data => {
        setUsers(data.registros);
        console.log(data.registros)
    })
    .catch((error) => console.log(error));
  }, []);*/


  const [state, setState] = useState({
    users: users,
    form: {
      id: '',
      username: '',
      email: '',
      password: '',
      is_superuser: ''
    },
    insertModal: false,
    editModal: false,
    deleteModal: false,
    errorModal: false,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    const newValue = name === 'is_superuser' ? (value === 'Administrador') : value;
    setState({
      ...state,
      form: {
        ...state.form,
        [name]: newValue,
      },
    });
  };

  const handleUsernameChange = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    } else {
      setState({
        ...state,
        form: {
          ...state.form,
          username: e.target.value
        }
      });
    }
  };

  const handleMailChange = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    } else {
      setState({
        ...state,
        form: {
          ...state.form,
         email: e.target.value
        }
      });
    }
  };
  
  const handlePasswordChange = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    } else{
      setState({
        ...state,
        form: {
          ...state.form,
          password: e.target.value
        }
      });
    }
  };

  const showModalInsert = () => {
    setState({ ...state, insertModal: true });
  };

  const hideModalInsert = () => {
    setState({ ...state, insertModal: false });
  };

  const showModalEdit = (user) => {
    setState({ ...state, editModal: true, form: user});
  };

  const hideModalEdit = () => {
    setState({ ...state, editModal: false });
  };

  const showModalDelete = (user) => {
    const isAdminUser = user.is_superuser;
    const adminCount = state.users.filter(u => u.is_superuser).length;
    if (isAdminUser && adminCount === 1) {
      setState({ ...state, errorModal: true, form: user });
    } else {
      setState({ ...state, deleteModal: true, form: user });
    }
  };
  
  const hideModalDelete = () => {
    setState({ ...state, deleteModal: false });
  };

  const hideModalError = () => {
    setState({ ...state, errorModal: false });
  }

  const validateForm = () => {
    const { id, username,email, password, is_superuser } = state.form;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseUsername = username.toLowerCase();
    const lowercaseMail = email.toLowerCase();
    const isUsernameExists = state.users.some(user => user.username.toLowerCase() === lowercaseUsername && user.id !== id);
    const isEmailExists = state.users.some(user => user.email.toLowerCase() === lowercaseMail && user.id !== id);
    
    if (!username || !email || !password || is_superuser === '') {
      toast.error("Por favor, complete todos los campos.");
      return false;
    } else if (isUsernameExists) {
      toast.error("El nombre de usuario ya existe. Por favor, elija otro nombre.");
      return false;
    } else if (!emailPattern.test(email)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return false;
    } else if (isEmailExists) {
      toast.error("El correo electrónico ya está registrado. Por favor, utilice otro correo electrónico.");
      return false;
    } else if (!passwordPattern.test(password)) {
      toast.error("La contraseña debe tener al menos 8 caracteres y al menos un número.");
      return false;
    }
    return true;
  };

  const generateUniqueId = () => {
    let newId = state.users.length + 1;
    while (state.users.some(user => user.id === newId)) {
      newId++;
    }
    return newId;
  };  

  const handleCreateUser = () => {
    if (!validateForm()) {
      return;
    }
    const { username, email, password, is_superuser } = state.form;
    const newUser = {
      id: generateUniqueId(),
      username: username,
      email: email,
      password: password,
      is_superuser: is_superuser
    };
    const updatedUsers = [...state.users, newUser];
    setState({
      ...state,
      users: updatedUsers,
      insertModal: false,
      form: {
        id: '',
        username: '',
        email: '',
        password: '',
        is_superuser: ''
      }
    });
    toast.success("Usuario creado con éxito.");
  };

  const handleSaveUser = () => {
    if (!validateForm()) {
      return;
    }
    const { id, username, email, password, is_superuser } = state.form;
    const editedUserIndex = state.users.findIndex(user => user.id === id);
    const editedUser = state.users[editedUserIndex];
    const adminCount = state.users.filter(user => user.is_superuser).length;
    if (editedUser.is_superuser && !is_superuser && adminCount === 1) {
      toast.error("No se puede cambiar el tipo de usuario ya que solo hay un administrador en el sistema.");
      return;
    }
    const updatedUsers = [
      ...state.users.slice(0, editedUserIndex),
      { ...editedUser, username, email, password, is_superuser },
      ...state.users.slice(editedUserIndex + 1)
    ];
    setState({
      ...state,
      users: updatedUsers,
      editModal: false,
      form: {
        id: '',
        username: '',
        email: '',
        password: '',
        is_superuser: ''
      }
    });
    toast.success("Usuario editado con éxito.");
  };
  
  const handleDeleteUser = () => {
    const updatedUsers = state.users.filter(user => user.id !== state.form.id);
    setState({
      ...state,
      users: updatedUsers,
      deleteModal: false,
      form: {
        id: '',
        username: '',
        email: '',
        password: '',
        is_superuser: ''
      }
    });
    toast.success("Usuario eliminado con éxito.");
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className={classes.btn_container}>
        <Button variant="warning" className={classes.addButton} onClick={showModalInsert}>Agregar Usuario</Button>
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
            {state.users.map((user) => (
              <tr key={user.id}>
                <td><Form.Check className={classes.checkBox} /></td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{'•'.repeat(user.password.length)}</td>
                <td>{user.is_superuser ? 'Administrador' : 'Vendedor'}</td>
                <td>
                  <ButtonGroup className={classes.buttons}>
                    <Button variant="link" className={classes.noBorder} onClick={() => showModalEdit(user)}>
                      <Image className={classes.image} src={iconPencil} />
                    </Button>
                    <Button variant="link" className={classes.noBorder} onClick={() => showModalDelete(user)}>
                      <Image className={classes.image} src={iconTrash} />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={state.insertModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Nuevo Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          {state.errorMessage && <div className={classes.error_message}>{state.errorMessage}</div>}
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={generateUniqueId()} />
          </FormGroup>
          <FormGroup>
            <label>Nombre de Usuario:</label>
            <input className='form-control' name='username' type='text' onChange={handleChange} onKeyDown={handleUsernameChange} />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input className='form-control' name='email' type='text' onChange={handleChange} onKeyDown={handleMailChange} />
          </FormGroup>
          <FormGroup>
            <label>Contraseña:</label>
            <input className='form-control' name='password' type='text' onChange={handleChange} onKeyDown={handlePasswordChange} />
          </FormGroup>
          <FormGroup>
            <label>Tipo de Usuario:</label>
            <select className='form-control' name='is_superuser' onChange={handleChange} defaultValue=''>
              <option value='' disabled>Selecciona una opción</option>
              <option value='Administrador'>Administrador</option>
              <option value='Vendedor'>Vendedor</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={handleCreateUser}>Crear</Btn>
          <Btn color='danger' onClick={hideModalInsert}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={state.editModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Editar Usuario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          {state.errorMessage && <div className={classes.error_message}>{state.errorMessage}</div>}
          <FormGroup>
            <label>Id:</label>
            <input className='form-control' readOnly type='text' value={state.form.id} />
          </FormGroup>
          <FormGroup>
            <label>Nombre de Usuario:</label>
            <input className='form-control' name='username' type='text' onChange={handleChange} value={state.form.username} onKeyDown={handleUsernameChange} />
          </FormGroup>
          <FormGroup>
            <label>Correo:</label>
            <input className='form-control' name='email' type='text' onChange={handleChange} value={state.form.email} onKeyDown={handleMailChange} />
          </FormGroup>
          <FormGroup>
            <label>Contraseña:</label>
            <input className='form-control' name='password' type='text' onChange={handleChange} value={state.form.password} onKeyDown={handlePasswordChange} />
          </FormGroup>
          <FormGroup>
            <label>Tipo de Usuario:</label>
            <select className='form-control' name='is_superuser' onChange={handleChange} value={state.form.is_superuser ? 'Administrador' : 'Vendedor'}>
              <option value='' disabled>Selecciona una opción</option>
              <option value='Administrador'>Administrador</option>
              <option value='Vendedor'>Vendedor</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={handleSaveUser}>Guardar</Btn>
          <Btn color='danger' onClick={hideModalEdit}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={state.deleteModal}>
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
          <Btn color='success' onClick={handleDeleteUser}>Confirmar</Btn>
          <Btn color='danger' onClick={hideModalDelete}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={state.errorModal}>
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
          <Btn color='success' onClick={hideModalError}>Aceptar</Btn>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default UsersTable;
