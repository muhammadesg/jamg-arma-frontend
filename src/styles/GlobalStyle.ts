import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #0f172a;
    background-color: #f1f5f9;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input,
  textarea,
  select {
    font-family: inherit;
  }

  .ant-layout {
    background: transparent !important;
  }

  .ant-menu-dark {
    background: transparent !important;
  }

  .ant-btn-primary {
    background-color: #22c55e !important;
    border-color: #22c55e !important;
  }

  .ant-btn-primary:hover {
    background-color: #16a34a !important;
    border-color: #16a34a !important;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #e2e8f0;
  }

  ::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }
`;
