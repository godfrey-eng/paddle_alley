import { logo } from '../data/content';
import '../footer.css';

const ADDRESS = '5th Block, Angie Subdivision, Kidapawan City';
const MAP_EMBED = 'https://www.google.com/maps?q=5th+block+Angie+Subdivision,+Kidapawan+City&output=embed';
const MAP_LINK = 'https://www.google.com/maps/search/5th+block+Angie+Subdivision,+Kidapawan+City/@7.0187551,125.0883823,16z';
const FB_LINK = 'https://www.facebook.com/profile.php?id=61590423540227';

export default function Footer() {
  return (
    <footer id="location">
      <div className="wrap">
        <img src={logo} alt="Paddle Alley" />
        <div>
          <h3>Play starts here.</h3>
          <p>{ADDRESS}</p>
          <p>Contact: +63 9479555522</p>
          <a className="fb-link" href={FB_LINK} target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
      </svg>
      Find us on Facebook
</a>
        </div>

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
      </div>
    </footer>
  );
}