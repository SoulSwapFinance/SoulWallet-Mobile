import { isEthereumAddress } from '@polkadot/util-crypto';
import { NetworkJson } from 'hooks/screen/hooks/useGetActiveChains';
import { AccountJson } from '@soul-wallet/extension-base/src/background/types';
import useGetAccountByAddress from 'hooks/screen/hooks/useGetAccountByAddress';
import { ScannerContext } from 'providers/ScannerContext';
import { useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { getNetworkJsonByInfo } from 'utils/network';

interface Result {
  account: AccountJson | null;
  network: NetworkJson | null;
}

const useGetAccountAndNetworkScanned = (): Result => {
  const {
    state: { senderAddress, isEthereumStructure, genesisHash, evmChainId },
  } = useContext(ScannerContext);

  const networkMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  const account = useGetAccountByAddress(senderAddress || '');

  const network = useMemo(() => {
    const info: undefined | number | string = isEthereumStructure ? evmChainId : genesisHash;
    return getNetworkJsonByInfo(networkMap, isEthereumAddress(account?.address || ''), isEthereumStructure, info);
  }, [account?.address, evmChainId, genesisHash, isEthereumStructure, networkMap]);

  return useMemo(
    (): Result => ({
      account,
      network,
    }),
    [account, network],
  );
};

export default useGetAccountAndNetworkScanned;
