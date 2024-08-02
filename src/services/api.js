// src/services/api.js

const API_BASE_URL = 'https://api.yourfinanceapp.com'; // Replace with your actual API URL

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Add any authentication headers here if needed
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Transactions
//export const getTransactions = () => apiCall('/transactions');
export const addTransaction = (transaction) => apiCall('/transactions', 'POST', transaction);
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
const MOCK_DATA = {
  transactions: [
    { id: 1, description: 'Salary', amount: 5000, type: 'income', date: '2023-08-01' },
    { id: 2, description: 'Rent', amount: 1500, type: 'expense', date: '2023-08-05' },
    // Add more mock transactions...
  ],
  accountSummary: {
    totalBalance: 10000,
    totalIncome: 15000,
    totalExpenses: 5000,
  },
  analyticsData: {
    expenseVsTime: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Expenses',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    },
    savingsRemaining: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Savings',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        },
  },
  forecastData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Forcast',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    },
};

// Uncomment these lines to use mock data (for development/testing)

export const getTransactions = () => Promise.resolve(MOCK_DATA.transactions);
export const getAccountSummary = () => Promise.resolve(MOCK_DATA.accountSummary);
export const getAnalyticsData = () => Promise.resolve(MOCK_DATA.analyticsData);
export const getForecastData = () => Promise.resolve(MOCK_DATA.forecastData);
export const getAIAdvice = () => Promise.resolve("This is mock AI advice.");
