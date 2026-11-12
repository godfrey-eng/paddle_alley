import React from 'react';
import { Typography } from 'antd';
import { SLOTS, endOptions, slotStatus, takenHours } from './availability';
import { hourLabel, peso, priceOf } from '../utils/pricing';
import { useAdStore } from '../store/useAdStore';
import { COLORS } from '../theme/theme';
import { Tile } from '../ui';

const SUB = { ok: undefined, booked: 'Booked', short: 'Too long', past: 'Passed' } as const;

const KEY = [
  { label: 'Available', bg: '#fff', border: COLORS.line },
  { label: 'Selected', bg: COLORS.navy, border: COLORS.navy },
  { label: 'Unavailable', bg: '#90929d', border: COLORS.line },
];

const GRID: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 10 };

interface StartTimesProps {
  date: string; // YYYY-MM-DD
  value?: number;
  onChange?: (start: number) => void;
}
export const StartTimes: React.FC<StartTimesProps> = ({ date, value, onChange }) => {
  const { bookings } = useAdStore();
  const taken = takenHours(date, bookings);

  return (
    <div style={GRID}>
      {SLOTS.map((h) => {
        const status = slotStatus(taken, h, 1, date);
        return (
          <Tile key={h} title={hourLabel(h)} sub={SUB[status]} disabled={status !== 'ok'} selected={value === h} onClick={() => onChange?.(h)} />
        );
      })}
    </div>
  );
};

export const SlotKey: React.FC = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, margin: '2px 0 24px' }}>
    {KEY.map(({ label, bg, border }) => (
      <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span aria-hidden style={{ width: 12, height: 12, borderRadius: 3, background: bg, border: `1px solid ${border}` }} />
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>{label}</Typography.Text>
      </span>
    ))}
  </div>
);

interface EndTimesProps {
  date: string;
  start?: number;
  value?: number;
  onChange?: (end: number) => void;
}

export const EndTimes: React.FC<EndTimesProps> = ({ date, start, value, onChange }) => {
  const { bookings } = useAdStore();
  if (start === undefined) return <Typography.Text type="secondary">Choose a start time first.</Typography.Text>;

  const ends = endOptions(takenHours(date, bookings), start);
  return (
    <div style={GRID}>
      {ends.map((e) => (
       <Tile
  key={e}
  title={hourLabel(e)}
  sub={value === e ? peso(priceOf(e - start), false) : undefined}
  selected={value === e}
  onClick={() => onChange?.(e)}
/>
      ))}
    </div>
  );
};