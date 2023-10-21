// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { getScanExplorer } from 'utils/index';

export default function useScanExplorer(networkKey: string) {
  // @ts-ignore
  const chainMap = useSelector((state: RootState) => state.chainStore.chainInfoMap);
  const chainInfo = chainMap[networkKey];

  let blockExplorer = chainInfo?.substrateInfo?.blockExplorer || chainInfo?.evmInfo?.blockExplorer;

  if (blockExplorer) {
    if (blockExplorer.endsWith('/')) {
      blockExplorer = blockExplorer.slice(0, -1);
    }
    return `${blockExplorer}/`;
  } else {
    return getScanExplorer(networkKey);
  }
}
