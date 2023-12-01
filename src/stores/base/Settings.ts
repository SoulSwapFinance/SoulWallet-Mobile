// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit/dist';
import { AuthUrlInfo } from '@subwallet/extension-base/background/handlers/State';
import { ThemeNames, UiSettings } from '@subwallet/extension-base/background/KoniTypes';
import { AppSettings, ReduxStatus } from 'stores/types';

// import settings from '@polkadot/ui-settings';
// import { SettingsStruct } from '@polkadot/ui-settings/types';

const initialState = {
  // UI settings
  isShowBalance: false,
  isShowZeroBalance: false,
  accountAllLogo: '',
  theme: ThemeNames.DARK,
  language: 'en',
  browserConfirmationType: 'extension',

  // Polkadot settings
  // ...settings.get(),

  // AuthUrls
  authUrls: {},

  // Media settings
  mediaAllowed: false,
  isDeepLinkConnect: false,
  isShowBuyToken: false,
  browserDApps: {
    dApps: undefined,
    dAppCategories: undefined,
  },
  reduxStatus: ReduxStatus.INIT,
} as AppSettings;

const settingsSlice = createSlice({
  initialState,
  name: 'settings',
  reducers: {
    updateUiSettings(state, action: PayloadAction<UiSettings>) {
      const payload = action.payload;

      return {
        ...state,
        // todo: will save language, theme, isShowZeroBalance in background
        language: payload.language,
        browserConfirmationType: payload.browserConfirmationType,
        isShowBalance: payload.isShowBalance,
        accountAllLogo: payload.accountAllLogo,
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateToggleBalance(state) {
      return {
        ...state,
        isShowBalance: !state.isShowBalance,
      };
    },
    updateAppSettings(state, action: PayloadAction<any>) {
      const payload = action.payload;

      return {
        ...state,
        ...payload,
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateAuthUrls(state, action: PayloadAction<Record<string, AuthUrlInfo>>) {
      const payload = action.payload;

      return {
        ...state,
        authUrls: payload,
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateMediaAllowance(state, action: PayloadAction<boolean>) {
      const payload = action.payload;

      return {
        ...state,
        mediaAllowed: payload,
        reduxStatus: ReduxStatus.READY,
      };
    },
    updateTheme(state, action: PayloadAction<ThemeNames>) {
      const theme = action.payload;

      return {
        ...state,
        theme,
      };
    },
    updateShowZeroBalanceState(state, action: PayloadAction<boolean>) {
      const isShowZeroBalance = action.payload;

      return {
        ...state,
        isShowZeroBalance,
      };
    },
    updateLanguage(state, action: PayloadAction<AppSettings['language']>) {
      return {
        ...state,
        language: action.payload,
      };
    },
    updateBrowserConfirmationType(state, action: PayloadAction<AppSettings['browserConfirmationType']>) {
      return {
        ...state,
        browserConfirmationType: action.payload,
      };
    },
    updateIsDeepLinkConnect(state, action: PayloadAction<AppSettings['isDeepLinkConnect']>) {
      return {
        ...state,
        isDeepLinkConnect: action.payload,
      };
    },
    updateIsShowByToken(state, action: PayloadAction<AppSettings['isShowBuyToken']>) {
      return {
        ...state,
        isShowBuyToken: action.payload,
      };
    },
    updateBrowserDApps(state, action: PayloadAction<AppSettings['browserDApps']>) {
      return {
        ...state,
        browserDApps: { ...action.payload },
      };
    },
  },
});

export const {
  updateAppSettings,
  updateAuthUrls,
  updateUiSettings,
  updateToggleBalance,
  updateIsDeepLinkConnect,
  updateIsShowByToken,
  updateBrowserDApps,
  updateLanguage,
} = settingsSlice.actions;
export default settingsSlice.reducer;
