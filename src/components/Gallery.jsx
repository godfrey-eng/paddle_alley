import '../gallery.css';
import { Image } from 'antd';
import { photos } from '../data/content';

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="wrap">
        <p className="eyebrow">Photos</p>
        <h2 style={{ marginBottom: 32 }}>See the court.</h2>
        <Image.PreviewGroup>
          <div className="grid">
            {photos.map((p, i) => (
              <div key={p.src} data-reveal className={i === 0 ? 'big' : ''}
                style={{ transitionDelay: `${i * 90}ms` }}>
                <Image src={p.src} alt={p.alt} />
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      </div>
    </section>
  );
}
