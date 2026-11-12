// Shared types for the home page.

export interface SiteStatus {
  open: boolean;
  text: string;
}

export interface HeroSlide {
  src: string;
  focus: string; // CSS class from hero-slides.css that sets the crop point
}

export interface Photo {
  src: string;
  alt: string;
}

export interface Fact {
  value: string;
  label: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export type CourtIconName = 'clock' | 'grid';

export interface CourtDetail {
  icon: CourtIconName;
  label: string;
  value: string;
}

export interface Booking {
  date: string;
  slot: string | null;
  name: string;
}
