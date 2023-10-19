import { _AssetRef, _ChainAsset, _ChainInfo, _MultiChainAsset } from './Types';
export declare const ChainInfoMap: Record<string, _ChainInfo>;
export declare const ChainAssetMap: Record<string, _ChainAsset>;
export declare const AssetRefMap: Record<string, _AssetRef>;
export declare const MultiChainAssetMap: Record<string, _MultiChainAsset>;
export declare const AssetLogoMap: Record<string, string>;
export declare const ChainLogoMap: Record<string, string>;
export declare enum COMMON_CHAIN_SLUGS {
    POLKADOT = "polkadot",
    KUSAMA = "kusama",
    MOONBEAM = "moonbeam",
    MOONRIVER = "moonriver",
    ETHEREUM = "ethereum",
    ACALA = "acala",
    KARURA = "karura",
    ALEPH_ZERO = "aleph",
    ASTAR = "astar",
    WESTEND = "westend",
    BINANCE = "binance",
    ASTAR_EVM = "astarEvm"
}
export declare const _DEFAULT_CHAINS: string[];
