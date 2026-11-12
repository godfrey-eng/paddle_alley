import '../gallery.css';
import { Image } from 'antd';
import { photos } from '../data/content';
import GalleryPhoto from './GalleryPhoto';
import type { Photo } from '../types';

// The first photo is shown larger than the rest.
const renderPhoto = (photo: Photo, index: number) => (
  <GalleryPhoto key={photo.src} photo={photo} isBig={index === 0} />
);

export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="wrap">
        <p className="eyebrow">Photos</p>
        <h2 className="section-title">See the court.</h2>
        <Image.PreviewGroup>
          <div className="grid">{photos.map(renderPhoto)}</div>
        </Image.PreviewGroup>
      </div>
    </section>
  );
}
