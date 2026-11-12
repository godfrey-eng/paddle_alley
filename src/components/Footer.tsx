import '../footer.css';
import { logo } from '../data/content';
import { ADDRESS, CONTACT, FB_LINK } from '../data/location';
import { FacebookIcon } from './icons';
import MapCard from './MapCard';
import { useAdStore } from '../store/useAdStore';

export default function Footer() {
  const openAdmin = useAdStore((state) => state.openAdmin);

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
          <div className="staff-portal">
            <button type="button" className="staff-link" onClick={openAdmin}>
              Staff portal
            </button>
          </div>
        </div>
        <MapCard />
      </div>
    </footer>
  );
}
