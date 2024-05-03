import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const DatesDropdown = ({ onDataUpdate, onRangeOfDatesUpdate }) => {
    const [daysFromHandleDropdownItem, setdaysFromHandleDropdownItem] = useState([]);

    const getEndDate = () => {
        return new Date().toJSON().slice(0, 10);
    };

    const getCurrentDate = (startDate, days) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() - days); // Subtracting days directly from the date
        return endDate.toJSON().slice(0, 10);
    };

    const handleDropdownItemClick = (days) => {
        const endDate = getEndDate();
        const currDate = getCurrentDate(endDate, days);

        setdaysFromHandleDropdownItem(() => {
            return [currDate, endDate]
        })
        onRangeOfDatesUpdate(daysFromHandleDropdownItem)
    };

    useEffect(() => {
        
    }, [daysFromHandleDropdownItem]);



    useEffect(() => {
        const [startDate, endDate] = daysFromHandleDropdownItem;
        
        if (startDate && endDate) {
            fetch(`http://18.222.68.166:8000/bazar/sales-date-range-amount/?start-date=${startDate}&end-date=${endDate}&temporality=daily`, {
                method: "GET"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos del servidor');
                }
                return response.json();
            })
            .then(data => {
                onDataUpdate(data);
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        
    }, [daysFromHandleDropdownItem]);

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Rango de Fechas
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleDropdownItemClick(1)}>1 día</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownItemClick(7)}>7 días</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownItemClick(15)}>15 días</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownItemClick(30)}>30 días</Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdownItemClick(180)}>6 meses</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Personalizar</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">
                    <Button>Aplicar Cambios</Button>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DatesDropdown;
