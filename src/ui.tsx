import React from 'react';
import { COLORS } from './theme';

export const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 600, fontSize: 14, margin: '24px 0 8px' };

export const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <section
    style={{
      background: COLORS.card,
      borderRadius: 24,
      boxShadow: '0 20px 50px rgba(27,52,85,.08)',
      padding: 'clamp(20px, 5vw, 40px)',
      ...style,
    }}
  >
    {children}
  </section>
);

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: COLORS.olive, fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
    {children}
  </div>
);

export const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 style={{ margin: '12px 0 8px', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
    {children}
  </h2>
);

export const Muted: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ margin: '0 0 24px', color: COLORS.muted }}>{children}</p>
);

export const Actions: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
    {children}
  </div>
);

/** Shows "Label *" so required fields end with an asterisk, like the design. */
export const requiredAfter = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {label}
    {required && ' *'}
  </>
);

interface RowItem {
  label: string;
  value: React.ReactNode;
  sub?: string;
  big?: boolean;
}

export const Rows: React.FC<{ rows: RowItem[] }> = ({ rows }) => (
  <div style={{ margin: '16px 0 24px' }}>
    {rows.map(({ label, value, sub, big }) => (
      <div
        key={label}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: big ? 'center' : 'flex-start',
          gap: 16,
          padding: '16px 0',
          borderTop: `1px solid ${COLORS.line}`,
        }}
      >
        <span style={{ color: COLORS.muted }}>{label}</span>
        <span style={{ textAlign: 'right', fontWeight: 700, fontSize: big ? 28 : 14 }}>
          {value}
          {sub && <div style={{ fontSize: 12, fontWeight: 400, color: COLORS.muted }}>{sub}</div>}
        </span>
      </div>
    ))}
  </div>
);

interface TileProps {
  title: string;
  sub?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

/** Selectable tile used for start times and durations. */
export const Tile: React.FC<TileProps> = ({ title, sub, selected, disabled, onClick }) => (
  <button
    type="button"
    disabled={disabled}
    aria-pressed={selected}
    onClick={onClick}
    style={{
      height: 64,
      padding: '4px 2px',
      borderRadius: 10,
      fontFamily: 'inherit',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      border: `1px solid ${selected ? COLORS.navy : COLORS.line}`,
      background: selected ? COLORS.navy : disabled ? "#e5e7eb" : '#fff',
      color: selected ? '#fff' : disabled ? '#9aa0a6' : COLORS.navy,
    }}
  >
    <span style={{ fontWeight: 600, fontSize: 14, textDecoration: disabled ? 'line-through' : 'none' }}>{title}</span>
    {sub && (
      <span style={{ fontSize: 11, fontWeight: 600, color: selected ? COLORS.lime : disabled ? '#9aa0a6' : COLORS.olive }}>
        {sub}
      </span>
    )}
  </button>
);