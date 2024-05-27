/* Copyright 2024 BitBrothers
 * File: DateRangePicker.jsx
 * Type: component */

import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import classes from './DateRangePicker.module.css';
import { registerLocale } from  "react-datepicker";
import { es } from 'date-fns/locale/es';
registerLocale('es', es)

const DateRangePicker = ({ startDate, endDate, handleStartDateChange, handleEndDateChange }) => {
return (
    <Row className={classes.row}>
      <Col className={classes.col}>
        <Form.Label className={classes.label}>Fecha Inicio</Form.Label>
        <DatePicker
          maxDate={endDate}
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          className={classes.dateInput}
          placeholderText="dd/mm/aaaa"
          wrapperClassName={classes.pickerWrapper}
          locale="es"
        />
      </Col>
      <Col md="auto" className="d-flex align-items-center justify-content-center">
        <span className={classes.dash}>-</span>
      </Col>
      <Col>
        <Form.Label className={classes.label}>Fecha Final</Form.Label>
        <DatePicker
          minDate={startDate}
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          className={classes.dateInput}
          placeholderText="dd/mm/aaaa"
          wrapperClassName={classes.pickerWrapper}
          locale="es"
        />
      </Col>
    </Row>
  );
};
  

export default DateRangePicker;
