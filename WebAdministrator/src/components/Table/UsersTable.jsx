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

  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    selectedUserIds: [],
    isAnyUserSelected: false,
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
    deletesModal: false,
    errorModal1: false,
    errorModal2: false,
  });


  useEffect(() => {
    fetch("http://18.222.68.166:8000/bazar/users//", {
      method: "GET"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar los datos del servidor');
      }
      return response.json();
    })
    .then(data => {
      setUsers(data);
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Error al cargar los datos del servidor");
    });
  }, []);


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


  const handleCheckboxChange = (userId) => {
    setState((prevState) => {
      const isSelected = prevState.selectedUserIds.includes(userId);
      const selectedUserIds = isSelected
        ? prevState.selectedUserIds.filter((id) => id !== userId)
        : [...prevState.selectedUserIds, userId];
      const isAnyUserSelected = selectedUserIds.length > 0;
      return {
        ...prevState,
        selectedUserIds,
        isAnyUserSelected,
      };
    });
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
    const adminCount = users.filter(u => u.is_superuser).length;
    if (isAdminUser && adminCount === 1) {
      setState({ ...state, errorModal1: true, form: user });
    } else {
      setState({ ...state, deleteModal: true, form: user });
    }
  };
  

  const hideModalDelete = () => {
    setState({ ...state, deleteModal: false });
  };


  const showModalDeleteS = () => {
    setState({ ...state, deletesModal: true });
  };


  const hideModalDeleteS = () => {
    setState({ ...state, deletesModal: false });
  };


  const hideModalError1 = () => {
    setState({ ...state, errorModal1: false });
  }

  const hideModalError2 = () => {
    setState({ ...state, errorModal2: false });
  }


  const validateForm = () => {
    const { id, username, email, password, is_superuser } = state.form;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseUsername = username.toLowerCase();
    const lowercaseMail = email.toLowerCase();
    const isUsernameExists = users.some(user => user.id !== id && user.username.toLowerCase() === lowercaseUsername);
    const isEmailExists = users.some(user => user.id !== id && user.email.toLowerCase() === lowercaseMail);
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
    } /*else if (!passwordPattern.test(password)) {
      toast.error("La contraseña debe tener al menos 8 caracteres y al menos un número.");
      return false;
    }*/
    return true;
  };


  const generateUniqueId = () => {
    let newId = users.length + 1;
    while (users.some(user => user.id === newId)) {
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
      username: username,
      email: email,
      password: password,
      is_superuser: is_superuser
    };
    fetch("http://18.222.68.166:8000/bazar/users//", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
      return response.json();
    })
    .then(data => {
      setUsers([...users, data]); // Agregar el nuevo usuario a la lista de usuarios
      setState({ ...state, insertModal: false }); // Cerrar el modal de creación de usuario
      toast.success("Usuario creado con éxito.");
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Error al crear el usuario");
    });
  };
  

  const handleSaveUser = () => {
    if (!validateForm()) {
      return;
    }
    const { id, username, email, password, is_superuser } = state.form;
    const editedUserIndex = users.findIndex(user => user.id === id);
    const editedUser = users[editedUserIndex];
    const adminCount = users.filter(user => user.is_superuser).length;
    if (editedUser.is_superuser && !is_superuser && adminCount === 1) {
      toast.error("No se puede cambiar el tipo de usuario ya que solo hay un administrador en el sistema.");
      return;
    }
    const updatedUser = {
      ...editedUser,
      username: username,
      email: email,
      password: password,
      is_superuser: is_superuser
    };
    fetch(`http://18.222.68.166:8000/bazar/users//${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      return response.json();
    })
    .then(data => {
      const updatedUsers = [
        ...users.slice(0, editedUserIndex),
        data,
        ...users.slice(editedUserIndex + 1)
      ];
      setUsers(updatedUsers);
      setState({
        ...state,
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
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Error al editar el usuario");
    });
  };
  

  const handleDeleteUser = () => {
    const { id } = state.form;
    fetch(`http://18.222.68.166:8000/bazar/users//${id}/`, {
      method: "DELETE"
    })
    .then(() => {
      setState({
        ...state,
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
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
    })
  };


  const handleDeleteSelectedUsers = () => {
    const selectedAdminUsers = users.filter((user) =>
      state.selectedUserIds.includes(user.id) && user.is_superuser
    );
    const totalAdminUsers = users.filter((user) => user.is_superuser).length;
    if (selectedAdminUsers.length === totalAdminUsers) {
      setState({
        ...state,
        deletesModal: false,
        errorModal2: true,
      });
    } else {
      const deletedUserIds = state.selectedUserIds;
      fetch("http://18.222.68.166:8000/bazar/users//", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userIds: deletedUserIds }),
      })
        .then(() => {
          toast.success("Usuarios seleccionados eliminados con éxito.");
          const updatedUsers = users.filter((user) => !deletedUserIds.includes(user.id));
          setUsers(updatedUsers);
          setState({
            ...state,
            deletesModal: false,
            selectedUserIds: [],
            isAnyUserSelected: false,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error al eliminar los usuarios seleccionados");
        });
    }
  };
  
  
  
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className={classes.btn_container}>
        <Button variant="warning" className={classes.addButton} onClick={showModalInsert}>Agregar Usuario</Button>
        <Button variant="warning" className={classes.addButton} onClick={showModalDeleteS} disabled={!state.isAnyUserSelected}>Eliminar Seleccionados</Button>
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
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td><Form.Check className={classes.checkBox} onChange={() => handleCheckboxChange(user.id)} checked={state.selectedUserIds.includes(user.id)} /></td>
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
              ))
            ) : (
              <tr className={classes.emptyState}>
                <td colSpan='7'>No hay usuarios registrados hasta el momento</td>
              </tr>
            )}
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


      <Modal isOpen={state.deletesModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Eliminar Usuarios Seleccionados</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>¿Estás seguro que deseas eliminar todos los usuarios que has seleccionado?</label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={handleDeleteSelectedUsers}>Confirmar</Btn>
          <Btn color='danger' onClick={hideModalDeleteS}>Cancelar</Btn>
        </ModalFooter>
      </Modal>


      <Modal isOpen={state.errorModal1}>
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
          <Btn color='success' onClick={hideModalError1}>Aceptar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={state.errorModal2}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Error</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>No es posible eliminar estos usuarios ya que uno de los usuarios que deseas eliminar es el único administrador del sistema</label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={hideModalError2}>Aceptar</Btn>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default UsersTable;