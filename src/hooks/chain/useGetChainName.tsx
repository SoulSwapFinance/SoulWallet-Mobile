// NOTES //
// export declare enum FundStatus {
//     IN_AUCTION = "in_auction",
//     WON = "won",
//     WITHDRAW = "withdraw",
//     FAILED = "failed"
// }
// export declare enum SubstrateChainType {
//     RELAYCHAIN = "RELAYCHAIN",
//     PARACHAIN = "PARACHAIN"
// }
// export interface CrowdloanFund {
//     relayChain: 'polkadot' | 'kusama';
//     fundId: string;
//     paraId: number;
//     status: FundStatus;
//     startTime: Date;
//     endTime: Date;
//     auctionIndex: number;
//     firstPeriod: number;
//     lastPeriod: number;
// }
// export interface SubstrateInfo {
//     relaySlug: string | null;
//     paraId: number | null;
//     genesisHash: string;
//     addressPrefix: number;
//     crowdloanParaId: number | null;
//     crowdloanUrl: string | null;
//     crowdloanFunds: CrowdloanFund[] | null;
//     chainType: SubstrateChainType;
//     blockExplorer: string | null;
//     existentialDeposit: string;
//     decimals: number;
//     symbol: string;
//     hasNativeNft: boolean;
//     supportStaking: boolean;
//     supportSmartContract: AssetType[] | null;
// }
// export declare enum AssetType {
//     NATIVE = "NATIVE",
//     LOCAL = "LOCAL",
//     ERC20 = "ERC20",
//     ERC721 = "ERC721",
//     PSP22 = "PSP22",
//     PSP34 = "PSP34",
//     UNKNOWN = "UNKNOWN"
// }
// export interface EvmInfo {
//     evmChainId: number;
//     blockExplorer: string | null;
//     existentialDeposit: string;
//     decimals: number;
//     symbol: string;
//     supportSmartContract: AssetType[] | null;
//     abiExplorer: string | null;
// }
// export declare enum ChainStatus {
//     ACTIVE = "ACTIVE",
//     INACTIVE = "INACTIVE",
//     STOPPED = "STOPPED"
// }
// export interface ChainInfo {
//     slug: string;
//     name: string;
//     chainStatus: ChainStatus;
//     isTestnet: boolean;
//     providers: Record<string, string>;
//     substrateInfo: SubstrateInfo | null;
//     evmInfo: EvmInfo | null;
//     icon: string;
// }

import { _ChainInfo } from '@subwallet/chain-list/types'

export declare function _getChainName(chainInfo: _ChainInfo): string;
