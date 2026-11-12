import '../header.css';
import logoMark from '../assets/logo-mark.png';
import useHeaderFade from '../hooks/useHeaderFade';

export default function Header() {
  const headerRef = useHeaderFade();

  return (
    <header className="header" ref={headerRef}>
      <a href="#top">
        <img src={logoMark} alt="" />
        <span>PADDLE ALLEY</span>
      </a>
    </header>
  );
}
