import { MAP_EMBED, MAP_LINK } from '../data/location';

// Map preview. Clicking anywhere on it opens the location in Google Maps.
export default function MapCard() {
  return (
    <div className="map-box">
      <iframe
        className="map"
        title="Paddle Alley location"
        src={MAP_EMBED}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        className="map-click"
        href={MAP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Paddle Alley location in Google Maps"
      >
        <span>📍 Open in Google Maps →</span>
      </a>
    </div>
  );
}
