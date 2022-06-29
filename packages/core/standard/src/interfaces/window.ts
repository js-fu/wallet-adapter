import { Wallet } from './wallet';

export interface SolanaWindow extends Window {
    solana: Solana;
}

interface Solana {
    wallets: SolanaWallets;
}

/**
 * TODO: add push / events for wallet registration / actions
 */
interface SolanaWallets {
    [name: string]: Wallet;
}
