import { _ChainInfo } from '@soul-wallet/chain-list/types';
import { _getSubstrateGenesisHash } from '@soul-wallet/extension-base/src/services/chain-service/utils';

export const findChainInfoByGenesisHash = (
  chainMap: Record<string, _ChainInfo>,
  genesisHash?: string,
): _ChainInfo | null => {
  if (!genesisHash) {
    return null;
  }

  for (const chainInfo of Object.values(chainMap)) {
    if (_getSubstrateGenesisHash(chainInfo)?.toLowerCase() === genesisHash.toLowerCase()) {
      return chainInfo;
    }
  }

  return null;
};

export const findChainInfoByChainId = (chainMap: Record<string, _ChainInfo>, chainId?: number): _ChainInfo | null => {
  if (!chainId) {
    return null;
  }

  for (const chainInfo of Object.values(chainMap)) {
    if (chainInfo.evmInfo?.evmChainId === chainId) {
      return chainInfo;
    }
  }

  return null;
};
