import React from 'react';
import { ActivityIndicator } from 'components/Design';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { View } from 'react-native';

export const ActivityLoading = () => {
  const theme = useSoulWalletTheme().swThemes;
  return (
    <View style={{ marginVertical: 20 }}>
      <ActivityIndicator size={20} indicatorColor={theme.colorWhite} />
    </View>
  );
};
