import '../courtcard.css';
import { Button} from 'antd';
import { banner } from '../data/content';
import { useAdStore } from '../store/useAdStore';
import { getStatus } from '../utils/time';

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1E5A52" strokeWidth="2">{children}</svg>
);

// Court card with a quick time pick, then reserve.
export default function RateCard() {
  const { openBooking } = useAdStore();
  const status = getStatus();

  return (
    <section id="court">
      <div className="wrap">
        <div className="head" data-reveal>
          <div>
            <p className="eyebrow">The court</p>
            <h2>Built for better rallies.</h2>
          </div>
          <p className="muted lead">A thoughtfully maintained court with everything you need for a great game.</p>
        </div>

        <div className="court-card" data-reveal>
          <div className="court-photo" style={{ backgroundImage: `url(${banner})` }}>
            <span className="pill"><i className={status.open ? '' : 'off'} /> {status.text}</span>
          </div>
          <div className="court-info">
            <p className="eyebrow">Our one &amp; only</p>
            <h3>Paddle Alley Court</h3>
            <p className="muted">Competition-grade surface, bright lighting, and a comfortable sideline area—made for casual games and serious sets alike.</p>
            <div className="row">
              <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
              <div><small>Operating hours</small><b>6:00 AM – 11:00 PM</b></div>
            </div>
            <div className="row">
              <Icon><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M12 3v18M3 12h18" /></Icon>
              <div><small>Standard rate</small><b>₱200 / hour</b></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
