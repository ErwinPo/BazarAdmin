/* Copyright 2024 BitBrothers
 * File: ValueRangePicker.jsx
 * Type: component */

import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import classes from './ValueRangePicker.module.css';

const ValueRangePicker = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const handleMinValueChange = (event) => {
    setMinValue(event.target.value);
  };

  const handleMaxValueChange = (event) => {
    setMaxValue(event.target.value);
  };

  return (
    <Row className={classes.row}>
      <Col>
        <Form.Label className={classes.label}>Monto Inferior</Form.Label>
        <Form.Control
          type="number"
          value={minValue}
          onChange={handleMinValueChange}
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
          onChange={handleMaxValueChange}
          className={classes.input}
          placeholder="Monto Superior"
        />
      </Col>
    </Row>
  );
};

export default ValueRangePicker;
