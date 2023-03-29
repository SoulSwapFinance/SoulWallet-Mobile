import Identicon from '@polkadot/reactnative-identicon';
import React from 'react';
import { Image, StyleProp, View } from 'react-native';
// @ts-ignore
import { toDataUrl } from './blockies.js';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import AvatarStyles from './style';
function getEthereumIdenticonStyle(size: number): StyleProp<any> {
  return {
    width: size,
    height: size,
    borderRadius: size,
  };
}

export interface SWLogoProps {
  theme?: 'polkadot' | 'ethereum';
  size: number;
  value: string | null;
  identPrefix?: number;
}

const Avatar: React.FC<SWLogoProps> = ({ theme, size, value, identPrefix }) => {
  const themes = useSubWalletTheme().swThemes;
  const _style = AvatarStyles(themes);

  if (theme === 'ethereum') {
    return (
      <View style={[_style.container, { width: size }]}>
        <Image source={{ uri: toDataUrl(value) }} style={getEthereumIdenticonStyle(size - 4)} />
      </View>
    );
  }
  return (
    <View style={_style.container}>
      <Identicon prefix={identPrefix} value={value} size={size - 4} theme="polkadot" />
    </View>
  );
};

export default Avatar;