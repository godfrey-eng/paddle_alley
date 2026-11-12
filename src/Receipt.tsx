import React from 'react';
import { Button, message } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { COURT, peso, timeRange } from './pricing';
import type { Booking } from './store';
import { COLORS } from './theme';
import { Actions, Eyebrow } from './ui';

interface ReceiptProps {
  booking: Booking;
  eyebrow: string;
  title: string;
}

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div style={{ fontSize: 12, color: COLORS.muted }}>{label}</div>
    <div style={{ fontWeight: 700 }}>{value}</div>
  </div>
);

const Receipt: React.FC<ReceiptProps> = ({ booking, eyebrow, title }) => {
  const [messageApi, messageContext] = message.useMessage();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(booking.reference);
      messageApi.success('Reference copied');
    } catch {
      messageApi.error('Could not copy. Please copy it manually.');
    }
  };

  return (
    <div>
      {messageContext}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 96,
            height: 96,
            margin: '0 auto 24px',
            borderRadius: '50%',
            background: COLORS.lime,
            color: COLORS.navy,
            display: 'grid',
            placeItems: 'center',
            fontSize: 40,
          }}
        >
          <CheckOutlined />
        </div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 style={{ margin: '14px 0 12px', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
          {title}
        </h2>
        <p style={{ margin: '0 auto 24px',
           maxWidth: 440, 
           color: COLORS.muted }}>
          A confirmation has been created for <strong>{booking.name}</strong>. Save your reference and contact number.
        </p>
      </div>

      <div style={{ textAlign: 'center', 
        padding: 24, 
        background: COLORS.soft,
         border: `1px dashed ${COLORS.lime}` }}>
        <div style={{ fontSize: 11, letterSpacing: '0.18em' }}>BOOKING REFERENCE</div>
        <div style={{ fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: 700, letterSpacing: '-0.02em' }}>{booking.reference}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, marginTop: 24 }}>
        <Detail label="Date" value={dayjs(booking.date).format('MMMM D, YYYY')} />
        <Detail label="Schedule" value={timeRange(booking.start, booking.hours)} />
        <Detail label="Court" value={COURT} />
        <Detail label="Total paid" value={peso(booking.total)} />
      </div>

      <Actions>
        <Button size="large" icon={<CopyOutlined />} onClick={copy}>Copy reference</Button>
      </Actions>
    </div>
  );
};

export default Receipt;