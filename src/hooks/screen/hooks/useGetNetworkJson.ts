import { NetworkJson } from 'hooks/screen/hooks/useGetActiveChains';
import { useMemo } from 'react';
import { RootState } from 'stores/index';
import { useSelector } from 'react-redux';

export default function useGetNetworkJson(networkKey: string): NetworkJson {
  const networkMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  return useMemo((): NetworkJson => networkMap[networkKey] || {}, [networkKey, networkMap]);
}
