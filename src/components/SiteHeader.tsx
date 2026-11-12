import React from 'react';
import { useAdStore } from '../store/useAdStore';
import type { Tab } from '../store/useAdStore';
import { COLORS } from '../theme/theme';

const TABS: { id: Tab; label: string }[] = [
  { id: 'reserve', label: 'Reserve a court' },
];

const HEADINGS: Record<Tab, string> = {
  reserve: 'Let’s get you on court.',
  find: 'Find your reservation.',
};

const SiteHeader: React.FC = () => {
  const { tab, setTab } = useAdStore();

  return (
    <>
      <header
        className="no-print"
        style={{
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          padding: '16px 16px',
        }}
      >
        <img src="/logo-mark.png" alt="PA logo" height={64} style={{ display: 'block' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: COLORS.navy, fontSize: 'clamp(18px, 3.4vw, 26px)', fontWeight: 500, letterSpacing: '0.2em', paddingLeft: '0.2em' }}>
            PADDLE ALLEY
          </div>
          <div style={{ marginTop: 2, color: COLORS.navy, opacity: 0.75, fontSize: 12, letterSpacing: '0.08em', paddingLeft: '0.08em' }}>
            Serve • Dink • Smash
          </div>
        </div>
      </header>

      <section className="no-print" style={{ background: COLORS.navy, textAlign: 'center', padding: '56px 16px 0' }}>
        <div style={{ color: COLORS.oliveOnNavy,
           fontSize: 12,
            fontWeight: 700, 
            letterSpacing: '0.22em' }}>
          PADDLE ALLEY COURT 
        </div>
        <h1 style={{ margin: '12px 0 12px', color: '#fff', fontSize: 'clamp(36px, 7vw, 68px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
          {HEADINGS[tab]}
        </h1>
        <p style={{ margin: 0, color: COLORS.onNavy, fontSize: 'clamp(15px, 2vw, 18px)' }}>
          No account needed. It only takes a minute.
        </p>

        <nav style={{ display: 'flex', 
                      justifyContent: 'center', 
                      gap: 'clamp(24px, 6vw, 56px)', 
                      marginTop: 40 }}>
          {TABS.map(({ id, label }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => setTab(id)}
                style={{
                  background: 'none',
                  border: 0,
                  borderBottom: `4px solid ${active ? COLORS.lime : 'transparent'}`,
                  padding: '14px 8px 16px',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: 'clamp(15px, 2vw, 18px)',
                  cursor: 'pointer',
                  color: active ? '#fff' : '#a9b4c6',
                }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </section>
    </>
  );
};

export default SiteHeader;