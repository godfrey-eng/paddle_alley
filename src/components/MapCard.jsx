const MAP_EMBED = 'https://www.google.com/maps?q=5th+block+Angie+Subdivision,+Kidapawan+City&output=embed';
const MAP_LINK = 'https://www.google.com/maps/search/5th+block+Angie+Subdivision,+Kidapawan+City/@7.0187551,125.0883823,16z';

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
      <a className="map-click" href={MAP_LINK} target="_blank" rel="noreferrer"
         aria-label="Open Paddle Alley location in Google Maps">
        <span>📍 Open in Google Maps →</span>
      </a>
    </div>
  );
}