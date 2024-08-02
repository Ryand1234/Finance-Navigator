// src/services/api.js
//
//const API_BASE_URL = 'https://api.yourfinanceapp.com'; // Replace with your actual API URL
//
//// Helper function for API calls
//async function apiCall(endpoint, method = 'GET', data = null) {
//  const options = {
//    method,
//    headers: {
//      'Content-Type': 'application/json',
//      // Add any authentication headers here if needed
//    },
//  };
//
//  if (data) {
//    options.body = JSON.stringify(data);
//  }
//
//  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
//
//  if (!response.ok) {
//    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
//  }
//
//  return response.json();
//}

// Transactions
//export const getTransactions = () => apiCall('/transactions');
//export const addTransaction = (transaction) => apiCall('/transactions', 'POST', transaction);
//
//// Account Summary
//export const getAccountSummary = () => apiCall('/account/summary');
//
//// Analytics
//export const getAnalyticsData = () => apiCall('/analytics');
//
//// Forecasting
//export const getForecastData = () => apiCall('/forecast');
//
//// AI Advice
//export const getAIAdvice = (context, data) => apiCall('/ai/advice', 'POST', { context, data });
//
// You can add more API functions here as needed

// For development/testing purposes, you might want to add mock data:
//const MOCK_DATA = {
//  transactions: [
//    { id: 1, description: 'Salary', amount: 5000, type: 'income', date: '2023-08-01' },
//    { id: 2, description: 'Rent', amount: 1500, type: 'expense', date: '2023-08-05' },
//    // Add more mock transactions...
//  ],
//  accountSummary: {
//    totalBalance: 10000,
//    totalIncome: 15000,
//    totalExpenses: 5000,
//  },
//  analyticsData: {
//    expenseVsTime: {
//      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//      datasets: [
//        {
//          label: 'Expenses',
//          data: [65, 59, 80, 81, 56, 55, 40],
//          fill: false,
//          borderColor: 'rgb(75, 192, 192)',
//          tension: 0.1
//        }
//      ]
//    },
//    savingsRemaining: {
//          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//          datasets: [
//            {
//              label: 'Savings',
//              data: [65, 59, 80, 81, 96, 55, 40],
//              fill: true,
//              borderColor: 'rgb(75, 192, 192)',
//              tension: 0.1
//            }
//          ]
//        },
//  },
//  forecastData: {
//      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//      datasets: [
//        {
//          label: 'Forcast',
//          data: [65, 59, 80, 81, 56, 55, 40],
//          fill: false,
//          borderColor: 'rgb(75, 192, 192)',
//          tension: 0.1
//        }
//      ]
//    },
//};

// Uncomment these lines to use mock data (for development/testing)

//export const getTransactions = () => Promise.resolve(MOCK_DATA.transactions);
//export const getAccountSummary = () => Promise.resolve(MOCK_DATA.accountSummary);
//export const getAnalyticsData = () => Promise.resolve(MOCK_DATA.analyticsData);
//export const getForecastData = () => Promise.resolve(MOCK_DATA.forecastData);
//export const getAIAdvice = () => Promise.resolve("This is mock AI advice.");


// src/services/api.js

