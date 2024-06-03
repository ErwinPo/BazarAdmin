import { Dropdown, Modal, Button } from 'react-bootstrap/';
import { useState } from 'react';
import classes from "./DatesDropdown.module.css";
import DateRangePicker from '../Records/DateRangePicker';
import moment from "moment";

const DatesDropdown = ({ handleStartDateChange, handleEndDateChange  }) => {
    const [daysFromHandleDropdownItem, setDaysFromHandleDropdownItem] = useState([new Date().toLocaleString().slice(0, 9), new Date().toLocaleString().slice(0, 9)]);
    const [selectedOption, setSelectedOption] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [titleDate, setTitleDate] = useState('Hoy');
    const [endDate, setEndDate] = useState(new Date());
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const calculateStartDate = (currentDate, days) => {
        const endDate = new Date(currentDate);
        endDate.setDate(endDate.getDate() - days);
        return endDate.toLocaleString().slice(0, 9);
    };

    const handleDropdownItemClick = (days, selectedTitleDate) => {

        setTitleDate(selectedTitleDate)
        setSelectedOption(days);
        handleStartDateChange(moment().subtract(days, 'days').toDate())
        handleEndDateChange(new Date())
    };

    const handleApplyCustomDates = () => {
        if (startDate && endDate) {
            const formattedStartDate = startDate.toLocaleString('es-MX', options);
            const formattedEndDate = endDate.toLocaleString('es-MX', options);
            setShowModal(false);
            setSelectedOption(null);
            setTitleDate(null)

            setDaysFromHandleDropdownItem([formattedStartDate, formattedEndDate]);
            handleStartDateChange(startDate)
            handleEndDateChange(endDate)
        }
    };

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {titleDate != null ? titleDate : `${daysFromHandleDropdownItem[0]} - ${daysFromHandleDropdownItem[1]}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(0, 'Hoy')} className={selectedOption === 0 ? classes.selectedOption : ""}>
                        Hoy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(7, '1 Semana')} className={selectedOption === 7 ? classes.selectedOption : ""}>
                        Hace 1 Semana
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(15, '2 Semanas')} className={selectedOption === 15 ? classes.selectedOption : ""}>
                        Hace 2 Semanas
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(30, '1 Mes')} className={selectedOption === 30 ? classes.selectedOption : ""}>
                        Hace 1 Mes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(180, '6 Meses')} className={selectedOption === 180 ? classes.selectedOption : ""}>
                        Hace 6 Meses
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(365, '1 Año')} className={selectedOption === 365 ? classes.selectedOption : ""}>
                        Hace 1 Año
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
