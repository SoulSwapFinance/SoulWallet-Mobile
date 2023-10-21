// Credit: https://github.com/nova-wallet/nova-utils/blob/master/dapps/dapps_dev.json

import React from 'react';
import { PredefinedDApps } from 'types/browser';
// import i18n from 'utils/i18n/i18n';

export const soulSites: PredefinedDApps = {
  categories: () => [
    {
      name: 'DeFi', // i18n.browser.defi,
      id: 'defi',
      theme: 'primary',
    },
    {
      name: 'Earn', // i18n.browser.defi,
      id: 'earn',
      theme: 'cyan',
    },
    {
      name: 'Tools', // i18n.browser.utilities,
      id: 'utilities',
      theme: 'orange',
    },
    {
      name: 'Socials',
      id: 'news',
      theme: 'blue',
    },
  ],
  dapps: [
    {
      name: 'Exchange',
      icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/swap_blue.png',
      id: 'exchange.soulswap.finance',
      url: 'https://exchange.soulswap.finance/',
      categories: [],
      isSupportSubstrateAccount: false,
      isSupportEthereumAccount: true,
    },
    {
      name: 'Landing',
      icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/home_blue.png',
      id: 'soulswap.finance',
      url: 'https://soulswap.finance/',
      categories: [],
      isSupportSubstrateAccount: false,
      isSupportEthereumAccount: true,
    },
    {
      name: 'Farms',
      icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/grow_blue.png',
      id: 'exchange.soulswap.finance/farms',
      url: 'https://exchange.soulswap.finance/farms',
      categories: [],
      isSupportSubstrateAccount: false,
      isSupportEthereumAccount: true,
    },
  ],
};
