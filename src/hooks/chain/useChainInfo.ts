// Copyright 2023 @soul-wallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@soul-wallet/chain-list/types';
import { _getSubstrateGenesisHash } from '@soul-wallet/extension-base/src/services/chain-service/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
// import chainInfo from 'constants/chainInfo.json'
const useChainInfo = (slug?: string, genesisHash?: string | null): _ChainInfo | null => {
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  return useMemo(() => {
    if (!slug && !genesisHash) {
      return null;
    } else if (slug) {
      return chainInfoMap[slug] || null;
    } else {
      return Object.values(chainInfoMap).find(info => _getSubstrateGenesisHash(info) === genesisHash) || null;
    }
  }, [chainInfoMap, genesisHash, slug]);
};

export default useChainInfo;
