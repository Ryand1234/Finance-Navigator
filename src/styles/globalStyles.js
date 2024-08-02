import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f4f4f4;
  }

  a {
    color: #1a73e8;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;