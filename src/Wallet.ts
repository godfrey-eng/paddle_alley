export type WalletId = 'gcash' | 'paymaya' | 'atome' | 'maribank';

export interface Wallet {
  id: WalletId;
  name: string;
  tagline: string;
  color: string; 
  ink: string; 
  qr: string; 
  accountName: string;
  accountNumber: string;
}


export const WALLETS: Wallet[] = [
  { id: 'gcash', name: 'GCash', tagline: 'Pay with your GCash balance', color: '#007cff', ink: '#fff', qr: '/qr/gcash.png', accountName: 'Paddle Alley', accountNumber: '0917 000 0000' },
  { id: 'paymaya', name: 'PayMaya', tagline: 'Pay with Maya wallet or card', color: '#00a35c', ink: '#fff', qr: '/qr/paymaya.png', accountName: 'Paddle Alley', accountNumber: '0917 000 0000' },
  { id: 'maribank', name: 'MariBank', tagline: 'Pay from your MariBank account', color: '#f26a21', ink: '#fff', qr: '/qr/maribank.png', accountName: 'Paddle Alley', accountNumber: '0917 000 0000' },
];