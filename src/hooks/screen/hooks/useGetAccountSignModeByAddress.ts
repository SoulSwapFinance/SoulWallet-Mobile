// Copyright 2023 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import useGetAccountByAddress from 'hooks/screen/hooks/useGetAccountByAddress';
import { AccountSignMode } from 'types/signer';
import { getAccountSignMode } from 'utils/account';
import { useMemo } from 'react';

const useGetAccountSignModeByAddress = (address?: string): AccountSignMode => {
  const account = useGetAccountByAddress(address);

  return useMemo((): AccountSignMode => {
    return getAccountSignMode(account);
  }, [account]);
};

export default useGetAccountSignModeByAddress;
