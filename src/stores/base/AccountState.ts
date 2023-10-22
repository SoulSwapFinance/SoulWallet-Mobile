// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddressBookInfo, KeyringState } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { AccountJson, AccountsContext } from '@soul-wallet/extension-base/src/background/types';
import { AccountState, ReduxStatus } from 'stores/types';
import { isAccountAll } from '@soul-wallet/extension-base/src/utils';

const initialState: AccountState = {
  // CurrentAccount
  currentAccount: null,
  isAllAccount: false,

  // KeyringState
  isReady: false,
  hasMasterPassword: false,
  isLocked: true,

  // AccountsContext
  accounts: [],
  contacts: [],
  hierarchy: [],
  recent: [],
  master: undefined,

  reduxStatus: ReduxStatus.INIT,
};

const accountStateSlice = createSlice({
  initialState,
  name: 'accountState',
  reducers: {
    updateKeyringState(state, action: PayloadAction<KeyringState>) {
      const payload = action.payload;

      return {
        ...state,
        ...payload,
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateAccountsContext(state, action: PayloadAction<AccountsContext>) {
      const payload = action.payload;

      return {
        ...state,
        ...payload,
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateCurrentAccount(state, action: PayloadAction<AccountJson>) {
      const payload = action.payload;

      return {
        ...state,
        currentAccount: payload,
        isAllAccount: isAccountAll(payload?.address),
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateAddressBook(state, action: PayloadAction<AddressBookInfo>) {
      const { addresses } = action.payload;

      const contacts = addresses.filter(value => !value.isRecent);
      const recent = addresses.filter(value => value.isRecent);

      return {
        ...state,
        contacts: contacts,
        recent: recent,
        reduxStatus: ReduxStatus.READY,
      };
    },
  },
});

export const { updateAccountsContext, updateCurrentAccount, updateKeyringState } = accountStateSlice.actions;
export default accountStateSlice.reducer;
