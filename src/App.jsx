import Header from './components/Header';
import HeroAd from './components/HeroAd';
import RateCard from './components/RateCard';
import Gallery from './components/Gallery';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Dock from './components/Dock';
import useReveal from './hooks/useReveal';

export default function App() {
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
      <Dock />
    </>
  );
}
