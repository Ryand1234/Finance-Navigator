import React from 'react';
import PropTypes from 'prop-types';

const OverviewCard = ({ balance, income, expenses }) => {
  return (
    <div style={styles.card}>
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
    maxWidth: '300px',
    margin: '0 auto',
  },
  section: {
    marginBottom: '12px',
  }
};

OverviewCard.propTypes = {
  balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  income: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  expenses: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OverviewCard;
