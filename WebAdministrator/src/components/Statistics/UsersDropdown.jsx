import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import classes from "./UsersDropdown.module.css";

const UsersDropdown = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        fetch('http://3.146.65.111:8000/bazar/users//', {
            method: 'GET'
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
        });
    }, []);

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
        // Handle any other actions related to user selection
    };


    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Vendedor
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {users.length > 0  ? (
                    users.map(user => (
                        <Dropdown.Item 
                            key={user.id} 
                            onClick={() => handleUserClick(user.id)}
                            className={selectedUser === user.id ? classes.selectedUser : ""}
                        >
                            {user.username}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No hay usuarios disponibles</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UsersDropdown;
