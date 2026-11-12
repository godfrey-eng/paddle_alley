import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import theme from './theme'

createRoot(document.getElementById('root')).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>,
)
