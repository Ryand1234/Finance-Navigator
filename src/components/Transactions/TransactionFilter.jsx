import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FilterModal = ({ show, handleClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    description: '',
    minAmount: '',
    maxAmount: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={filters.type}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={filters.description}
              onChange={handleInputChange}
              placeholder="Filter by description..."
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Min Amount</Form.Label>
              <Form.Control
                type="number"
                name="minAmount"
                value={filters.minAmount}
                onChange={handleInputChange}
                placeholder="0"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Max Amount</Form.Label>
              <Form.Control
                type="number"
                name="maxAmount"
                value={filters.maxAmount}
                onChange={handleInputChange}
                placeholder="999999"
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleApply}>
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;