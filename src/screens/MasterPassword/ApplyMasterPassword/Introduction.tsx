import React from 'react';
import { Text, View } from 'react-native';
import { PageIcon } from 'components/Design';
import { ShieldStar } from 'phosphor-react-native';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import ApplyMasterPasswordStyle from './style';
import i18n from 'utils/i18n/i18n';

export const Introduction = () => {
  const theme = useSoulWalletTheme().swThemes;
  const _style = ApplyMasterPasswordStyle(theme);

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 48 }}>
      <PageIcon icon={ShieldStar} color={theme.colorSuccess} />
      <Text style={_style.titleStyle}>{i18n.applyMasterPassword.applyMasterPassword}</Text>
      <Text style={_style.messageStyle}>{i18n.applyMasterPassword.applyMasterPasswordMessage}</Text>
    </View>
  );
};
