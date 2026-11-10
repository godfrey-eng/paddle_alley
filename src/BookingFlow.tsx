import React from 'react';
import BookingStep from './Bookingstep';
import ConfirmedStep from './ConfirmedStep';
import FindBooking from './Findbooking';
import PaymentStep from './Paymentstep';
import ReviewStep from './Reviewstep';
import Stepper from './Stepper';
import { useBooking } from './store';
import type { Step } from './store';

const STEPS: Record<Step, React.FC> = {
  1: BookingStep,
  2: ReviewStep,
  3: PaymentStep,
  4: ConfirmedStep,
};

const BookingFlow: React.FC = () => {
  const { tab, step } = useBooking();
  const Current = STEPS[step];
  const wide = tab === 'reserve' && step === 1;

  return (
    <main style={{ maxWidth: wide ? 1080 : 640, margin: '0 auto', padding: '40px 16px 0' }}>
      {tab === 'find' ? (
        <FindBooking />
      ) : (
        <>
          <Stepper />
          <Current />
        </>
      )}
    </main>
  );
};

export default BookingFlow;