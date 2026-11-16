import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { antTheme } from './theme/brand';
import { loadSettings } from './utils/settings';
import './styles.css';

// The price and hours must be loaded before any page reads them, so the app
// is imported only after loadSettings() has applied the saved values.
loadSettings().then(async () => {
  const { default: App } = await import('./App.tsx');
  const rootElement = document.getElementById('root') as HTMLElement;

  createRoot(rootElement).render(
    <StrictMode>
      <ConfigProvider theme={antTheme}>
        <App />
      </ConfigProvider>
    </StrictMode>,
  );
});
