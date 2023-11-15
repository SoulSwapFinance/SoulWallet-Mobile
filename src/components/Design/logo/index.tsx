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
  const avaxLogo = "https://raw.githubusercontent.com/SoulSwapFinance/SoulWallet-Chainlist/master/packages/chain-list-assets/public/assets/chains/avalanche.png"
  let srcLogo= "https://soulswap.finance/favicon.png"
  const soulLogo= "https://soulswap.finance/favicon.png"
  const btcLogo= "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/btc.png"
  const ethLogo= "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/eth.png"
  const usdcLogo= "https://raw.githubusercontent.com/SoulSwapFinance/assets/master/logos/usdc.png"
  // UI NOTE: GETS TOKEN LOGO
  if (token) {
    token == "avax" ?  srcLogo = avaxLogo 
    // manually gets the token logo
      : token == "soul" ? srcLogo = soulLogo 
      : token == "wavax" ? srcLogo = avaxLogo 
      : (token == "btx" | token == "axlwbtc" | token == "wbtc.e" | token == "btc.b") ? srcLogo = btcLogo 
      : (token == "axleth" | token == "lzeth" | token == "weth.e") ? srcLogo = ethLogo 
      : (token == "axlusdc" | token == "lzusdc" | token == "usdc.e") ? srcLogo = usdcLogo
        : srcLogo = assetLogoMap[token]
          || assetLogoMap[defaultLogoKey];
  
  // UI NOTE: GETS NETWORK LOGO
  } else if (network) {
    // note: use this to identify chain name
    // console.log(network)
    // console.log(chainLogoMap[network])
    // manually get the network logo
    network == 'avalanche' ? srcLogo = avaxLogo 
      : srcLogo = chainLogoMap[network] 
        || chainLogoMap[defaultLogoKey];
  }

  let srcSubLogo = "https://soulswap.finance/favicon.png"
  // network == 'custom-EVM-avalanchec-chain-43114' ? srcSubLogo = axaxLogo : srcSubLogo = chainLogoMap[network]
  
  if (subToken) {
    subToken == 'avalanche' ? srcSubLogo = avaxLogo :
    srcSubLogo = assetLogoMap[subToken] || assetLogoMap[defaultLogoKey];
  } else if (subNetwork) {
    subNetwork == 'avalanche' ? srcSubLogo = avaxLogo :
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
