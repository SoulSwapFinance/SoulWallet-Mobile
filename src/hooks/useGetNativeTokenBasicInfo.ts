import { BasicTokenInfo } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { _getChainNativeTokenBasicInfo } from '@soul-wallet/extension-base/src/services/chain-service/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';

export default function useGetNativeTokenBasicInfo(chainSlug: string): BasicTokenInfo {
  const chainInfoMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  return useMemo(() => {
    const chainInfo = chainInfoMap[chainSlug];

    return _getChainNativeTokenBasicInfo(chainInfo);
  }, [chainInfoMap, chainSlug]);
}
