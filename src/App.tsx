import React from 'react';
import { ConfigProvider } from 'antd';
import BookingFlow from './BookingFlow';
import SiteFooter from './Sitefooter';
import SiteHeader from './Siteheader';
import { COLORS, FONT } from './theme';

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
body { margin: 0; font-family: ${FONT}; color: ${COLORS.navy}; }
.ant-form-item .ant-form-item-label > label { font-weight: 600; }
.ant-modal-title { font-weight: 700; letter-spacing: -0.02em; }
.ant-picker-cell-disabled:has(.ant-picker-cell-inner[title="Occupied"])::before { background: transparent; }
/* very small screens: show only the current step's name so all 4 steps stay on one row */
@media (max-width: 520px) { .step-label:not(.is-current) { display: none; } }
@media print { footer, .no-print { display: none !important; } body { background: #fff; } }
`;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: COLORS.navy,
        colorSuccess: COLORS.available,
        colorInfo: COLORS.navy,
        colorError: COLORS.occupied,
        colorText: COLORS.ink,
        colorLink: COLORS.navy,
        colorLinkHover: COLORS.olive,
        borderRadius: 10,
        controlHeight: 48,
        fontFamily: FONT,
      },
      components: {
    
        Button: {
          colorPrimary: COLORS.lime,
          colorPrimaryHover: COLORS.limeHover,
          colorPrimaryActive: COLORS.limeActive,
          primaryColor: COLORS.navy,
          fontWeight: 700,
          controlHeightLG: 52,
         
          defaultHoverColor: COLORS.navy,
          defaultHoverBorderColor: COLORS.navy,
          defaultActiveColor: COLORS.navy,
          defaultActiveBorderColor: COLORS.navy,
        },
      },
    }}
  >
    <style>{GLOBAL_CSS}</style>
    <div style={{ minHeight: '100vh', background: COLORS.page }}>
      <SiteHeader />
      <BookingFlow />
      <SiteFooter />
    </div>
  </ConfigProvider>
);

export default App;