import type { EncryptedJson } from '@polkadot/util-crypto/types';
import type { HexString } from '@polkadot/util/types';

export type KeyringPair$Meta = Record<string, unknown>;

export interface KeyringJson {
    address: string;
    meta: KeyringJson$Meta;
}

export interface KeyringPairs$Json extends EncryptedJson {
    accounts: KeyringJson[];
}

export interface KeyringPair$Json extends EncryptedJson {
    /** The ss58 encoded address or the hex-encoded version (the latter is for ETH-compat chains) */
    address: string | HexString;
    /** The underlying metadata associated with the keypair */
    meta: KeyringPair$Meta;
}

export interface ContractMeta {
    abi: string;
    genesisHash?: string | null;
}

export interface KeyringJson$Meta {
    contract?: ContractMeta;
    genesisHash?: string | null;
    hardwareType?: 'ledger';
    isHardware?: boolean;
    isInjected?: boolean;
    isRecent?: boolean;
    isTesting?: boolean;
    name?: string;
    whenCreated?: number;
    whenEdited?: number;
    whenUsed?: number;
    [index: string]: unknown;
}

export interface KeyringAddress {
    readonly address: string;
    readonly meta: KeyringJson$Meta;
    readonly publicKey: Uint8Array;
}