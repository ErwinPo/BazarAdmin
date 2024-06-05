import { Dropdown, Modal, Button } from 'react-bootstrap/';
import { useState, useEffect } from 'react';
import classes from "./DatesDropdown.module.css";
import DateRangePicker from '../Records/DateRangePicker';
import { toast } from 'react-toastify';

const DatesDropdown = ({ onSalesDataUpdate, onRangeOfDatesUpdate, onItemsDataUpdate, currentUserId, currentUserData }) => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];  // Formatear la fecha como 'YYYY-MM-DD'
    const [daysFromHandleDropdownItem, setDaysFromHandleDropdownItem] = useState([formattedToday, formattedToday]);
    const [selectedOption, setSelectedOption] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [temporality, setTemporality] = useState('daily');
    const [dropdownLabel, setDropdownLabel] = useState('Hoy');

    const access_token = localStorage.getItem('access_token');

    const handleClose = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const formatDateString = (date) => {
        return new Date(date).toLocaleDateString('en-CA');
    };

    const getEndDate = () => {
        return formatDateString(new Date());
    };

    const getCurrentDate = (endDate, days) => {
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - (days - 1));
        return formatDateString(startDate);
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
        } else if (differenceInDays > 31 && differenceInDays <= 365) {
            return 'monthly';
        } else if (differenceInDays > 7 && differenceInDays <= 31) {
            return 'weekly';
        } else {
            return 'daily';
        }
    };

    const handleDropdownItemClick = (days, label) => {
        const endDate = getEndDate();
        const currDate = getCurrentDate(endDate, days);

        const differenceInDays = calculateDifferenceInDays(currDate, endDate);
        const temp = determineTemporality(differenceInDays);

        setDaysFromHandleDropdownItem([currDate, endDate]);
        setTemporality(temp);
        onRangeOfDatesUpdate([currDate, endDate]);
        setSelectedOption(days);
        setDropdownLabel(label);
    };

    const handleApplyCustomDates = () => {
        if (startDate && endDate) {
            const formattedStartDate = formatDateString(startDate);
            const formattedEndDate = formatDateString(endDate);

            const differenceInDays = calculateDifferenceInDays(formattedStartDate, formattedEndDate);
            const temp = determineTemporality(differenceInDays);

            setDaysFromHandleDropdownItem([formattedStartDate, formattedEndDate]);
            setTemporality(temp);
            onRangeOfDatesUpdate([formattedStartDate, formattedEndDate]);
            setShowModal(false);
            setSelectedOption(null);
            setDropdownLabel(`${formattedStartDate} - ${formattedEndDate}`);
        }
    };

    const fetchData = (startDate, endDate) => {
        let itemsFetch = `http://3.144.21.179:8000/bazar/sales-date-range-quantity/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}`;
        let salesFetch = `http://3.144.21.179:8000/bazar/sales-date-range-amount/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}`;

        if (currentUserData) {
            itemsFetch = `http://3.144.21.179:8000/bazar/sales-date-range-quantity-seller/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}&id=${currentUserData.id}`;
            salesFetch = `http://3.144.21.179:8000/bazar/sales-date-range-amount-seller/?start-date=${startDate}&end-date=${endDate}&temporality=${temporality}&id=${currentUserData.id}`;
        }

        const requestOptions = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        };

        fetch(itemsFetch, requestOptions)
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
                toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
            });

        fetch(salesFetch, requestOptions)
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
                toast.error('Lo sentimos, ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.');
            });

            console.log(...daysFromHandleDropdownItem)
    };

    useEffect(() => {
        const [startDate, endDate] = daysFromHandleDropdownItem;
        if (!startDate || !endDate || !temporality) return;

        fetchData(startDate, endDate);
    }, [daysFromHandleDropdownItem, temporality, currentUserData]);

    useEffect(() => {
        handleDropdownItemClick(1, 'Hoy');
    }, []);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {dropdownLabel}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(1, 'Hoy')} className={selectedOption === 1 ? classes.selectedOption : ""}>
                        Hoy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(7, 'Hace 1 semana')} className={selectedOption === 7 ? classes.selectedOption : ""}>
                        Hace 1 semana
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(15, 'Hace 2 semanas')} className={selectedOption === 15 ? classes.selectedOption : ""}>
                        Hace 2 semanas
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(30, 'Hace 1 mes')} className={selectedOption === 30 ? classes.selectedOption : ""}>
                        Hace 1 mes
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(180, 'Hace 6 meses')} className={selectedOption === 180 ? classes.selectedOption : ""}>
                        Hace 6 meses
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDropdownItemClick(366, 'Hace 1 año')} className={selectedOption === 366 ? classes.selectedOption : ""}>
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
                    <Button variant="success" onClick={handleApplyCustomDates}>
                        Aplicar
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DatesDropdown;