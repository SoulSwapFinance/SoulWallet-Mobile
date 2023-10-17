import { View } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'components/design-system-ui';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';

export function LoadingScreen() {
  const theme = useSoulWalletTheme().swThemes;
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <ActivityIndicator size={40} indicatorColor={theme.colorWhite} />
    </View>
  );
}
