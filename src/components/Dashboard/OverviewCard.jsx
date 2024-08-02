import React from 'react';
import PropTypes from 'prop-types';

const OverviewCard = ({ balance, income, expenses }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Financial Overview</h2>
      <div style={styles.section}>
        <h3>Balance</h3>
        <p>{balance}</p>
      </div>
      <div style={styles.section}>
        <h3>Income</h3>
        <p>{income}</p>
      </div>
      <div style={styles.section}>
        <h3>Expenses</h3>
        <p>{expenses}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  section: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    marginBottom: '12px',
  }
};

OverviewCard.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expenses: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OverviewCard;
