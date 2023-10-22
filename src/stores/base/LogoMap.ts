// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit/dist';
import { AllLogoMap } from '@soul-wallet/extension-base/src/background/KoniTypes';
import ChainLogoMap, { ProjectLogos } from 'components/Design/Logo/LogoMap';
// import { AssetLogoMap, ChainLogoMap } from '@soul-wallet/chain-list/types';

const initialState: AllLogoMap = {
  chainLogoMap: ChainLogoMap,
  // assetLogoMap: AssetLogoMap,
  assetLogoMap: ProjectLogos,
};

const settingsSlice = createSlice({
  initialState,
  name: 'logoMaps',
  reducers: {
    updateLogoMaps(state, action: PayloadAction<AllLogoMap>) {
      const payload = action.payload;

      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { updateLogoMaps } = settingsSlice.actions;
export default settingsSlice.reducer;
