import React, { useState } from 'react';
import styled from 'styled-components';
import TransactionForm from './TransactionForm';
import TransactionFilter from './TransactionFilter';
import { useTransactions } from '../../hooks/useTransactions';
import AIAssistant from '../AIAssistant/AIAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';



const TransactionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const TransactionItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;




function TransactionList() {
  const { transactions, addTransaction } = useTransactions();
  const [filter, setFilter] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const { getAdvice } = useAIAssistant();


  const handleFilterChange = (field, value) => {
    const newFilter = { ...filter, [field]: value };
    setFilter(newFilter);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (filter.description && !transaction.description.toLowerCase().includes(filter.description.toLowerCase())) {
      return false;
    }
    if (filter.type && transaction.type !== filter.type) {
      return false;
    }
    if (filter.startDate && new Date(transaction.date) < new Date(filter.startDate)) {
      return false;
    }
    if (filter.endDate && new Date(transaction.date) > new Date(filter.endDate)) {
      return false;
    }
    return true;
  });
  const transactionData = {
      recentTransactions: filteredTransactions.slice(0, 5),
      totalTransactions: filteredTransactions.length,
      // Add more relevant data for AI analysis
    }
  return (
    <TransactionListContainer>
      <header style={styles.header}>
        <h1 style={styles.title}>Transaction Management</h1>
        <button onClick={() => setShowPopup(true)} style={styles.addButton}>+ Add Transaction</button>
      </header>
      <div style={styles.list}>
        <div style={styles.headers}>
          <span style={styles.headerItem} onClick={() => handleFilterChange('description', prompt('Filter by description:'))}>Description</span>
          <span style={styles.headerItem} onClick={() => handleFilterChange('amount', prompt('Filter by amount:'))}>Amount</span>
          <span style={styles.headerItem} onClick={() => handleFilterChange('date', prompt('Filter by date:'))}>Date</span>
          <span style={styles.headerItem} onClick={() => handleFilterChange('type', prompt('Filter by type:'))}>Type</span>
        </div>
        {transactions.map((transaction) => (
          <div key={transaction.id} style={styles.transaction}>
            <span style={styles.description}>{transaction.description}</span>
            <span style={styles.amount}>{transaction.amount}</span>
            <span style={styles.date}>{transaction.date}</span>
            <span style={styles.type}>{transaction.type}</span>
          </div>
        ))}
      {showPopup && <TransactionForm onSubmit={addTransaction} onClose={() => setShowPopup(false)} />}
      </div>
      <AIAssistant
        context='transactions'
        data={
           transactionData
        }
      />
    </TransactionListContainer>
  );
}


const styles = {
  listContainer: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
  addButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    margin: '20px auto',
    display: 'block',
  },
  headers: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '2px solid #ccc',
    backgroundColor: '#e9ecef',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  transaction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  description: {
    flex: 1,
  },
  amount: {
    flex: 1,
    textAlign: 'center',
  },
  date: {
    flex: 1,
    textAlign: 'center',
  },
  type: {
    flex: 1,
    textAlign: 'center',
  },
};


export default TransactionList;