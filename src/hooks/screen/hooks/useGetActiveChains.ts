import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';

export declare enum NETWORK_STATUS {
  CONNECTED = "connected",
  CONNECTING = "connecting",
  DISCONNECTED = "disconnected",
  PENDING = "pending"
}

export declare type NetWorkGroup = 'RELAY_CHAIN' | 'POLKADOT_PARACHAIN' | 'KUSAMA_PARACHAIN' | 'MAIN_NET' | 'TEST_NET' | 'UNKNOWN';

export declare enum ContractType {
  wasm = "wasm",
  evm = "evm"
}

export interface NetworkJson {
  key: string;
  chain: string;
  icon?: string;
  active: boolean;
  providers: Record<string, string>;
  currentProvider: string | null;
  currentProviderMode: 'http' | 'ws';
  customProviders?: Record<string, string>;
  nftProvider?: string;
  genesisHash: string;
  groups: NetWorkGroup[];
  ss58Format: number;
  paraId?: number;
  chainType?: 'substrate' | 'ethereum';
  crowdloanUrl?: string;
  isEthereum?: boolean;
  evmChainId?: number;
  isHybrid?: boolean;
  nativeToken?: string;
  decimals?: number;
  coinGeckoKey?: string;
  blockExplorer?: string;
  abiExplorer?: string;
  dependencies?: string[];
  getStakingOnChain?: boolean;
  supportBonding?: boolean;
  supportSmartContract?: ContractType[];
  apiStatus?: NETWORK_STATUS;
  requestId?: string;
}

export default function useGetActiveNetwork(): NetworkJson[] {
  const networkMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  return useMemo((): NetworkJson[] => {
    const result: NetworkJson[] = [];

    for (const network of Object.values(networkMap)) {
      // @ts-ignore
      if (network.active) {
        // @ts-ignore
        result.push(network);
      }
    }

    return result;
  }, [networkMap]);
}
