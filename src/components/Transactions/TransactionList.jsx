import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import TransactionForm from './TransactionForm';
import FilterModal from './TransactionFilter';
import { useTransactions } from '../../hooks/useTransactions';
import AIAssistant from '../AIAssistant/AIAssistant';
import * as XLSX from 'xlsx';
import { Button } from 'react-bootstrap';
// import { useAIAssistant } from '../../hooks/useAIAssistant';



const TransactionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;





function TransactionList() {
  const { transactions, addTransaction } = useTransactions();
  const [filter, setFilter] = useState({});
  const [showPopup, setShowPopup] = useState(false);
   const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleShowFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
    setFileName(file.name);

    if (!allowedExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      alert('Invalid file type. Please upload an Excel file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: 'yyyy-mm-dd' });

      // Convert Excel date numbers to JavaScript Date objects
      const convertedData = parsedData.map(row => {
        const convertedRow = { ...row };
        for (let key in convertedRow) {
          if (typeof convertedRow[key] === 'number' && !isNaN(convertedRow[key])) {
            const potentialDate = XLSX.SSF.parse_date_code(convertedRow[key]);
            if (potentialDate) {
              convertedRow[key] = new Date(potentialDate.y, potentialDate.m - 1, potentialDate.d).toISOString().split('T')[0];
            }
          }
        }
        return convertedRow;
      });
      convertedData.forEach((curTransaction) => {
          const credit = curTransaction.Credit;
          const debit = curTransaction.Debit;
          const date = curTransaction.Date;
          const remarks = curTransaction.Remarks;
         if(debit === undefined) {
             const type = "income";
             addTransaction({ amount: parseFloat(credit), description: remarks, type, date })
          }
        if(credit === undefined) {
            const type = "expense";
            addTransaction({ amount: parseFloat(debit), description: remarks, type, date })
        }
      })
    };
    reader.readAsBinaryString(file);
  };

  const handleFilterChange = (field, value) => {
    setFilter(field);
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

    if (filter.minAmount && transaction.amount > filter.minAmount) {
      return false;
    }

    if (filter.maxAmount && transaction.amount > filter.maxAmount) {
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
        <button onClick={handleButtonClick} style={styles.addButton}>
            {fileName ? `File selected: ${fileName}` : 'Choose Transaction File to Upload'}
        </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept=".xlsx,.xls"
          />
      </header>
      <div style={styles.list}>

      <Button onClick={handleShowFilterModal}>Open Filters</Button>

      <FilterModal
        show={showFilterModal}
        handleClose={handleCloseFilterModal}
        onApplyFilters={handleFilterChange}
      />

{/*        */}{/* Display applied filters */}
{/*       {Object.keys(filter).length > 0 && ( */}
{/*         <div className="mt-3"> */}
{/*           <h3>Applied Filters:</h3> */}
{/*           <pre>{JSON.stringify(filter, null, 2)}</pre> */}
{/*         </div> */}
{/*       )} */}
        <div style={styles.headers}>
          <span style={styles.headerItem} onClick={() => handleFilterChange('description', prompt('Filter by description:'))}>Description</span>
          <span style={styles.headerItem} onClick={() => handleFilterChange('amount', prompt('Filter by amount:'))}>Amount</span>
          <span style={styles.headerItem} onClick={() => handleFilterChange('date', prompt('Filter by date:'))}>Date</span>
          <span style={styles.headerItem} onClick={() => handleFilterChange('type', prompt('Filter by type:'))}>Type</span>
        </div>
        {filteredTransactions.map((transaction) => (
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
    flexWrap: 'wrap',
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
    overflow: 'auto',
    overflowWrap: 'anywhere'
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