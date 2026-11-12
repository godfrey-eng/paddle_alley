import type { SiteStatus } from '../types';

interface CourtPhotoProps {
  src: string;
  status: SiteStatus;
}

// Court picture with the live open / closed pill on top.
export default function CourtPhoto({ src, status }: CourtPhotoProps) {
  const dotClass = status.open ? '' : 'off';

  return (
    <div className="court-photo">
      <img className="court-photo-img" src={src} alt="Paddle Alley court" />
      <span className="pill">
        <i className={dotClass} /> {status.text}
      </span>
    </div>
  );
}
