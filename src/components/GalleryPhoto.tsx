import { Image } from 'antd';
import type { Photo } from '../types';

interface GalleryPhotoProps {
  photo: Photo;
  isBig: boolean;
}

export default function GalleryPhoto({ photo, isBig }: GalleryPhotoProps) {
  const tileClass = isBig ? 'big' : '';

  return (
    <div data-reveal className={tileClass}>
      <Image src={photo.src} alt={photo.alt} />
    </div>
  );
}
