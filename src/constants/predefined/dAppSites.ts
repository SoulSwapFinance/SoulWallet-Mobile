// Credit: https://github.com/nova-wallet/nova-utils/blob/master/dapps/dapps_dev.json

import { PredefinedDApps } from 'types/browser';
import i18n from 'utils/i18n/i18n';

export const DAppIconMap: Record<string, string> = {
  'app.soulswap.finance': 'https://soulswap.finance/favicon.png', // √
  'links.soulswap.finance': 'https://soulswap.finance/favicon.png', // √
  'cross.soulswap.finance': 'https://soulswap.finance/favicon.png', // √
  'home.soulswap.finance': 'https://soulswap.finance/favicon.png', // √
  'x.com': 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/twitter-circle.png', // √
  'twitter.com': 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/twitter-circle.png', // √
  'starsarena.com': 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/stars-arena.png', // √
  'blockworks.co': 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/blockworks-logo.png', // √
  'cointelegraph.com': 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/cointelegraph-logo.png', // √
  'coindesk.com': 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/coindesk.png', // √
  'debank.com': 'https://debank.com/favicon.ico', // √
  'coingecko.com': 'https://www.coingecko.com/favicon.ico', // √
  'coinmarketcap.com': 'https://www.coinmarketcap.com/favicon.ico', // √
  'www.xdao.app': 'https://moonbeam.network/wp-content/uploads/2022/03/xDAO.png',
  'www.avault.network': 'https://www.avault.network/logo.png',
  'tfalpha.xyz': 'https://tfalpha.xyz/img/tfa-logo.png',
  'sandbox.game': 'https://sandbox.game/favicon.ico', // √
  'godsunchained.com': 'https://godsunchained.com/favicon.ico',
};

export const DAppTitleMap: Record<string, string> = {
  'app.soulswap.finance': 'SoulSwap DeFi', // √
  'app.uniswap.org': 'Uniswap DEX', // √
  'curve.fi': 'Curve Finance', // √
  'app.aave.com': 'Aave Protocol', // √
  'lido.fi': 'Liquid Staking for Digital Tokens', // √
  'defillama.com': 'DeFi Llama - DeFi Dashboard', // √
  'blur.io': 'Blur: NFT Marketplace for Pro Traders', // √
  'blockworks.co': 'Blockworks', // √
  'cointelegraph.com': 'CoinTelegraph', // √
  'coindesk.com': 'CoinDesk', // √
  'debank.com': 'DeBank', // √
  'polkadot.js.org': 'Polkadot/Substrate Portal', // √
  'app.solarbeam.io': 'Solarbeam', // √
  'tofunft.com': 'tofuNFT.com', // √
  'kusama.lido.fi': 'Lido', // √
  'polkadot.lido.fi': 'Lido', // √
  'moonbeam.curve.fi': 'Curve.fi', // √
  'app.basilisk.cloud': 'Basilisk', // √
  'damnedpiratessociety.io': 'Damned Pirates Society', // √ 
  'pioneer.bit.country': 'Bit Country - Metaverses made of 1 and 0 bits', // √
  'dappradar.com': 'DappRadar - The World’s Dapp Store', // √
  'chainlist.org': 'Chainlist', // √
  'www.portalbridge.com': 'Wormhole Bridge', // √
  'dapp.robonomics.network': 'Dapp Robonomics network', // √
  'app.bounce.finance': 'Bounce', // √
  'www.xdao.app': 'XDAO – MultiChain DAO Ecosystem', // √
  'sub.id': 'Sub ID: Substrate Addresses, Balances, Crowdloans and NFTs', // √
  'singular.app': 'Singular: Kusama-native NFTs #RMRK #NFT', // √
  'dotmarketcap.com': 'DotMarketCap', // √
  'kodadot.xyz': 'KodaDot - Kusama NFT Market Explorer', // √

  'bifrost.app': 'Bifrost',
  'portal.astar.network': 'Astar Portal - Astar & Shiden Network',
  'app.subsocial.network': 'Subsocial - Decentralized social network on Polkadot & IPFS',
  'app.parallel.fi': 'Parallel Finance',
  'polkadot.polkassembly.io': 'Polkassembly',
  'ksmcrowdloan.bit.country': 'Crowdloan - Bit.Country Pioneer Network',
  'crowdloan.parallel.fi': 'Parallel Finance',
  'apps.moonbeam.network': 'Moonbeam Network Apps',
  'app.solarflare.io': 'Solarflare',
  'app.beamswap.io': 'Beamswap',
  'app.stellaswap.com': 'StellaSwap - Leading Moonbeam DEX & DeFi Gateway',
  'app.impossible.finance': 'Impossible Finance',
  'singular-rmrk2-dev.vercel.app': 'Singular: Kusama-native NFTs #RMRK #NFT',
  'app.arthswap.org': 'ArthSwap',
  'cbridge.celer.network': 'cBridge',
  'moonwell.fi': 'Moonwell',
  'apps.litentry.com': 'Litmus Network',
  'apps.darwinia.network': 'Darwinia',
  'polkawatch.app': 'Polkawatch',
  'staking.polkadot.network': 'Polkadot Staking Dashboard',
  'marketplace.moonsama.com': 'Moonsama',
  'game.evrloot.com': 'Join the Adventure -- evrloot',
  'www.dtmb.xyz': 'DOWNTOWN MOONBEAM',
  'portal.evolution.land': 'Evolution Land',
  'www.dotinsights.xyz': 'dotinsights | Polkadot & Kusama Ecosystem Map',
  'dotinsights.subwallet.app': 'dotinsights | Polkadot & Kusama Ecosystem Map',
  'app.phala.network': 'Phala App',
  'dex.zenlink.pro': 'Zenlink',
  'www.avault.network': 'Avault', // √
  'panoramaswap.app': 'Panorama Swap',
  'app.taigaprotocol.io': 'TAIGA',
  'event.tfalpha.xyz': 'Raffle & Claim Rewards',
  'tfalpha.xyz': 'Utopia & TF Alpha',
  'moons.money': 'Moon Web3 identity',
  'www.subsquare.io': 'SubSquare - Empower the governance of substrate.',
  'mint.azeropunks.com': 'AzeroPunks',
  'app.polkasafe.xyz': 'Polkasafe',
  'www.bananaswap.app': 'Bananaswap',
  'bluez.app': 'Bluez',
  'enterthemandala.app': 'Mandala',
  'www.mangata.finance': 'Mangata DEX',
  'app.dam.finance': 'DAM',
  'apps.acala.network': 'Acala Platform',
  'app.equilibrium.io': 'Equilibrium',
  'www.gear-tech.io': 'Gear Technologies | Crypto. Smarter.',
  'apps.karura.network': 'Karura Platform',
  'app.sirius.finance': 'Sirius Finance',
  'polkaverse.com': "PolkaVerse – Polkadot's Premier Social Network",
  'polkaswap.io': 'Swap - Polkaswap',
  'notifi.network': 'Notifi',
  'pods.spacers.app': 'Spacers NFT Pods Sale',
  'list.yieldbay.io': 'YieldBay',
  'app.fidi.tech': 'FiDi',
  'www.braindex.io': 'Braindex | Smart Dex Aggregator',
  'verse.bitcoin.com': 'Verse DEX',
};

export const predefinedBanners: PredefinedDApps = {
  categories: () => [
    {
      name: i18n.browser.defi,
      id: 'defi',
      theme: 'cyan',
    }
  ],
  dapps: [
    {
      name: 'SoulSwap',
      icon: 'https://soulswap.finance/favicon.png',
      id: 'app.soulswap.finance',
      url: 'https://app.soulswap.finance/',
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
    {
      name: 'DeBank',
      title: "DeBank",
      description: "",
      url: "https://debank.com",
      subtitle: "",
      is_featured: true,
      preview_image: "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/banners/debank-banner-v2.png",
      chain: [
          "ethereum",
          "binance",
          "avalanche_c",
          "polygon",
          "arbitrum_one",
          "optimism",
          "fantom",
          "moonbeam",
          "moonriver",
          "base_mainnet"
      ],
      icon: 'https://debank.com/favicon.ico',
      id: 'debank.com',
      categories: ['utilities'],
      is_substrate: false,
      is_evm: true,
    }
  ]
}


export const predefinedDApps: PredefinedDApps = {
  categories: () => [
    {
      name: i18n.browser.defi,
      id: 'defi',
      theme: 'cyan',
    },
    {
      name: i18n.browser.nft,
      id: 'nft',
      theme: 'magenta',
    },
    {
      name: 'SOUL',
      id: 'soul',
      theme: 'purple',
    },
    {
      name: i18n.browser.utilities,
      id: 'utilities',
      theme: 'orange',
    },
    {
      name: 'GAMES',
      id: 'games',
      theme: 'yellow',
    },
    {
      name: 'NEWS', // i18n.browser.news,
      id: 'news',
      theme: 'blue',
    },
  ],
  dapps: [
    {
      name: 'SoulSwap',
      title: '',
      subtitle: '', 
      description: '', 
      is_featured: true, 
      preview_image: '',
      chain: [
        "fantom",
        "avalanche_c",
        "ethereum"
    ],
      icon: 'https://soulswap.finance/favicon.png',
      id: 'app.soulswap.finance',
      url: 'https://app.soulswap.finance/',
      categories: ['defi', 'soul'],
      is_substrate: false,
      is_evm: true,
    },
    {
      name: 'DeBank',
      title: "DeBank",
      description: "",
      url: "https://debank.com",
      subtitle: "",
      is_featured: true,
      preview_image: "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/banners/debank-banner-v2.png",
      chain: [
          "ethereum",
          "binance",
          "avalanche_c",
          "polygon",
          "arbitrum_one",
          "optimism",
          "fantom",
          "moonbeam",
          "moonriver",
          "base_mainnet"
      ],
      icon: 'https://debank.com/favicon.ico',
      id: 'debank.com',
      categories: ['utilities'],
      is_substrate: false,
      is_evm: true,
    },
    // {
    //   name: 'Uniswap Interface',
    //   icon: 'https://uniswap.org/favicon.ico',
    //   id: 'app.uniswap.org',
    //   url: 'https://app.uniswap.org/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Aave Protocol',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/aave.png',
    //   id: 'app.aave.com',
    //   url: 'https://app.aave.com/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Rarible',
    //   icon: 'https://rarible.com/favicon.ico',
    //   id: 'rarible.com',
    //   url: 'https://rarible.com/',
    //   categories: ['nft'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'ArtZero | NFT Marketplace',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/artzero.png',
    //   id: 'https://a0.artzero.io',
    //   url: 'https://a0.artzero.io',
    //   categories: ['nft'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Basilisk Snek Swap',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/basilisk.png',
    //   id: 'app.basilisk.cloud',
    //   url: 'https://app.basilisk.cloud/#/trade',
    //   categories: ['defi'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Bounce',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/bounce-finance.png',
    //   id: 'app.bounce.finance/market',
    //   url: 'https://app.bounce.finance/market',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Stellaswap',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/stellaswap.png',
    //   id: 'app.stellaswap.com',
    //   url: 'https://app.stellaswap.com/exchange/swap',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Acala Platform',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/acala.png',
    //   id: 'apps.acala.network',
    //   url: 'https://apps.acala.network/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Darwinia App',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/darwinia.png',
    //   id: 'apps.darwinia.network',
    //   url: 'https://apps.darwinia.network/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Moonbeam',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/moonbeam-network.png',
    //   id: 'apps.moonbeam.network/moonbeam',
    //   url: 'https://apps.moonbeam.network/moonbeam',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Moonriver',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/moonriver.png',
    //   id: 'apps.moonbeam.network/moonriver',
    //   url: 'https://apps.moonbeam.network/moonriver',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'SoulSwap Home',
    //   icon: 'https://soulswap.finance/favicon.png',
    //   id: 'home.soulswap.finance',
    //   url: 'https://soulswap.finance',
    //   categories: ['soul'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Soul Cross-Chain',
    //   icon: 'https://soulswap.finance/favicon.png',
    //   id: 'cross.soulswap.finance',
    //   url: 'https://cross.soulswap.finance',
    //   categories: ['soul', 'defi'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Soul Links',
    //   icon: 'https://soulswap.finance/favicon.png',
    //   id: 'links.soulswap.finance',
    //   url: 'https://links.soulswap.finance',
    //   categories: ['soul'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'X | formerly Twitter',
    //   icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/twitter-circle.png',
    //   id: 'x.com',
    //   url: 'https://x.com/SoulSwapFinance',
    //   categories: ['news'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Stars Arena',
    //   icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/stars-arena.png',
    //   id: 'starsarena.com',
    //   url: 'https://starsarena.com',
    //   categories: ['news', 'defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Blur | NFT Marketplace for Traders',
    //   icon: 'https://blur.io/favicons/180.png',
    //   id: 'blur.io',
    //   url: 'https://blur.io/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Chainlist',
    //   icon: 'https://chainlist.org/favicon.ico',
    //   id: 'chainlist.org',
    //   url: 'https://chainlist.org/',
    //   categories: ['utilities'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Curve Finance',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/curve.png',
    //   id: 'curve.fi',
    //   url: 'https://curve.fi/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Damned Pirates Society',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/the-damned-pirates-society.png',
    //   id: 'damnedpiratessociety.io',
    //   url: 'https://damnedpiratessociety.io/',
    //   categories: ['nft'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Robonomics',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/robonomics.png',
    //   id: 'dapp.robonomics.network',
    //   url: 'https://dapp.robonomics.network/#/staking/',
    //   categories: ['defi'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'DappRadar',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/dappradar.png',
    //   id: 'dappradar.com',
    //   url: 'https://dappradar.com/',
    //   categories: ['utilities'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Sandbox',
    //   icon: 'https://sandbox.game/favicon.ico',
    //   id: 'sandbox.game',
    //   url: 'https://sandbox.game/',
    //   categories: ['games'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Gods Unchained',
    //   icon: 'https://godsunchained.com/favicon.ico',
    //   id: 'godsunchained.com',
    //   url: 'https://godsunchained.com/',
    //   categories: ['games'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Dotmarketcap',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/dotmarketcap.png',
    //   id: 'dotmarketcap.com',
    //   url: 'https://dotmarketcap.com/',
    //   categories: ['utilities'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: "HydraDX | DOT Liquidity Monster",
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/hydradx.png',
    //   id: 'hydradx.io',
    //   url: 'https://hydradx.io',
    //   categories: ['defi'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'KodaDot',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/kodadot.png',
    //   id: 'kodadot.xyz',
    //   url: 'https://kodadot.xyz/',
    //   categories: ['nft'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'LidoFi | Liquid Staking',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/lido.png',
    //   id: 'lido.fi/#networks',
    //   url: 'https://lido.fi/#networks',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'DeFi Llama',
    //   icon: 'https://defillama.com/favicon.ico',
    //   id: 'defillama.com',
    //   url: 'https://defillama.com',
    //   categories: ['utilities'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Moonwell',
    //   icon: 'https://raw.githubusercontent.com/nova-wallet/nova-utils/master/icons/dapps/color/Moonwell.svg',
    //   id: 'moonwell.fi',
    //   url: 'https://moonwell.fi',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Bit.Country Pioneer Metaverse',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/bit.country-pioneer.png',
    //   id: 'pioneer.bit.country',
    //   url: 'https://pioneer.bit.country/',
    //   categories: ['nft'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Polkadot.js',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/polkadot-%7B.js%7D.png',
    //   id: 'polkadot.js.org',
    //   url: 'https://polkadot.js.org/apps/#',
    //   categories: ['utilities'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Polkaswap',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/polkaswap.png',
    //   id: 'polkaswap.io',
    //   url: 'https://polkaswap.io/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Astar DApp Hub',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/astar-network.png',
    //   id: 'portal.astar.network',
    //   url: 'https://portal.astar.network/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'Singular',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/singular.png',
    //   id: 'singular.app',
    //   url: 'https://singular.app/',
    //   categories: ['nft'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Polkadot Staking Dashboard',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/polkadot.png',
    //   id: 'staking.polkadot.network',
    //   url: 'https://staking.polkadot.network/dashboard#/overview',
    //   categories: ['defi'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Sub ID: Substrate Addresses, Balances, Crowdloans and NFTs',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/sub-id.png',
    //   id: 'sub.id',
    //   url: 'https://sub.id/',
    //   categories: ['defi'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'TofuNFT',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/tofunft.png',
    //   id: 'tofunft.com',
    //   url: 'https://tofunft.com/',
    //   categories: ['nft'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Avault',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/avault.png',
    //   id: 'www.avault.network',
    //   url: 'https://www.avault.network/vault',
    //   categories: ['evm'],
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'Portal Token Bridge',
    //   icon: 'https://www.portalbridge.com/favicon.ico',
    //   id: 'www.portalbridge.com',
    //   url: 'https://www.portalbridge.com/',
    //   categories: ['defi', 'utilities'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'XDAO',
    //   icon: 'https://dotinsights.subwallet.app/assets/images/projects/xdao.png',
    //   id: 'www.xdao.app',
    //   url: 'https://www.xdao.app/137',
    //   categories: ['defi'], // DAO
    //   is_substrate: false,
    //   is_evm: true,
    // },
    // {
    //   name: 'AZERO.ID – Domain Service on Aleph Zero',
    //   icon: 'https://azero.id/favicon.ico',
    //   id: 'www.azero.id',
    //   url: 'https://azero.id',
    //   categories: ['defi'],
    //   is_substrate: true,
    //   is_evm: false,
    // },
    // {
    //   name: 'Blockworks',
    //   icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/blockworks-logo.png',
    //   id: 'blockworks.co',
    //   url: 'https://blockworks.co',
    //   categories: ['news'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'CoinTelegraph',
    //   icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/cointelegraph-logo.png',
    //   id: 'cointelegraph.com',
    //   url: 'https://cointelegraph.com',
    //   categories: ['news'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'CoinDesk',
    //   icon: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/coindesk.png',
    //   id: 'coindesk.com',
    //   url: 'https://coindesk.com',
    //   categories: ['news'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'CoinGecko',
    //   icon: 'https://www.coingecko.com/favicon.ico',
    //   id: 'coingecko.com',
    //   url: 'https://www.coingecko.com/en/coins/soul-swap',
    //   categories: ['news'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
    // {
    //   name: 'CoinMarketCap',
    //   icon: 'https://www.coinmarketcap.com/favicon.ico',
    //   id: 'coinmarketcap.com',
    //   url: 'https://coinmarketcap.com/currencies/soulswap-finance/',
    //   categories: ['news'],
    //   is_substrate: false,
    //   is_evm: false,
    // },
  ],
};
