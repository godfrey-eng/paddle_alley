import React from 'react';
import { Typography } from 'antd';
import { peso } from '../utils/pricing';
import { COLORS } from '../theme/theme';
import type { Wallet } from '../Wallet';

const placeholder = (w: Wallet) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">` +
    `<rect x="4" y="4" width="212" height="212" rx="14" fill="#fff" stroke="#c8ccd4" stroke-width="2" stroke-dasharray="8 6"/>` +
    `<text x="110" y="104" font-family="Arial" font-size="15" text-anchor="middle" fill="#667085">Add ${w.name} QR</text>` +
    `<text x="110" y="128" font-family="Arial" font-size="12" text-anchor="middle" fill="#98a2b3">public${w.qr}</text></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

/** Card header: colored tile + wallet name + short description. */
export const WalletLabel: React.FC<{ wallet: Wallet }> = ({ wallet }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <span
      aria-hidden
      style={{
        width: 44,
        height: 44,
        borderRadius: 11,
        background: wallet.color,
        color: wallet.ink,
        display: 'grid',
        placeItems: 'center',
        fontSize: 20,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {wallet.name[0]}
    </span>
    <span>
      <div style={{ fontWeight: 700 }}>{wallet.name}</div>
      <Typography.Text type="secondary" style={{ fontSize: 13, fontWeight: 400 }}>{wallet.tagline}</Typography.Text>
    </span>
  </div>
);

/** The owner's QR code for one wallet, plus who to pay and how much. */
const WalletQr: React.FC<{ wallet: Wallet; total: number }> = ({ wallet, total }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '8px 0' }}>
    <div
      role="img"
      aria-label={`${wallet.name} QR code`}
      style={{
        width: 220,
        height: 220,
        flexShrink: 0,
        borderRadius: 14,
        border: `1px solid ${COLORS.line}`,
        backgroundColor: '#fff',
        backgroundImage: `url("${wallet.qr}"), ${placeholder(wallet)}`, // real QR on top, placeholder underneath
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
    <div style={{ minWidth: 200 }}>
      <div style={{ fontWeight: 700, fontSize: 16 }}>Scan with {wallet.name}</div>
      <Typography.Text type="secondary">to pay {peso(total)}</Typography.Text>
      <div style={{ marginTop: 14, fontSize: 13, color: COLORS.muted }}>Account name</div>
      <div style={{ fontWeight: 600 }}>{wallet.accountName}</div>
      <div style={{ marginTop: 8, fontSize: 13, color: COLORS.muted }}>Number</div>
      <div style={{ fontWeight: 600 }}>{wallet.accountNumber}</div>
    </div>
  </div>
);

export default WalletQr;