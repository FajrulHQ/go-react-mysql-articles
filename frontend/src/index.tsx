import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import { theme } from './ant.theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const QUERY_CLIENT = new QueryClient()

root.render(
  <QueryClientProvider client={QUERY_CLIENT}>
    <ConfigProvider theme={theme}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConfigProvider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
