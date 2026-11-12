import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { useAdStore } from '../store/useAdStore';
import { COLORS } from '../theme/theme';

const STEPS = ['Booking', 'Review', 'Payment', 'Confirmed'];

const Stepper: React.FC = () => {
  const step = useAdStore((state) => state.step);
  return (
    <nav
      aria-label="Booking progress"
      style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}
    >
      {STEPS.map((label, i) => {
        const n = i + 1;
        const active = n <= step;
        return (
          <React.Fragment key={label}>
            <div aria-current={n === step ? 'step' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  background: active ? COLORS.lime : 'transparent',
                  border: `1.5px solid ${active ? COLORS.lime : '#cfd3d8'}`,
                  color: active ? COLORS.navy : COLORS.muted,
                }}
              >
                {n < step ? <CheckOutlined /> : n}
              </span>
              <span
                className={n === step ? 'step-label is-current' : 'step-label'}
                style={{ 
                  fontSize: 13, 
                  fontWeight: 600, 
                  whiteSpace: 'nowrap', 
                  color: active ? COLORS.navy : COLORS.muted }}
              >
                {label}
              </span>
            </div>
            {n < STEPS.length && <span aria-hidden style={{ 
              flex: '1 1 12px', 
              minWidth: 8, 
              maxWidth: 64,
               height: 1,
                background: '#cfd3d8' }} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Stepper;