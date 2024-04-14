/* Copyright 2024 BitBrothers
 * File: UsersTable.jsx
 * Type: component */

// imports
import React, { useState } from 'react';
import classes from './UsersTable.module.css';
import { Button, ButtonGroup, Form, Image, Pagination, Table } from 'react-bootstrap';
import iconPencil from '../../assets/images/icono_pencil.png';
import iconTrash from '../../assets/images/icono_trash.png';

const UsersTable = ({ users }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; // Número de elementos por página
  
  const paginatedData = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  return (
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
          {users.length > 0 ? (
            paginatedData.map((user) => (
              <tr key={user.id}>
                <td>
                  <Form.Check />
                </td>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.usertype}</td>
                <td>
                  <ButtonGroup className={classes.buttons}>
                  <Button variant="link" className={classes.noBorder}>
                      <Image className={classes.image} src={iconPencil}/>
                    </Button>
                    <Button variant="link" className={classes.noBorder}>
                      <Image className={classes.image} src={iconTrash}/>
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr className={classes.emptyState}>
              <td colSpan='7'>No hay usuarios registrados</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersTable;