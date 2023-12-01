// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import useGetAccountSignModeByAddress from 'hooks/screen/useGetAccountSignModeByAddress';
import { useMemo } from 'react';
import { AccountSignMode } from 'types/signer';
import i18n from 'utils/i18n/i18n';

const useGetAccountTitleByAddress = (address?: string): string => {
  const signMode = useGetAccountSignModeByAddress(address);

  return useMemo((): string => {
    switch (signMode) {
      case AccountSignMode.LEDGER:
        return 'Ledger Account';
      case AccountSignMode.ALL_ACCOUNT:
        return 'All Account';
      case AccountSignMode.PASSWORD:
        return 'Normal Account';
      case AccountSignMode.QR:
        return 'QR Signer Account';
      case AccountSignMode.READ_ONLY:
        return 'Watch-Only Account';
      case AccountSignMode.UNKNOWN:
      default:
        return 'Unknown account';
    }
  }, [signMode]);
};

export default useGetAccountTitleByAddress;
