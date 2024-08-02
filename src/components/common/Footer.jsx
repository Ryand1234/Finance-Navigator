import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Finance Navigator. All rights reserved.</p>
      <p>Designed for personal financial management.</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

export default Footer;
