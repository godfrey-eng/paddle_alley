import { ConfigProvider } from 'antd';
import Dock from './components/Dock';
import HomeView from './components/HomeView';
import BookingView from './components/BookingView';
import { useAdStore, selectBookingOpen } from './store/useAdStore';

const COLORS = {
  navy: '#102a43',
  available: '#52c41a',
  occupied: '#ff4d4f',
  ink: '#1f2937',
  olive: '#657a3a',
  lime: '#d9f36a',
  limeHover: '#c7e45b',
  limeActive: '#b5d34c',
  page: '#f7f8f3',
};
const FONT = "'Poppins', sans-serif";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
body { margin: 0; font-family: ${FONT}; color: ${COLORS.navy}; }
.ant-form-item .ant-form-item-label > label { font-weight: 600; }
.ant-modal-title { font-weight: 700; letter-spacing: -0.02em; }
.ant-picker-cell-disabled:has(.ant-picker-cell-inner[title="Occupied"])::before { background: transparent; }
@media (max-width: 520px) { .step-label:not(.is-current) { display: none; } }
@media print { footer, .no-print { display: none !important; } body { background: #fff; } }
`;

export default function App() {
  // Read whether the booking view is active from your Zustand store
  const bookingOpen = useAdStore(selectBookingOpen);

  return (
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
        {bookingOpen ? <BookingView /> : <HomeView />}
        <Dock />
      </div>
    </ConfigProvider>
  );
}