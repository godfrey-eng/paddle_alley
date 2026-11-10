import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App';
import './styles.css';

// Brand tokens from the logo and the court.
const theme = {
  token: {
    colorPrimary: '#C3D82E',
    colorTextLightSolid: '#1B3A66',
    colorText: '#1B3A66',
    colorInfo: '#1E5A52',
    fontFamily: 'Poppins, system-ui, sans-serif',
    borderRadius: 8,
  },
};

createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>
);
