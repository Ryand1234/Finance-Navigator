import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TransactionForm = ({ onSubmit, onClose }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!amount || !description || !date) {
      alert('Please fill all fields.');
      return;
    }
    onSubmit({ amount: parseFloat(amount), description, type, date });
    setAmount('');
    setDescription('');
    setType('income');
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div style={styles.popupOverlay}>
      <div style={styles.popupContent}>
        <h2 style={styles.header}>Add Transaction</h2>
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={styles.input}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div style={styles.inputGroup}>
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              style={styles.input}
            />
          </div>
          <div style={styles.buttonContainer}>
            <button onClick={handleSubmit} style={styles.submitButton}>
              Add Transaction
            </button>
            <button onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
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
    width: '80%',
    maxWidth: '400px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
};

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TransactionForm;
