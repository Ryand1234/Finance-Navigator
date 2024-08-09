import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
//import { TransactionProvider } from './contexts/TransactionContext';
//import { UserProvider } from './contexts/UserContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionList from './components/Transactions/TransactionList';
import AnalyticsCharts from './components/Analytics/AnalyticsCharts';
import ProfilePage from './components/Profile/Profile';
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
           <GlobalStyles />

          <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/analytics" element={<AnalyticsCharts />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          <Footer />
          </Router>
    </ThemeProvider>
  );
}

export default App;