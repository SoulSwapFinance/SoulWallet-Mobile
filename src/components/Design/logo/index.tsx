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
  isShowSubLogo?: boolean;
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
  isShowSubLogo,
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
  let soulLogo= "https://soulswap.finance/favicon.png"
  // UI NOTE: GETS TOKEN LOGO
  if (token) {
    token == "avax" ?  srcLogo = avaxLogo 
    // manually gets the token logo
      : token == "soul" ? srcLogo = soulLogo 
        : srcLogo = assetLogoMap[token]
          || assetLogoMap[defaultLogoKey];
  
  // UI NOTE: GETS NETWORK LOGO
  } else if (network) {
    // note: use this to identify chain name
    // console.log(network)
    // console.log(chainLogoMap[network])
    // manually get the network logo
    network == 'custom-EVM-avalanchec-chain-43114' ? srcLogo = avaxLogo 
      : srcLogo = chainLogoMap[network] 
        || chainLogoMap[defaultLogoKey];
  }

  let srcSubLogo = "https://soulswap.finance/favicon.png"
  if (subToken) {
    srcSubLogo = assetLogoMap[subToken] || assetLogoMap[defaultLogoKey];
  } else if (subNetwork) {
    srcSubLogo = chainLogoMap[subNetwork] || chainLogoMap[defaultLogoKey];
  }

  return (
    <View>
      <Image
        src={srcLogo ? { uri: srcLogo } : "https://soulswap.finance/favicon.png"}
        style={{ width: size, height: size, backgroundColor: 'transparent' }}
        squircleSize={size}
        shape={shape}
      />
      {isShowSubIcon && !isShowSubLogo && <View style={_style.subLogoContainer}>{subIcon}</View>}
      {isShowSubLogo && (
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
