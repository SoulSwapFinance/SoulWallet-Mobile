// @ts-nocheck
import React from 'react';
import { View } from 'react-native';
import LogoStyles from './style';
import Image from '../Image';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { RootState } from 'stores/index';
import { useSelector } from 'react-redux';
// import { ImageLogosMap } from 'assets/logo';

type IconShapeType = 'default' | 'circle' | 'squircle';

export interface SWLogoProps {
  defaultLogoKey?: string;
  isShowSoulLogo?: boolean;
  isShowSubIcon?: boolean;
  network?: string;
  shape?: IconShapeType;
  size: number;
  subLogoShape?: IconShapeType;
  subNetwork?: string;
  subToken?: string;
  token?: string;
  subIcon?: React.ReactNode;
}

const Logo: React.FC<SWLogoProps> = ({
  defaultLogoKey = 'circle',
  isShowSoulLogo,
  isShowSubIcon,
  network,
  shape = 'default',
  size,
  subLogoShape = 'circle',
  subNetwork,
  subIcon,
  subToken,
  token,
}) => {
  const theme = useSoulWalletTheme().swThemes;
  const { chainLogoMap, assetLogoMap } = useSelector((state: RootState) => state.logoMaps);
  const _style = LogoStyles(theme);
  const subLogoSize = size / 2.5;
  
  let srcLogo= "https://soulswap.finance/favicon.png"

  const ftmLogo = "https://raw.githubusercontent.com/SoulSwapFinance/SoulWallet-Chainlist/master/packages/chain-list-assets/public/assets/chains/fantom.png"
  const avaxLogo = "https://raw.githubusercontent.com/SoulSwapFinance/SoulWallet-Chainlist/master/packages/chain-list-assets/public/assets/chains/avalanche.png"
  const soulLogo = "https://soulswap.finance/favicon.png"
  const btcLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/btc.png"
  // const ethLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/eth.png"
  const ethLogo = "https://chain-list-assets.subwallet.app/assets/multi-chain-assets/weth-wrappedether.png"
  const usdcLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/usdc.png"
  const daiLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/dai.png"
  // const wftmLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/wftm.png"

const CUSTOM_LOGOS = [
  // fantom //
  'ftm', 'wftm',
  'fantom-erc20-wftm-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
  'custom-fantom-erc20-wftm-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',

  // avalanche //
  "avax", "wavax",
  "avalanche-erc20-wavax-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
  "custom-avalanche_c-erc20-wavax-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
  
  // bitcoin //
  "btc", "wbtc", "axlwbtc", "wbtc.e",
  'custom-fantom-erc20-wbtc-0xf1648c50d2863f780c57849d812b4b7686031a3d', // lzBTC
  'custom-fantom-erc20-axlwbtc-0x448d59b4302ab5d2dadf9611bed9457491926c8e', // axlBTC
  'custom-avalanche_c-erc20-wbtc.e-0x50b7545627a5162f82a992c33b87adc75187b218', // WBTC.e
  
  // ethereum
  "axleth", "weth", "lzeth", "weth.e", 
  'custom-fantom-erc20-axleth-0xfe7eda5f2c56160d406869a8aa4b2f365d544c7b', // axlETH
  'avalanche_c-erc20-weth-0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab', // WETH.e

   // usdc //
   "axlusdc", "lzusdc", "usdc", "usdc.e",
  'custom-fantom-erc20-axlusdc-0x1b6382dbdea11d97f24495c9a90b7c88469134a4', // axlUSDC
  'custom-avalanche_c-erc20-usdc-0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e', // USDC
  'custom-avalanche_c-erc20-usdc.e-0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664', // USDC.e

  // dai //
  'custom-avalanche_c-erc20-dai.e-0xd586e7f844cea2f87f50152665bcbc2c279d8d70', // DAI.e
  
  // misc overrides //
  "shidenevm-erc20-fegs-0xa9b79aab9d60e8e6d08d2cbad56ff0de58ff8d41",
  "neatcoin-native-neat",
  "statemine-local-bailego",
  "moonbase-erc20-mfr-0xc2bfd8e028b342f0537adc2bf310821c807c1312",
  "moonbase-erc20-mfg-0x3ef88816ebe8f50019e931bdffb0e428a44a29b1",
  "astarevm-erc20-kzy-0x3d4dcfd2b483549527f7611ccfecb40b47d0c17b",
  "astarevm-erc20-kos-0xbcf7aa4fc081f5670d9b8a1bdd1cfd98dcaee6e6",
  "astarevm-erc20-ppc-0x34f79636a55d9961e47b7784ef460b021b499406",

  'shidenevm-erc20-kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358',
  'shidenevm-erc20-sms-0xec0c789c6dc019b1c19f055edf938b369d235d2c',
  'shidenevm-erc20-stnd-0x722377a047e89ca735f09eb7cccab780943c4cb4',
  'shidenevm-erc20-srise-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9',
]
const CUSTOM_LOGO_MAP = {
  // fantom //
  'ftm': ftmLogo,
  'wftm': ftmLogo,
  'fantom-erc20-wftm-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83': ftmLogo,
  "custom-fantom-erc20-wftm-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83": ftmLogo,
  // avalanche //
  'avax': avaxLogo,
  'wavax': avaxLogo,
  'avax': avaxLogo,
  'wavax': avaxLogo,
  'avalanche-erc20-wavax-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': avaxLogo,
  'custom-avalanche_c-erc20-wavax-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': avaxLogo,
  // bitcoin // 
  "btc": btcLogo,
  "wbtc": btcLogo,
  "axlwbtc": btcLogo,
  "wbtc.e": btcLogo,
  "custom-fantom-erc20-wbtc-0xf1648c50d2863f780c57849d812b4b7686031a3d": btcLogo, // lzBTC
  "custom-fantom-erc20-axlwbtc-0x448d59b4302ab5d2dadf9611bed9457491926c8e": btcLogo, // axlWBTC
  "custom-avalanche_c-erc20-wbtc.e-0x50b7545627a5162f82a992c33b87adc75187b218": btcLogo, // WBTC.e
  // ethereum //
  "axleth": ethLogo,
  "weth": ethLogo,
  "lzeth": ethLogo,
  "weth.e": ethLogo,
  "custom-fantom-erc20-axleth-0xfe7eda5f2c56160d406869a8aa4b2f365d544c7b": ethLogo, // axlETH
  "avalanche_c-erc20-weth-0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab": ethLogo, // WETH.e
  // usdc //
  "axlusdc": usdcLogo,
  "lzusdc": usdcLogo,
  "usdc": usdcLogo,
  "usdc.e": usdcLogo,
  'custom-fantom-erc20-axlusdc-0x1b6382dbdea11d97f24495c9a90b7c88469134a4': usdcLogo, // axlUSDC
  'custom-avalanche_c-erc20-usdc-0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e': usdcLogo, // USDC
  'custom-avalanche_c-erc20-usdc.e-0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664': usdcLogo, // USDC.e
  // dai //
  'custom-avalanche_c-erc20-dai.e-0xd586e7f844cea2f87f50152665bcbc2c279d8d70': daiLogo,
  // misc overrides //
  'shidenevm-erc20-fegs-0xa9b79aab9d60e8e6d08d2cbad56ff0de58ff8d41': soulLogo,
  'neatcoin-native-neat': soulLogo,
  'statemine-local-bailego': soulLogo,
  'moonbase-erc20-mfr-0xc2bfd8e028b342f0537adc2bf310821c807c1312': soulLogo,
  'moonbase-erc20-mfg-0x3ef88816ebe8f50019e931bdffb0e428a44a29b1': soulLogo,
  'astarevm-erc20-kzy-0x3d4dcfd2b483549527f7611ccfecb40b47d0c17b': soulLogo,
  'astarevm-erc20-kos-0xbcf7aa4fc081f5670d9b8a1bdd1cfd98dcaee6e6': soulLogo,
  'astarevm-erc20-ppc-0x34f79636a55d9961e47b7784ef460b021b499406': soulLogo,
  'shidenevm-erc20-kac-0xb12c13e66ade1f72f71834f2fc5082db8c091358': soulLogo,
  'shidenevm-erc20-sms-0xec0c789c6dc019b1c19f055edf938b369d235d2c': soulLogo,
  'shidenevm-erc20-stnd-0x722377a047e89ca735f09eb7cccab780943c4cb4': soulLogo,
  'shidenevm-erc20-srise-0x16bf7ecaf868348703ff5b5c0c3b84be7bf483f9': soulLogo,
}

  // UI NOTE: GETS TOKEN LOGO
  if (token) {
    console.log(token, isCustomLogo)
    // console.log(token)
    const isCustomLogo = CUSTOM_LOGOS.includes(token)
    srcLogo = isCustomLogo ? CUSTOM_LOGO_MAP[token] : assetLogoMap[token] || soulLogo
  
  // UI NOTE: GETS NETWORK LOGO
    // srcLogo = assetLogoMap[token] || assetLogoMap[defaultLogoKey];
  } else if (network) {
    // note: use this to identify chain name
    // console.log(network)
    // console.log(chainLogoMap[network])
    // manually get the network logo
    (network == 'avalanche_c' | network == 'custom-EVM-avalanchec-chain-43114')? srcLogo = avaxLogo 
      : srcLogo = chainLogoMap[network] 
        || chainLogoMap[defaultLogoKey];
  }

  let srcSubLogo = "https://soulswap.finance/favicon.png"
  if (subToken) {
    (subToken == 'avalanche' | subToken == 'custom-EVM-avalanchec-chain-43114') ? srcSubLogo = avaxLogo :
    srcSubLogo = assetLogoMap[subToken] || assetLogoMap[defaultLogoKey];
  } else if (subNetwork) {
    (subNetwork == 'avalanche' | subNetwork == 'custom-EVM-avalanchec-chain-43114') ? srcSubLogo = avaxLogo :
    // subNetwork == 'base' ? srcSubLogo = baseLogo :
    srcSubLogo = chainLogoMap[subNetwork] || chainLogoMap[defaultLogoKey]
  }
  return (
    <View>
      <Image
        src={srcLogo ? { uri: srcLogo } : "https://soulswap.finance/favicon.png"}
        style={{ width: size, height: size, backgroundColor: 'transparent' }}
        squircleSize={size}
        shape={shape}
      />
      {isShowSubIcon && !isShowSoulLogo && <View style={_style.subLogoContainer}>{subIcon}</View>}
      {isShowSoulLogo && (
        <Image
          src={srcSubLogo ? { uri: srcSubLogo } : "https://soulswap.finance/favicon.png"}
          style={{ width: subLogoSize, height: subLogoSize }}
          squircleSize={subLogoSize}
          shape={subLogoShape}
          containerStyle={_style.subLogoContainer}
        />
      )}
    </View>
  );
};

export default Logo;
