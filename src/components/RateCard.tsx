import '../courtcard.css';
import '../court-photo.css';
import { banner, courtDetails } from '../data/content';
import { getStatus } from '../utils/time';
import CourtDetailRow from './CourtDetailRow';
import CourtPhoto from './CourtPhoto';

const renderDetail = (detail: (typeof courtDetails)[number]) => (
  <CourtDetailRow key={detail.label} detail={detail} />
);

// Court card: photo, opening hours and the standard rate.
export default function RateCard() {
  const status = getStatus();

  return (
    <section id="court">
      <div className="wrap">
        <div className="head" data-reveal>
          <div>
            <p className="eyebrow">The court</p>
            <h2>Built for better rallies.</h2>
          </div>
          <p className="muted lead">
            A thoughtfully maintained court with everything you need for a great game.
          </p>
        </div>

        <div className="court-card" data-reveal>
          <CourtPhoto src={banner} status={status} />
          <div className="court-info">
            <p className="eyebrow">Our one &amp; only</p>
            <h3>Paddle Alley Court</h3>
            <p className="muted">
              Competition-grade surface, bright lighting, and a comfortable sideline area—made
              for casual games and serious sets alike.
            </p>
            {courtDetails.map(renderDetail)}
          </div>
        </div>
      </div>
    </section>
  );
}
