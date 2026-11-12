import React from 'react';
import { Button, Collapse, Typography } from 'antd';
import { ArrowRightOutlined, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import MissingInfo from './MissingInfo';
import WalletQr from './WalletQr';
import { WALLETS } from '../Wallet'; 
import { peso, priceOf } from '../utils/pricing';
import { missingInfo, useAdStore } from '../store/useAdStore';
import { COLORS } from '../theme/theme';
import { Eyebrow, Heading, Muted, Panel } from '../ui';

const PaymentStep: React.FC = () => {
  const state = useAdStore();
  const { date, hours, wallet, update, confirmBooking } = state;
  const total = priceOf(hours);
  const chosen = WALLETS.find((w) => w.id === wallet);
  const locked = missingInfo(state).length > 0 || !chosen;

  const items = WALLETS.map((w) => ({
    key: w.id,
    label: w.name,
    children: <WalletQr wallet={w} total={total} />,
    style: {
      marginBottom: 12,
      background: '#fff',
      border: `1px solid ${wallet === w.id ? COLORS.navy : COLORS.line}`,
      borderRadius: 14,
      overflow: 'hidden',
    },
  }));

  return (
    <Panel>
      <Eyebrow>Simulated checkout</Eyebrow>
      <Heading>Complete your payment.</Heading>
      <Muted>Prototype only—no real payment will be processed.</Muted>
      <MissingInfo />

      <div style={{ background: COLORS.navy, 
        color: '#fff', 
        borderRadius: 18, 
        padding: 28 }}>
        <div style={{ fontSize: 13, color: COLORS.onNavy }}>Amount due</div>
        <div style={{ fontSize: 'clamp(34px, 6vw, 46px)', 
          fontWeight: 700, 
          letterSpacing: '-0.03em', 
          margin: '8px 0' }}>
          {peso(total)}
        </div>
        <div style={{ fontSize: 13, color: COLORS.onNavy }}>Checkout ID: PA-DEMO-{date ? dayjs(date).format('YYMMDD') : '------'}</div>
      </div>

      <div style={{ margin: '24px 0 12px' }}>
        <div style={{ fontWeight: 700 }}>Choose an e-wallet</div>
        <Typography.Text type="secondary">Tap the arrow on a card to see its QR code.</Typography.Text>
      </div>

      <Collapse
        accordion
        bordered={false}
        style={{ background: 'transparent' }}
        activeKey={wallet ?? []}
        expandIconPosition="end"
        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
        onChange={(key) => update({ wallet: (Array.isArray(key) ? key[0] : key) || undefined })}
        items={items}
      />

      <Button
        type="primary"
        size="large"
        block
        disabled={locked}
        style={{ height: 56, marginTop: 4 }}
        onClick={() => chosen && confirmBooking(chosen.name)}
      >
        Simulate successful payment <ArrowRightOutlined />
      </Button>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button type="text" onClick={() => update({ step: 2 })}>Cancel and return to review</Button>
      </div>
    </Panel>
  );
};

export default PaymentStep;