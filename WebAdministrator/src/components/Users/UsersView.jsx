/* Copyright 2024 BitBrothers
 * File: UsersView.jsx
 * Type: component */

import Navbar from "../NavBar/Navbar";
import React, { useState, useEffect } from 'react';
import classes from './UsersView.module.css';
import { Button, ButtonGroup, Row, Col, Form, Image, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import { Button as Btn, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import iconPencil from '../../assets/images/icon_pencil.png';
import iconTrash from '../../assets/images/icon_trash.png';
import iconShow from '../../assets/images/eye_show.png';
import iconHide from '../../assets/images/eye_hide.png';
import iconCPassword from '../../assets/images/change_password.png';
import { useMediaQuery } from 'react-responsive';

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    selectedUserIds: [],
    isAnyUserSelected: false,
    form: {
      id: '',
      username: '',
      email: '',
      password: '',
      passwordCon: '',
      is_superuser: '',
      new_password: '',
      new_passwordCon: ''
    },
    insertModal: false,
    editModal: false,
    changeModal: false,
    deleteModal: false,
    deletesModal: false,
    filter: 'all'
  });

  const token = localStorage.getItem('access_token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    fetch("http://3.144.21.179:8000/bazar/users//", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      }
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
      toast.error("Error al cargar los datos del servidor");
    });
  }, [token]);

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
  
  const handlePasswordChange1 = (e) => {
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

  const handlePasswordChange2 = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    } else{
      setState({
        ...state,
        form: {
          ...state.form,
          passwordCon: e.target.value
        }
      });
    }
  };

  const handlePasswordChange3 = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    } else{
      setState({
        ...state,
        form: {
          ...state.form,
          new_password: e.target.value
        }
      });
    }
  };

  const handlePasswordChange4 = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
    } else{
      setState({
        ...state,
        form: {
          ...state.form,
          new_passwordCon: e.target.value
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

  const showModalChange = (user) => {
    setState({ ...state, changeModal: true, form: user});
  };

  const hideModalChange= () => {
    setState({ ...state, changeModal: false });
  };

  const showModalDelete = (user) => {
    setState({ ...state, deleteModal: true, form: user });
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

  const validateCForm = () => {
    const { id, username, email, password, passwordCon, is_superuser } = state.form;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseUsername = username.toLowerCase();
    const lowercaseMail = email.toLowerCase();
    const isUsernameExists = users.some(user => user.id !== id && user.username.toLowerCase() === lowercaseUsername);
    const isEmailExists = users.some(user => user.id !== id && user.email.toLowerCase() === lowercaseMail);
    if (!username || !email || !password || !passwordCon || is_superuser === '') {
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
    } else if (password !== passwordCon) {
      toast.error("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  const validateUForm = () => {
    const { id, username, email, is_superuser } = state.form;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseUsername = username.toLowerCase();
    const lowercaseMail = email.toLowerCase();
    const isUsernameExists = users.some(user => user.id !== id && user.username.toLowerCase() === lowercaseUsername);
    const isEmailExists = users.some(user => user.id !== id && user.email.toLowerCase() === lowercaseMail);
    if (!username || !email || is_superuser === '') {
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
    }
    return true;
  };

  const validatePasswordForm = () => {
    const { id, new_password, new_passwordCon} = state.form;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!new_password || !new_passwordCon) {
      toast.error("Por favor, complete todos los campos.");
      return false;
    } else if (!passwordPattern.test(new_password)) {
      toast.error("La contraseña debe tener al menos 8 caracteres y al menos un número.");
      return false;
    } else if (new_password !== new_passwordCon) {
      toast.error("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };
  
  const handleCreateUser = () => {
    if (!validateCForm()) {
      return;
    }
    const { username, email, password, is_superuser } = state.form;
    const newUser = {
      username: username,
      email: email,
      password: password,
      is_superuser: is_superuser
    };
    fetch("http://3.144.21.179:8000/bazar/users//", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
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
      setUsers([...users, data]);
      setState({ 
        ...state, 
        insertModal: false,
        form: {
          id: '',
          username: '',
          email: '',
          password: '',
          passwordCon: '',
          is_superuser: ''
        } 
      });
      toast.success("Usuario creado con éxito.");
    })
    .catch(error => {
      toast.error("Error al crear el usuario");
    });
  };
  
  const handleEditUser = () => {
    if (!validateUForm()) {
      return;
    }
    const { id, username, email, is_superuser } = state.form;
    const editedUserIndex = users.findIndex(user => user.id === id);
    const editedUser = users[editedUserIndex];
    const { password, ...editedUserWithoutPassword } = editedUser;
    const adminCount = users.filter(user => user.is_superuser).length;
    if (editedUser.is_superuser && !is_superuser && adminCount === 1) {
      toast.error("No se puede cambiar el tipo de usuario ya que solo hay un administrador en el sistema.");
      return;
    }
    const updatedUser = {
      ...editedUserWithoutPassword,
      username: username,
      email: email,
      is_superuser: is_superuser
    };
    fetch(`http://3.144.21.179:8000/bazar/users//${id}/`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
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
      toast.error("Error al editar el usuario");
    });
  };

  const handleChangePassword = () => {
    if (!validatePasswordForm()) {
      return;
    }
    const { id, new_password } = state.form;
    fetch(`http://3.144.21.179:8000/bazar/change-password/`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: id, new_password: new_password })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }
      return response.json();
    })
    .then(data => {
      toast.success("Contraseña cambiada exitosamente.");
      setState({
        ...state,
        changeModal: false,
        form: {
          id: '',
          new_password: '',
          new_passwordCon: ''
        }
      });
    })
    .catch(error => {
      toast.error("Error al cambiar la contraseña");
    });
  }
  
  const handleDeleteUser = () => {
    const { id } = state.form;
    fetch(`http://3.144.21.179:8000/bazar/users//${id}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
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

  const handleDeleteSelf = () => {
    const { id } = state.form;
    fetch(`http://3.144.21.179:8000/bazar/users//${id}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    })
    .then(() => {
      setState({
        ...state,
        deleteselfModal: false,
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
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('login_time');
      localStorage.removeItem('user_id');
      navigate('/');
      window.location.reload();
    })
  };

  const handleDeleteUsers = () => {
    const deletedUserIds = state.selectedUserIds;
    fetch("http://3.144.21.179:8000/bazar/delete-users/", {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: deletedUserIds}),
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
      toast.error("Error al eliminar los usuarios seleccionados");
    });
  };

  const applyFilter = (user) => {
    const { filter } = state;
    if (filter === 'all') return true;
    if (filter === 'admin') return user.is_superuser;
    if (filter === 'vendor') return !user.is_superuser;
  };

  const getTitle = () => {
    switch (state.filter) {
      case 'admin':
        return 'Ver Administradores';
      case 'vendor':
        return 'Ver Vendedores';
      default:
        return 'Ver Todos';
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sortUsers = (users) => {
    const userId = parseInt(localStorage.getItem('user_id'));
    const loggedInUser = users.find(user => parseInt(user.id) === userId);
    const otherUsers = users.filter(user => parseInt(user.id) !== userId && parseInt(user.id) !== 1);
    otherUsers.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    return loggedInUser ? [loggedInUser, ...otherUsers] : users;
  };
  
  const isLargeScreen = useMediaQuery({ maxWidth: 885 });

  return (
  	<>
		<Navbar/>
    <div className={classes.usersLog}>
      <Row className={classes.options}>
        <Col md={isLargeScreen ? 12 : 'auto'}>
        <Button variant="warning" className={classes.addButton} onClick={showModalInsert}>Crear Usuario</Button>
        </Col>
        <Col md={isLargeScreen ? 12 : 'auto'}>
        <Button variant="warning" className={classes.addButton} onClick={showModalDeleteS} disabled={!state.isAnyUserSelected}>Eliminar Seleccionados</Button>
        </Col>
        <Col className={classes.options_user}>
          <DropdownButton title={getTitle()} variant={null} className={classes.oButton}>
            <Dropdown.Item onClick={() => setState({ ...state, filter: 'all' })}>Ver Todos</Dropdown.Item>
            <Dropdown.Item onClick={() => setState({ ...state, filter: 'admin' })}>Ver Administradores</Dropdown.Item>
            <Dropdown.Item onClick={() => setState({ ...state, filter: 'vendor' })}>Ver Vendedores</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <div className={classes.tableCover}>
        <Table responsive size='lg' variant='dark' className={classes.table}>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {users.length > 0 ? (
            users.filter(applyFilter).length > 0 ? (
              sortUsers(users.filter(applyFilter)).map((user) => (
                <tr key={user.id} style={{ fontWeight: parseInt(user.id) === parseInt(userId) ? 'bold' : 'normal' }}>
                  <td>
                    {(parseInt(userId) !== parseInt(user.id) && ((parseInt(userId) === 1) || (!user.is_superuser && parseInt(userId) !== 1))) ? (
                      <Form.Check 
                        className={classes.checkBox} 
                        onChange={() => handleCheckboxChange(user.id)} 
                        checked={state.selectedUserIds.includes(user.id)} 
                      />
                    ) : null}
                  </td>
                  <td>{user.id}</td>
                  <td>{user.username} {parseInt(user.id) === parseInt(userId) && "(tú)"}</td>
                  <td>{user.email}</td>
                  <td>{user.is_superuser ? 'Administrador' : 'Vendedor'}</td>
                  <td>
                  <ButtonGroup className={classes.buttons}>
                    {userId === '1' || !user.is_superuser || parseInt(user.id) === parseInt(userId) ? (
                      <Button variant="link" className={classes.noBorder} onClick={() => showModalEdit(user)}>
                        <Image className={classes.image} src={iconPencil} />
                      </Button>
                    ) : (
                      <Button variant="link" className={`${classes.noBorder}`} disabled>
                        <Image className={classes.image} src={iconPencil} />
                      </Button>
                    )}
                    {userId === '1' || !user.is_superuser || parseInt(user.id) === parseInt(userId) ? (
                      <Button variant="link" className={classes.noBorder} onClick={() => showModalChange(user)}>
                        <Image className={classes.image} src={iconCPassword} />
                      </Button>
                    ) : (
                      <Button variant="link" className={`${classes.noBorder}`} disabled>
                        <Image className={classes.image} src={iconCPassword} />
                      </Button>
                    )}
                    {(user.id !== 1) && (userId === '1' || !user.is_superuser) ? (
                      <Button variant="link" className={classes.noBorder} onClick={() => showModalDelete(user)}>
                        <Image className={classes.image} src={iconTrash} />
                      </Button>
                    ) : (
                      <Button variant="link" className={`${classes.noBorder}`} disabled>
                        <Image className={classes.image} src={iconTrash} />
                      </Button>
                    )}
                  </ButtonGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr className={classes.emptyState}>
                <td colSpan='6'>No hay usuarios vendedores</td>
              </tr>
            )
          ) : (
            <tr className={classes.emptyState}>
              <td colSpan='6'>No hay usuarios registrados hasta el momento</td>
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
            <div className={classes.password_input}>
              <input className='form-control' name='password' type={showPassword ? 'text' : 'password'} onChange={handleChange} onKeyDown={handlePasswordChange1} />
              <button className={classes.password_toggle_btn} onClick={togglePasswordVisibility}>
                <img className={classes.image} src={showPassword ? iconHide : iconShow} alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} />
              </button>
            </div>
          </FormGroup>
          <FormGroup>
            <label>Confirmar Contraseña:</label>
            <div className={classes.password_input}>
              <input className='form-control' name='passwordCon' type={showPassword ? 'text' : 'password'} onChange={handleChange} onKeyDown={handlePasswordChange2} />
              <button className={classes.password_toggle_btn} onClick={togglePasswordVisibility}>
                <img className={classes.image} src={showPassword ? iconHide : iconShow} alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} />
              </button>
            </div>
          </FormGroup>
          <FormGroup>
            <label>Tipo de Usuario:</label>
            <select className='form-control' name='is_superuser' onChange={handleChange} defaultValue=''>
              {parseInt(userId) === 1? (
                <>
                <option value='' disabled>Selecciona una opción</option>
                <option value='Administrador'>Administrador</option>
                <option value='Vendedor'>Vendedor</option>
                </>
              ) : (
                <>
                <option value='' disabled>Selecciona una opción</option>
                <option value='Vendedor'>Vendedor</option>
                </>
              )}
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
            <label>Tipo de Usuario:</label>
            <select className='form-control' name='is_superuser' onChange={handleChange} value={state.form.is_superuser ? 'Administrador' : 'Vendedor'}>
              {state.form.id === parseInt(userId) ? (
                <option value='Administrador'>Administrador</option>
              ) : (state.form.id !== parseInt(userId) && parseInt(userId) === 1)? (
                <>
                <option value='' disabled>Selecciona una opción</option>
                <option value='Administrador'>Administrador</option>
                <option value='Vendedor'>Vendedor</option>
                </>
              ) : (
                <option value='Vendedor'>Vendedor</option>
              )}
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={handleEditUser}>Guardar</Btn>
          <Btn color='danger' onClick={hideModalEdit}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

      <Modal isOpen={state.changeModal}>
        <ModalHeader className={classes.modal_header}>
          <div>
            <h3>Cambiar Contraseña</h3>
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
            <input className='form-control' readOnly type='text' value={state.form.username} />
          </FormGroup>
          <FormGroup>
            <label>Nueva Contraseña:</label>
            <div className={classes.password_input}>
              <input className='form-control' name='new_password' type={showPassword ? 'text' : 'password'} onChange={handleChange} onKeyDown={handlePasswordChange3} />
              <button className={classes.password_toggle_btn} onClick={togglePasswordVisibility}>
                <img className={classes.image} src={showPassword ? iconHide : iconShow} alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} />
              </button>
            </div>
          </FormGroup>
          <FormGroup>
            <label>Confirmar Nueva Contraseña:</label>
            <div className={classes.password_input}>
              <input className='form-control' name='new_passwordCon' type={showPassword ? 'text' : 'password'} onChange={handleChange} onKeyDown={handlePasswordChange4} />
              <button className={classes.password_toggle_btn} onClick={togglePasswordVisibility}>
                <img className={classes.image} src={showPassword ? iconHide : iconShow} alt={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} />
              </button>
            </div>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Btn color='success' onClick={handleChangePassword}>Guardar</Btn>
          <Btn color='danger' onClick={hideModalChange}>Cancelar</Btn>
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
          <Btn color='success' onClick={handleDeleteUsers}>Confirmar</Btn>
          <Btn color='danger' onClick={hideModalDeleteS}>Cancelar</Btn>
        </ModalFooter>
      </Modal>

    </div>
	  </>
	);
};

export default UsersView;
