import SiteHeader from './SiteHeader';
import BookingFlow from './BookingFlow';
import SiteFooter from './SiteFooter';

// The reservation page. BookingFlow draws the stepper AND the active step
// (BookingStep, ReviewStep, PaymentStep or ConfirmedStep), and has its own <main>.
export default function BookingView() {
  return (
    <>
      <SiteHeader />
      <BookingFlow />
      <SiteFooter />
    </>
  );
}
