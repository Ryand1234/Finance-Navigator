import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionFilter = ({ onFilterChange }) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ description, type, startDate, endDate });
  };

  return (
    <div style={styles.filterContainer}>
      <div style={styles.inputGroup}>
        <label htmlFor="filter-description">Description</label>
        <input
          type="text"
          id="filter-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="filter-type">Type</label>
        <select
          id="filter-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="filter-startDate">Start Date</label>
        <input
          type="date"
          id="filter-startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="filter-endDate">End Date</label>
        <input
          type="date"
          id="filter-endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button type="button" onClick={handleFilterChange} style={styles.button}>
        Apply Filters
      </button>
    </div>
  );
};

const styles = {
  filterContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginTop: '10px',
  }
};

TransactionFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default TransactionFilter;
