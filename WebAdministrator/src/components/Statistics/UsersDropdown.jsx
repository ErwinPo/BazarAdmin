import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
import classes from "./UsersDropdown.module.css";

const UsersDropdown = ({ onUserDataUpdate }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // const access_token = localStorage.getItem('access_token');



    // useEffect(() => {
    //     fetch('http://3.146.65.111:8000/bazar/sales-date-range-quantity-seller/?start-date=2024-05-09&end-date=2024-05-16&temporality=daily&id=18', {
    //         method: 'GET'
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Error al cargar los datos del servidor');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("Data")
    //         console.log(data)
            
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    // }, []);

    useEffect(() => {
        fetch('http://3.146.65.111:8000/bazar/users//', {
            method: 'GET'
            // headers: {
            //     'Authorization': `BEARER ${access_token}`
            // }
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

    const handleUserClick = (user) => {
        if (selectedUser === user) {
            // If the same user is clicked again, deselect it 
            setSelectedUser(null);
            onUserDataUpdate(null)
        } else {
            setSelectedUser(user);
            onUserDataUpdate(user)
        }
 
    };


    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedUser ? selectedUser.username : 'Vendedor'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {users.length > 0  ? (
                    users.map(user => (
                        <Dropdown.Item 
                            key={user.id} 
                            onClick={() => handleUserClick(user)}
                            className={selectedUser === user ? classes.selectedUser : ""}
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