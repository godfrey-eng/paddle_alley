import '../footer.css';
import { logo } from '../data/content';
import { ADDRESS, CONTACT, FB_LINK } from '../data/location';
import { FacebookIcon } from './icons';
import MapCard from './MapCard';

export default function Footer() {
  return (
    <footer id="location">
      <div className="wrap">
        <img src={logo} alt="Paddle Alley" />
        <div>
          <h3>Play starts here.</h3>
          <p>{ADDRESS}</p>
          <p>{CONTACT}</p>
          <a className="fb-link" href={FB_LINK} target="_blank" rel="noreferrer">
            <FacebookIcon />
            Find us on Facebook
          </a>
        </div>
        <MapCard />
      </div>
    </footer>
  );
}
