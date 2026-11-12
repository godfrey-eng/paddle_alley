import type { ReactNode } from 'react';
import { ClockIcon, GridIcon } from './icons';
import type { CourtDetail, CourtIconName } from '../types';

const ICONS: Record<CourtIconName, ReactNode> = {
  clock: <ClockIcon />,
  grid: <GridIcon />,
};

interface CourtDetailRowProps {
  detail: CourtDetail;
}

export default function CourtDetailRow({ detail }: CourtDetailRowProps) {
  return (
    <div className="row">
      {ICONS[detail.icon]}
      <div>
        <small>{detail.label}</small>
        <b>{detail.value}</b>
      </div>
    </div>
  );
}
