import { Dropdown, Modal, Button } from 'react-bootstrap/';
import { useState } from 'react';
import classes from "./DatesDropdown.module.css";
import DateRangePicker from '../Records/DateRangePicker';
import moment from "moment";

const DatesDropdown = ({ handleStartDateChange, handleEndDateChange  }) => {
    const [daysFromHandleDropdownItem, setDaysFromHandleDropdownItem] = useState([new Date().toJSON().slice(0, 10), new Date().toJSON().slice(0, 10)]);
    const [selectedOption, setSelectedOption] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const calculateStartDate = (startDate, days) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() - days);
        return endDate.toJSON().slice(0, 10);
    };

    const handleDropdownItemClick = (days) => {
        const currentDate = new Date().toJSON().slice(0, 10);
        const startDate = calculateStartDate(currentDate, days);

        setSelectedOption(days);
        setDaysFromHandleDropdownItem([startDate, currentDate]);
        handleStartDateChange(moment().subtract(days-1, 'days').toDate())
        handleEndDateChange(new Date())
    };

    const handleApplyCustomDates = () => {
        if (startDate && endDate) {
            const formattedStartDate = startDate.toJSON().slice(0, 10);
            const formattedEndDate = endDate.toJSON().slice(0, 10);
            setShowModal(false);
            setSelectedOption(null);

            setDaysFromHandleDropdownItem([formattedStartDate, formattedEndDate]);
            handleStartDateChange(startDate)
            handleEndDateChange(endDate)
        }
    };

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {daysFromHandleDropdownItem.length > 0 ? `${daysFromHandleDropdownItem[0]} - ${daysFromHandleDropdownItem[1]}` : 'Rango de Fechas'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(0)} className={selectedOption === 0 ? classes.selectedOption : ""}>
                        Hoy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(7)} className={selectedOption === 7 ? classes.selectedOption : ""}>
                        Hace 1 Semana
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(15)} className={selectedOption === 15 ? classes.selectedOption : ""}>
                        Hace 2 semanas
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(30)} className={selectedOption === 30 ? classes.selectedOption : ""}>
                        Hace 1 mes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(180)} className={selectedOption === 180 ? classes.selectedOption : ""}>
                        Hace 6 meses
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(365)} className={selectedOption === 365 ? classes.selectedOption : ""}>
                        Hace 1 año
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShowModal} className={selectedOption === null ? classes.selectedOption : ""}>
                        Personalizar
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rango de fechas: Personalizable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        handleStartDateChange={date => setStartDate(date)}
                        handleEndDateChange={date => setEndDate(date)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleApplyCustomDates}>
                        Aplicar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DatesDropdown;
