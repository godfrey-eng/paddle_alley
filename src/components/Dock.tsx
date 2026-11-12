import '../dock.css';
import {
  selectBookingCount,
  selectBookingOpen,
  selectCloseBooking,
  selectOpenBooking,
  useAdStore,
} from '../store/useAdStore';
import { scrollToTop } from '../utils/time';
import { BookIcon, HomeIcon } from './icons';

const getBookLabel = (count: number): string =>
  count > 0 ? `BOOK · ${count} saved` : 'BOOK';

// Floating Home / Book bar. The lime highlight follows the visitor:
// Home while browsing the page, Book while the booking pop-up is open.
export default function Dock() {
  const bookingOpen = useAdStore(selectBookingOpen);
  const openBooking = useAdStore(selectOpenBooking);
  const closeBooking = useAdStore(selectCloseBooking);
  const savedCount = useAdStore(selectBookingCount);

  const homeClass = bookingOpen ? '' : 'on';
  const bookClass = bookingOpen ? 'on' : '';

  const handleHome = () => {
    closeBooking();
    scrollToTop();
  };

  return (
    <nav className="dock" aria-label="Main">
      <button type="button" className={homeClass} onClick={handleHome}>
        <HomeIcon /> HOME
      </button>
      <button type="button" className={bookClass} onClick={openBooking}>
        <BookIcon />
        {getBookLabel(savedCount)}
      </button>
    </nav>
  );
}
