import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import { antTheme } from './theme/brand';
import './styles.css';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <StrictMode>
    <ConfigProvider theme={antTheme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
);