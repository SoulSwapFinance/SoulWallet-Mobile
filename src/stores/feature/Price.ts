// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit/dist';
import { PriceJson } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { PriceStore } from 'stores/types';

const initialState = {
  currency: 'usd',
  priceMap: {},
  price24hMap: {},
  ready: false,
} as PriceStore;

const priceSlice = createSlice({
  initialState,
  name: 'price',
  reducers: {
    updatePrice(state, action: PayloadAction<PriceJson>) {
      const data = action.payload;
      if (Object.values(data?.priceMap || {}).length === 0) {
        return;
      }

      return data;
    },
  },
});

export const { updatePrice } = priceSlice.actions;
export default priceSlice.reducer;
