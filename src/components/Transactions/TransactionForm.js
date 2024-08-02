import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionForm = ({ onSubmit, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, description, type, date });
    setAmount('');
    setDescription('');
    setType('income');
    setDate('');
    onClose();
  };

  return (
    <div style={styles.popupOverlay}>
      <div style={styles.popupContent}>
        <h2 style={styles.header}>Add Transaction</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Add Transaction</button>
          <button type="button" onClick={onClose} style={{ ...styles.button, background: '#ccc', marginLeft: '10px' }}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between'
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

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransactionForm;
