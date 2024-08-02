import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Finance Navigator</h1>
      <nav>
        <ul style={styles.navList}>
          <li><Link to="/" style={styles.navItem}>Home</Link></li>
          <li><Link to="/analytics" style={styles.navItem}>Analytics</Link></li>
          <li><Link to="/transactions" style={styles.navItem}>Transactions</Link></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    margin: '0',
    fontSize: '2.5em',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    margin: '0 15px',
    fontSize: '1.2em',
  },
};

export default Header;
