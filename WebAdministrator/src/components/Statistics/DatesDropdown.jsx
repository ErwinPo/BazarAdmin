import { Dropdown, Modal, Button } from 'react-bootstrap/';
import { useState, useEffect } from 'react';
import classes from "./DatesDropdown.module.css";
import DateRangePicker from '../DateRangePicker';

const DatesDropdown = ({ onSalesDataUpdate, onRangeOfDatesUpdate, onItemsDataUpdate, currentUserId, currentUserData }) => {
    const [daysFromHandleDropdownItem, setDaysFromHandleDropdownItem] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [temporality, setTemporality] = useState(null);

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const getEndDate = () => {
        return new Date().toJSON().slice(0, 10);
    };

    const getCurrentDate = (startDate, days) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() - days);
        return endDate.toJSON().slice(0, 10);
    };

    const calculateDifferenceInDays = (startDate, endDate) => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const differenceInTime = end.getTime() - start.getTime();
        return differenceInTime / (1000 * 3600 * 24);
    };

    const determineTemporality = (differenceInDays) => {
        if (differenceInDays > 365) {
            return 'annually';
        } else if (differenceInDays > 32 && differenceInDays <= 365) {
            return 'monthly';
        } else if (differenceInDays > 7 && differenceInDays <= 32) {
            return 'weekly';
        } else {
            return 'daily';
        }
    };

    const handleDropdownItemClick = (days) => {
        const endDate = getEndDate();
        const currDate = getCurrentDate(endDate, days);

        const differenceInDays = calculateDifferenceInDays(currDate, endDate);
        const temp = determineTemporality(differenceInDays);

        setDaysFromHandleDropdownItem([currDate, endDate]);
        setTemporality(temp);
        onRangeOfDatesUpdate([currDate, endDate]);
        setSelectedOption(days);

        console.log("temporality: ", temp);
        console.log("endDate: ", endDate);
    };

    const handleApplyCustomDates = () => {
        if (startDate && endDate) {
            const formattedStartDate = startDate.toJSON().slice(0, 10);
            const formattedEndDate = endDate.toJSON().slice(0, 10);

            const differenceInDays = calculateDifferenceInDays(formattedStartDate, formattedEndDate);
            const temp = determineTemporality(differenceInDays);

            setDaysFromHandleDropdownItem([formattedStartDate, formattedEndDate]);
            setTemporality(temp);
            onRangeOfDatesUpdate([formattedStartDate, formattedEndDate]);
            setShowModal(false);
            setSelectedOption(null);

            console.log("temporality: ", temp);
        }
    };

    useEffect(() => {
        const [startDate, endDate] = daysFromHandleDropdownItem;
        if (!startDate || !endDate || !temporality) return;

        let itemsFetch = `http://3.146.65.111:8000/bazar/sales-date-range-quantity/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}`;
        let salesFetch = `http://3.146.65.111:8000/bazar/sales-date-range-amount/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}`;

        if (currentUserData) {
            itemsFetch = `http://3.146.65.111:8000/bazar/sales-date-range-quantity-seller/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}&id=${currentUserData.id}`;
            salesFetch = `http://3.146.65.111:8000/bazar/sales-date-range-amount-seller/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}&id=${currentUserData.id}`;
        }

        fetch(itemsFetch, { method: "GET" })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos del servidor');
                }
                return response.json();
            })
            .then(data => {
                onItemsDataUpdate(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        fetch(salesFetch, { method: "GET" })
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

        console.log("Rango de fechas: ", daysFromHandleDropdownItem);
        console.log("Temporalidad: ", temporality);
    }, [daysFromHandleDropdownItem, temporality, currentUserData]);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {daysFromHandleDropdownItem.length > 0 ? `${daysFromHandleDropdownItem[0]} - ${daysFromHandleDropdownItem[1]}` : 'Rango de Fechas'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(1)} className={selectedOption === 1 ? classes.selectedOption : ""}>
                        Hace 1 día
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(7)} className={selectedOption === 7 ? classes.selectedOption : ""}>
                        Hace 7 días
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(15)} className={selectedOption === 15 ? classes.selectedOption : ""}>
                        Hace 15 días
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(30)} className={selectedOption === 30 ? classes.selectedOption : ""}>
                        Hace 30 días
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(180)} className={selectedOption === 180 ? classes.selectedOption : ""}>
                        Hace 6 meses
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
