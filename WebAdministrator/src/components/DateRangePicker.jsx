import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './DateRangePicker.module.css';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Row className={classes.dateRangePicker} >
      <Col sm={12} md={5} className={classes.datePicker}>
        <Form.Label>Fecha de inicio</Form.Label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          className={classes.dateInput}
          placeholderText="dd/mm/aaaa"
        />
      </Col>
      <Col sm={12} md="auto" className={classes.dashContainer}>
        <span className={classes.dash}>-</span>
      </Col>
      <Col sm={12} md={5} className={classes.datePicker}>
        <Form.Label>Fecha de fin</Form.Label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          className={classes.dateInput}
          placeholderText="dd/mm/aaaa"
        />
      </Col>
    </Row>
  );
};

export default DateRangePicker;