const LOCAL_STORAGE_KEY = 'financeAppData';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September',
    'October', 'November', 'December'
]
const zero_data = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
const BASE_ANALYTICS_DATA = {
  expenseVsTime: {
      labels: months,
      datasets: [
        {
          label: 'Expenses',
          data: zero_data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    },
    savingsRemaining: {
          labels: months,
          datasets: [
            {
              label: 'Savings',
              data: zero_data,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        },
  forecastData: {
      labels: months,
      datasets: [
        {
          label: 'Forcast',
          data: zero_data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
}
};
// Helper function to get data from local storage
const getDataFromLocalStorage = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : { transactions: [], accountSummary: {}, analyticsData: {} };
};

// Helper function to save data to local storage
const saveDataToLocalStorage = (data) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

const getNumber = (amount) => {
  let transactionAmount;

  if (typeof amount === 'string') {
      transactionAmount = parseFloat(amount); // Convert to integer if it's a string
  } else if (typeof amount === 'number' && !Number.isInteger(amount)) {
      transactionAmount = amount; // Already an integer
  } else {
      transactionAmount = 0.0; // Handle other types as needed
  }
  return transactionAmount
}


// savings by month
export const getCurrentMonthSavings = (monthIndex) => {
  const data = getDataFromLocalStorage();
  // Calculate account summary based on transactions
  const totalSavings = data.transactions.reduce((acc, tx) => {
    const txMonth = new Date(tx.date).getMonth();
    // Check if the transaction is in the current month
    if (txMonth === monthIndex) {
      return tx.type === 'income' ? acc + tx.amount : acc - tx.amount; // Add if income, subtract if expense
    }
    return acc; // If not in current month, keep the accumulator unchanged
  }, 0);
  return getNumber(totalSavings);
}

const updateChartData = (data, transaction) => {
  // Assuming you have chart data structure like this
  if (!data.analyticsData) {
    data.analyticsData = { expenseVsTime: [], savingsRemaining: [] }; // Initialize if not present
  }

  // Example of updating expenseVsTime data
  const monthIndex = new Date(transaction.date).getMonth();
  const year = new Date(transaction.date).getFullYear();

  // Update based on transaction type
  if (transaction.type === 'expense') {
    console.log(data.analyticsData)
    // Assuming each month has an index and expenses are added
    if (!data.analyticsData[year]) {
      const currentMonthSavings = getCurrentMonthSavings(monthIndex)
      data.analyticsData[year] = JSON.parse(JSON.stringify(BASE_ANALYTICS_DATA));
      data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] = getNumber(currentMonthSavings);
    }
    data.analyticsData[year].expenseVsTime['datasets'][0]['data'][monthIndex] += getNumber(transaction.amount);
    data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] -= getNumber(transaction.amount);
  } else if (transaction.type === 'income') {
    // Similar logic for income
    // Update income data if needed
    if (!data.analyticsData[year]) {
      const currentMonthSavings = getCurrentMonthSavings(monthIndex)
      data.analyticsData[year] = JSON.parse(JSON.stringify(BASE_ANALYTICS_DATA));
      data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] = getNumber(currentMonthSavings);
    }
    data.analyticsData[year].savingsRemaining['datasets'][0]['data'][monthIndex] += getNumber(transaction.amount);
  }

  // Update savingsRemaining or other datasets as needed
};

// Transactions
export const getTransactions = () => {
  const data = getDataFromLocalStorage();
  return Promise.resolve(data.transactions);
};

export const addTransaction = (transaction) => {
  const data = getDataFromLocalStorage();
  const newTransaction = { ...transaction, id: Date.now() }; // Generate a unique ID based on timestamp
  data.transactions.push(newTransaction);
  updateChartData(data, newTransaction);
  saveDataToLocalStorage(data);
  return Promise.resolve(newTransaction);
};

// Account Summary
export const getAccountSummary = () => {
  const data = getDataFromLocalStorage();
  // Calculate account summary based on transactions
  const totalBalance = data.transactions.reduce((acc, tx) => {
    return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
  }, 0);

  const totalIncome = data.transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const totalExpenses = data.transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, tx) => acc + tx.amount, 0);

  const summary = { totalBalance, totalIncome, totalExpenses };
  data.accountSummary = summary;
  saveDataToLocalStorage(data);
  return Promise.resolve(summary);
};

// Analytics
export const getAnalyticsData = () => {
  const data = getDataFromLocalStorage();
  const year = new Date().getFullYear();
  // Placeholder for analytics logic, can be enhanced later
  return Promise.resolve(data.analyticsData[year]);
};

// Forecasting
export const getForecastData = () => {
  const data = getDataFromLocalStorage();
  const year = new Date().getFullYear();
  // Placeholder for forecasting logic, can be enhanced later
  return Promise.resolve(data.analyticsData[year].forecastData);
};

// AI Advice
export const getAIAdvice = () => {
  // Placeholder for AI advice logic, can be enhanced later
  return Promise.resolve("This is mock AI advice.");
};

