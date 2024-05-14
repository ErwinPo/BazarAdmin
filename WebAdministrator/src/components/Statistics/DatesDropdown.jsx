import { Dropdown, Modal, Button } from 'react-bootstrap/';
import { useState, useEffect } from 'react';
import classes from "./DatesDropdown.module.css";
import DateRangePicker from '../DateRangePicker';

const DatesDropdown = ({ onSalesDataUpdate, onRangeOfDatesUpdate, onItemsDataUpdate }) => {
    const [daysFromHandleDropdownItem, setDaysFromHandleDropdownItem] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModal, setShowModal] = useState(false); // Changed from 'show' to 'showModal'

    const handleClose = () => setShowModal(false); // Changed from 'setShowModal' to 'setShow'
    const handleShowModal = () => setShowModal(true);
    

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

        setDaysFromHandleDropdownItem([currDate, endDate]);
        onRangeOfDatesUpdate([currDate, endDate]);
        setSelectedOption(days); // Update selected option
    };

    useEffect(() => {
        const [startDate, endDate] = daysFromHandleDropdownItem;
    
        if (startDate && endDate) {
            // Fetch to get total items
            fetch(`http://3.146.65.111:8000/bazar/sales-date-range-quantity/?start-date=${startDate}&end-date=${endDate}&temporality=daily`, {
                method: "GET"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos del servidor');
                }
                return response.json();
            })
            .then(data => {
                onItemsDataUpdate(data)
                // console.log("Items data:", data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
            // Fetch to get total sales amount
            fetch(`http://3.146.65.111:8000/bazar/sales-date-range-amount/?start-date=${startDate}&end-date=${endDate}&temporality=daily`, {
                method: "GET"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos del servidor');
                }
                return response.json();
            })
            .then(data => {
                onSalesDataUpdate(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [daysFromHandleDropdownItem]);
    

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Rango de Fechas
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => handleDropdownItemClick(1)}
                        className={selectedOption === 1 ? classes.selectedOption : ""}
                    >
                        Hace 1 día
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleDropdownItemClick(7)}
                        className={selectedOption === 7 ? classes.selectedOption : ""}
                    >
                        Hace 7 días
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleDropdownItemClick(15)}
                        className={selectedOption === 15 ? classes.selectedOption : ""}
                    >
                        Hace 15 días
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleDropdownItemClick(30)}
                        className={selectedOption === 30 ? classes.selectedOption : ""}
                    >
                        Hace 30 días
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={() => handleDropdownItemClick(180)}
                        className={selectedOption === 180 ? classes.selectedOption : ""}
                    >
                        Hace 6 meses
                    </Dropdown.Item>
                    <Dropdown.Item
                        onClick={handleShowModal}
                        className={selectedOption === null ? classes.selectedOption : ""}
                    >
                        Personalizar
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rango de fechas: Personalizable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DateRangePicker/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Aplicar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DatesDropdown;
