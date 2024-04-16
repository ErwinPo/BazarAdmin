/* Copyright 2024 BitBrothers
 * File: ValueRangePicker.jsx
 * Type: component */

import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import classes from './ValueRangePicker.module.css';
import "../index.css";

const ValueRangePicker = ({ minValue, maxValue, handleMinValueChange, handleMaxValueChange }) => {

  const handleMinValueInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      handleMinValueChange(value);
    }
  };

  const handleMaxValueInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      handleMaxValueChange(value);
    }
  };

return (
  <Row className={classes.row}>
    <Col>
      <Form.Label className={classes.label}>Monto Inferior</Form.Label>
      <Form.Control
        type="number"
        value={minValue}
        onChange={handleMinValueInputChange}
        className={classes.input}
        placeholder="Monto Inferior"
      />
    </Col>
    <Col md="auto" className="d-flex align-items-center justify-content-center">
      <span className={classes.dash}>-</span>
    </Col>
    <Col>
      <Form.Label className={classes.label}>Monto Superior</Form.Label>
      <Form.Control
          type="number"
          value={maxValue}
          onChange={handleMaxValueInputChange}
          className={classes.input}
          placeholder="Monto Superior"
      />
    </Col>
  </Row>
);
};

export default ValueRangePicker;
