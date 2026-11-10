import React from 'react';
import { Modal, Typography } from 'antd';
import { POLICY_NOTE, POLICY_POINTS, POLICY_TITLE } from './policy';
import { COLORS } from './theme';
const SiteFooter: React.FC = () => {
  
  const [modal, modalContext] = Modal.useModal();

  const showPolicy = () =>
    modal.info({
      title: POLICY_TITLE,
      centered: true,
      maskClosable: true,
      okText: 'I understand',
      content: (
        <div style={{ marginTop: 12 }}>
          {POLICY_POINTS.map(({ title, text }) => (
            <div key={title} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700 }}>{title}</div>
              <Typography.Text type="secondary">{text}</Typography.Text>
            </div>
          ))}
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>{POLICY_NOTE}</Typography.Text>
        </div>
      ),
    });

  return (
    <footer
      style={{
        background: COLORS.navyDeep,
        color: '#fff',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 30,
        padding: '30px clamp(10px, 5vw, 60px)',
        marginTop: 50,
      }}
    >
      {modalContext}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
        <img src="/Paddle Alley.png" alt="Paddle Alley" height={200} style={{ display: 'block', borderRadius: 12 }} />
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Play starts here.</div>
          <div style={{ marginTop: 8, color: COLORS.onNavy, fontSize: 14 }}>
                      <a
            >
              {}
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={showPolicy}
        style={{
          background: 'none',
          border: 0,
          padding: 0,
          font: 'inherit',
          fontSize: 13,
          color: COLORS.onNavy,
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
        }}
      >
        {POLICY_TITLE}
      </button>
    </footer>
  );
};

export default SiteFooter;