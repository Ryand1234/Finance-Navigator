import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [savingGoal, setSavingGoal] = useState('');
  const [expenseMeter, setExpenseMeter] = useState('');
  const [showClearTransactionsModal, setShowClearTransactionsModal] = useState(false);
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);

  useEffect(() => {
    const loadProfile = () => {
      setName(localStorage.getItem('name') || '');
      setEmail(localStorage.getItem('email') || '');
      setMobile(localStorage.getItem('mobile') || '');
      setSavingGoal(localStorage.getItem('savingGoal') || '');
      setExpenseMeter(localStorage.getItem('expenseMeter') || '');
    };

    loadProfile();
  }, []);

  const saveProfile = () => {
    try {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('mobile', mobile);
      localStorage.setItem('savingGoal', savingGoal);
      localStorage.setItem('expenseMeter', expenseMeter);
      alert('Profile saved successfully');
    } catch (error) {
      alert('Error saving profile data');
    }
  };

  const handleClearTransactions = () => {
    // Call to clear transactions logic
    setShowClearTransactionsModal(false);
  };

  const handleDeleteData = () => {
    // Call to delete user data logic
    setShowDeleteDataModal(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile</h2>
      <div style={styles.inputGroup}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Mobile</label>
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Saving Goal</label>
        <input
          type="number"
          value={savingGoal}
          onChange={(e) => setSavingGoal(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>Expense Meter</label>
        <input
          type="number"
          value={expenseMeter}
          onChange={(e) => setExpenseMeter(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={saveProfile} style={styles.button}>Save Profile</button>
      <button onClick={() => setShowClearTransactionsModal(true)} style={styles.button}>Clear Transactions</button>
      <button onClick={() => setShowDeleteDataModal(true)} style={{ ...styles.button, backgroundColor: 'red' }}>Delete My Data</button>

      {showClearTransactionsModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>Are you sure you want to clear all transactions?</p>
            <div style={styles.modalButtons}>
              <button onClick={handleClearTransactions} style={styles.button}>Yes</button>
              <button onClick={() => setShowClearTransactionsModal(false)} style={{ ...styles.button, backgroundColor: 'gray' }}>No</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteDataModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <p>Are you sure you want to delete all your data?</p>
            <div style={styles.modalButtons}>
              <button onClick={handleDeleteData} style={styles.button}>Yes</button>
              <button onClick={() => setShowDeleteDataModal(false)} style={{ ...styles.button, backgroundColor: 'gray' }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  modalOverlay: {
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
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
};

export default ProfilePage;
