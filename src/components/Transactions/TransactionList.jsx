import React, { useState } from 'react';
import styled from 'styled-components';
// import TransactionForm from './TransactionForm';
// import TransactionFilter from './TransactionFilter';
import { useTransactions } from '../../hooks/useTransactions';
import AIAssistant from '../AIAssistant/AIAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';

const TransactionListContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
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
  const { getAdvice } = useAIAssistant();

  const filteredTransactions = transactions.filter(transaction => {
    // Apply filters
    return true; // Placeholder
  });

  return (
    <TransactionListContainer>
      <div>
{/*         <TransactionForm onSubmit={addTransaction} /> */}
{/*         <TransactionFilter onFilterChange={setFilter} /> */}
        {filteredTransactions.map(transaction => (
          <TransactionItem key={transaction.id}>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.date}</span>
            <span>{transaction.type}</span>
          </TransactionItem>
        ))}
      </div>
      <AIAssistant
        advice={getAdvice('transactions', {
          recentTransactions: filteredTransactions.slice(0, 5),
          totalTransactions: filteredTransactions.length,
          // Add more relevant data for AI analysis
        })}
      />
    </TransactionListContainer>
  );
}

export default TransactionList;