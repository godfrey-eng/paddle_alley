import type { ReactNode } from 'react';
import { COLORS } from '../theme/brand';

interface StrokeIconProps {
  size: number;
  color: string;
  children: ReactNode;
}

// Base for the outline icons: sets the size and stroke once.
function StrokeIcon({ size, color, children }: StrokeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
    >
      {children}
    </svg>
  );
}

export function HomeIcon() {
  return (
    <StrokeIcon size={20} color={COLORS.navy}>
      <path d="M3 11l9-8 9 8v10H3z" />
    </StrokeIcon>
  );
}

export function BookIcon() {
  return (
    <StrokeIcon size={20} color={COLORS.navy}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18M9 15l2 2 4-4" />
    </StrokeIcon>
  );
}

export function ClockIcon() {
  return (
    <StrokeIcon size={22} color={COLORS.green}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </StrokeIcon>
  );
}

export function GridIcon() {
  return (
    <StrokeIcon size={22} color={COLORS.green}>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M12 3v18M3 12h18" />
    </StrokeIcon>
  );
}

export function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
    </svg>
  );
}
