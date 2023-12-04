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
  const ethLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/eth.png"
  const usdcLogo = "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/usdc.png"


const CUSTOM_LOGOS = [
  'fantom-erc20-wftm-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // fantom
  "avalanche-erc20-wavax-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "avax", "wavax", // avalache
  "btc", "wbtc", "axlwbtc", "wbtc.e", // bitcoin
  "axleth", "weth", "lzeth", "weth.e", // ethereum
  "axlusdc", "lzusdc", "usdc", "usdc.e", // usdc
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
  'fantom-erc20-wftm-0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83': ftmLogo,
  // avalanche //
  'avalanche-erc20-wavax-0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7': avaxLogo,
  'avax': avaxLogo,
  'wavax': avaxLogo,
  'avax': avaxLogo,
  'wavax': avaxLogo,
  // bitcoin // 
  "btc": btcLogo,
  "wbtc": btcLogo,
  "axlwbtc": btcLogo,
  "wbtc.e": btcLogo,
  // ethereum //
  "axleth": ethLogo,
  "weth": ethLogo,
  "lzeth": ethLogo,
  "weth.e": ethLogo,
  // usdc //
  "axlusdc": usdcLogo,
  "lzusdc": usdcLogo,
  "usdc": usdcLogo,
  "usdc.e": usdcLogo,
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
