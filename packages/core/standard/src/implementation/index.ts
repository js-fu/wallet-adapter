import { SolanaWindow } from '../interfaces';

declare const window: SolanaWindow;

if (!window.solana) window.solana = { wallets: {}};
else if (!window.solana.wallets) window.solana.wallets = {};
