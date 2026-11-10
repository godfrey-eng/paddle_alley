import '../dock.css';
import { useAdStore } from '../store/useAdStore';

const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1B3A66" strokeWidth="2">{children}</svg>
);

// Floating Home / Book bar. The lime highlight follows the visitor:
// Home while browsing the page, Book while the booking pop-up is open.
export default function Dock() {
  const bookingOpen = useAdStore((s) => s.bookingOpen);
  const openBooking = useAdStore((s) => s.openBooking);
  const closeBooking = useAdStore((s) => s.closeBooking);
  const count = useAdStore((s) => s.bookings.length);

  const goHome = () => {
    closeBooking();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="dock" aria-label="Main">
      <button type="button" className={!bookingOpen ? 'on' : ''} onClick={goHome}>
        <Svg><path d="M3 11l9-8 9 8v10H3z" /></Svg> HOME
      </button>
      <button type="button" className={bookingOpen ? 'on' : ''} onClick={() => openBooking()}>
        <Svg><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M8 2v4M16 2v4M3 10h18M9 15l2 2 4-4" /></Svg>
        BOOK{count > 0 ? ` · ${count} saved` : ''}
      </button>
    </nav>
  );
}
