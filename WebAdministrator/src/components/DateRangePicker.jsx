/* Copyright 2024 BitBrothers
 * File: DateRangePicker.jsx
 * Type: component */

import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './DateRangePicker.module.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)

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
    <Row className={classes.row}>
      <Col>
        <Form.Label className={classes.label}>Fecha Inferior</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            className={classes.datePicker}
            placeholderText="dd/mm/aaaa"
            wrapperClassName={classes.pickerWrapper}
            locale="es"
          />
      </Col>
      <Col md="auto" className="d-flex align-items-center justify-content-center">
        <span className={classes.dash}>-</span>
      </Col>
      <Col>
        <Form.Label className={classes.label}>Fecha Superior</Form.Label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          className={classes.datePicker}
          placeholderText="dd/mm/aaaa"
          wrapperClassName={classes.pickerWrapper}
          locale="es"
        />
      </Col>
    </Row>
  );
};

export default DateRangePicker;
