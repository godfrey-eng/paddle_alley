import Header from './Header';
import HeroAd from './HeroAd';
import RateCard from './RateCard';
import Gallery from './Gallery';
import Faq from './Faq';
import Footer from './Footer';
import useReveal from '../hooks/useReveal';

// The marketing landing page.
// useReveal lives HERE (not in App) so it runs again every time this view mounts,
// e.g. when the visitor goes Home -> Book -> Home. Otherwise the new [data-reveal]
// elements are never observed and stay invisible (opacity: 0).
export default function HomeView() {
  useReveal();

  return (
    <>
      <Header />
      <main>
        <HeroAd />
        <RateCard />
        <Gallery />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
