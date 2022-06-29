import { EventEmitter, ValidEventTypes } from "./eventemitter";

/**
 * TODO: docs
 */
export enum SolanaNetwork {
    Mainnet = "mainnet",
    Devnet = "devnet",
    Testnet = "testnet",
}

/**
 * TODO: docs
 */
export interface Wallet<EventTypes extends ValidEventTypes = string | symbol, Context extends any = any> extends EventEmitter<EventTypes, Context> {
    /**
     * TODO: docs
     */
    version: string;

    /**
     * TODO: docs
     */
    name: string;

    /**
     * TODO: docs
     */
    icon: string;

    /**
     * TODO: docs
     *
     * @param publicKey Optional public key corresponding with the secret key of the wallet to sign using. Default to whatever the wallet wants.
     *
     * @return TODO: docs
     */
    connect(publicKey?: Uint8Array[]): Promise<ConnectedWallet[]>;

    /**
     * TODO: figure out connect / getAccounts / requestAccounts
     *
     * @return TODO: docs
     */
    getPublicKeys(): Promise<Uint8Array[]>;

    /**
     * TODO: docs
     *
     * @return TODO: docs
     */
    getCiphers(): Promise<string[]>;
}

/**
 * TODO: docs
 */
export interface ConnectedWallet {
    /**
     * Public key corresponding with the secret key of the wallet to sign using.
     */
    publicKey: Uint8Array;

    /**
     * Sign one or more serialized transactions. The transaction(s) may already be partially signed.
     *
     * @param transaction One or more serialized transactions.
     *
     * @return One or more signed, serialized transactions.
     */
    signTransaction(transaction: Uint8Array[]): Promise<Uint8Array[]>;

    /**
     * Sign and send one or more serialized transactions. The transaction(s) may already be partially signed.
     *
     * @param transaction One or more serialized transactions.
     * @param network     Optional Solana cluster name to send the transaction using. Default to mainnet.
     *
     * @return One or more "primary" transaction signatures in Base58, as returned by an RPC node.
     */
    signAndSendTransaction(transaction: Uint8Array[], network?: SolanaNetwork): Promise<string[]>;

    /**
     * Sign some data. Before signing, the data will be prefixed with TODO: some TBD bytes.
     *
     * @param data One or more sets of bytes to sign.
     *
     * @return One or more signatures in Base58.
     */
    sign(data: Uint8Array[]): Promise<string[]>;

    /**
     * Decrypt some data.
     *
     * @param publicKey Public key to derive a shared secret to decrypt the data using.
     * @param data      One or more ciphertexts to decrypt.
     * @param nonce     One or more nonces to use.
     * @param options   TODO: docs
     *
     * @return TODO: docs
     */
    decrypt(publicKey: Uint8Array, data: Uint8Array[], nonce: Uint8Array[], options?: { cipher?: string }): Promise<{ data: Uint8Array[]; cipher: string; }>;

    /**
     * Encrypt some data.
     *
     * @param publicKey Public key to derive a shared secret to encrypt the data using.
     * @param data      One or more cleartexts to encrypt.
     * @param options   TODO: docs
     *
     * @return TODO: docs
     */
    encrypt(publicKey: Uint8Array, data: Uint8Array[], options?: { cipher?: string }): Promise<{ data: Uint8Array[]; nonce: Uint8Array[]; cipher: string; }>;
}
