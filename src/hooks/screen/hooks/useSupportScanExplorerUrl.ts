import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { isSupportScanExplorer } from 'utils/index';
import { isAccountAll } from '@soul-wallet/extension-base/src/utils';

export default function useSupportScanExplorer(networkKey: string) {
  const networkMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);

  if (isAccountAll(networkKey.toUpperCase())) {
    return false;
  }

  if (networkMap[networkKey].blockExplorer) {
    return true;
  } else {
    return isSupportScanExplorer(networkKey);
  }
}
