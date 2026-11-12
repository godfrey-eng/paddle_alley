import React from 'react';
import { Typography } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { CLOSE_HOUR, DATE_KEY, OPEN_HOUR } from '../utils/pricing';
import { useAdStore } from '../store/useAdStore';
import type { Booking } from '../store/useAdStore';
import { COLORS } from '../theme/theme';

const DEMO_FULL_DATES = new Set<string>(
  [2, 5, 9, 13, 20].map((n) => dayjs().add(n, 'day').format(DATE_KEY)),
);

/** Every hourly start time: from opening until one hour before closing. */
export const SLOTS = Array.from({ length: CLOSE_HOUR - OPEN_HOUR }, (_, i) => OPEN_HOUR + i);

const hoursUsed = (start: number, hours: number) =>
  Array.from({ length: Math.ceil(start + hours) - Math.floor(start) }, (_, i) => Math.floor(start) + i);

/** Hours already taken on a date: only real bookings made on this site. */
export const takenHours = (date: string, bookings: Booking[]): Set<number> => {
  const taken = new Set<number>();
  bookings
    .filter((b) => b.date === date && b.start !== undefined)
    .forEach((b) => {
      hoursUsed(b.start ?? 0, b.hours ?? 1).forEach((h) => taken.add(h));
    });
  return taken;
};

export type SlotStatus = 'ok' | 'booked' | 'short' | 'past';

export const slotStatus = (taken: Set<number>, start: number, hours: number, date: string): SlotStatus => {
  if (date === dayjs().format(DATE_KEY) && start <= dayjs().hour()) return 'past';
  if (taken.has(start)) return 'booked';
  const fits = start + hours <= CLOSE_HOUR && hoursUsed(start, hours).every((h) => !taken.has(h));
  return fits ? 'ok' : 'short';
};

export const endOptions = (taken: Set<number>, start: number): number[] => {
  const ends: number[] = [];
  for (let h = start + 1; h <= CLOSE_HOUR && !taken.has(h - 1); h++) ends.push(h);
  return ends;
};

export const isPast = (d: Dayjs) => d.isBefore(dayjs(), 'day');

export const isOccupied = (d: Dayjs): boolean => {
  const key = d.format(DATE_KEY);
  if (DEMO_FULL_DATES.has(key)) return true;
  const taken = takenHours(key, useAdStore().bookings);
  const passed = key === dayjs().format(DATE_KEY) ? dayjs().hour() : -1;
  return SLOTS.every((h) => taken.has(h) || h <= passed);
};

export const firstAvailableDate = (): string => {
  let d = dayjs();
  while (isOccupied(d)) d = d.add(1, 'day');
  return d.format(DATE_KEY);
};

export const Legend: React.FC = () => (
  <div style={{ display: 'flex', gap: 20, margin: '12px 0 8px' }}>
    {[
      { color: COLORS.available, label: 'Available' },
      { color: COLORS.occupied, label: 'Fully Booked' },
    ].map(({ color, label }) => (
      <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span aria-hidden style={{ display: 'inline-block', 
          width: 14, 
          height: 14, 
          borderRadius: 4,
          background: color }} />
        <Typography.Text type="secondary">{label}</Typography.Text>
      </span>
    ))}
  </div>
);

export const makeDateCell =
  (selectedDate?: Dayjs): DatePickerProps['cellRender'] =>
  (current, info) => {
    if (info.type !== 'date') return info.originNode;
    const date = current as Dayjs;
    if (isPast(date)) return info.originNode;

    const occupied = isOccupied(date);
    const selected = !!selectedDate && date.isSame(selectedDate, 'day');
    return (
      <div
        className="ant-picker-cell-inner"
        title={occupied ? 'Fully Booked' : 'Available'}
        style={{
          background: occupied ? COLORS.occupied : COLORS.available,
          color: '#fff',
          borderRadius: 6,
          boxShadow: selected ? `0 0 0 2px #fff, 0 0 0 4px ${COLORS.navy}` : undefined,
        }}
      >
        {date.date()}
      </div>
    );
  };