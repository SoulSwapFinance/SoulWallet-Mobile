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
      name: 'SoulSwap',
      icon: 'https://soulswap.finance/favicon.png',
      id: 'exchange.soulswap.finance',
      url: 'https://exchange.soulswap.finance/',
      title: 'SoulSwap',
      subtitle: "Swap crosschain and earn rewards", 
      description: '', 
      categories: ['defi', 'soul'],
      chain: [
        "fantom",
        "avalanche_c",
        "ethereum"
    ],
    is_featured: true,
    preview_image: "https://exchange.soulswap.finance/images/splash.png",
    is_substrate: false,
    is_evm: true,
  },
  // {
  //     name: 'Landing',
  //     icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/home_blue.png',
  //     id: 'soulswap.finance',
  //     url: 'https://soulswap.finance/',
  //     categories: [],
  //     is_substrate: false,
  //     is_evm: true,
  //   },
  //   {
  //     name: 'Crosschain',
  //     icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/home_blue.png',
  //     id: 'cross.soulswap.finance',
  //     url: 'https://cross.soulswap.finance/',
  //     categories: [],
  //     is_substrate: false,
  //     is_evm: true,
  //   },
  //   {
  //     name: 'Aggregator',
  //     icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/home_blue.png',
  //     id: 'meta.soulswap.finance',
  //     url: 'https://meta.soulswap.finance/',
  //     categories: [],
  //     is_substrate: false,
  //     is_evm: true,
  //   },
  //   {
  //     name: 'Farms',
  //     icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/blue/grow_blue.png',
  //     id: 'exchange.soulswap.finance/farms',
  //     url: 'https://exchange.soulswap.finance/farms',
  //     categories: [],
  //     is_substrate: false,
  //     is_evm: true,
  //   },
  ],
};
