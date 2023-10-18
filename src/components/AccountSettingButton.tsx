import React from 'react';
import { ActivityIndicator, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'routes/index';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { CaretDown } from 'phosphor-react-native';
import { Avatar, Icon } from 'components/Design';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import AvatarGroup from 'components/Common/AvatarGroup';
import { isEthereumAddress } from '@polkadot/util-crypto';
import createStylesheet from './styles/AccountSettingButton';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  style?: StyleProp<ViewStyle>;
}

export const AccountSettingButton = ({ navigation, style }: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const stylesheet = createStylesheet(theme);
  const { currentAccount, isReady, isAllAccount } = useSelector((state: RootState) => state.accountState);
  const currentAccountAddress = currentAccount?.address || '';

  return (
    <TouchableOpacity
      style={[stylesheet.container, style]}
      onPress={() => {
        navigation.navigate('AccountsScreen', {});
      }}>
      {isAllAccount && <AvatarGroup avatarSize={20} />}
      {!isAllAccount && (
        <Avatar
          value={currentAccountAddress}
          size={20}
          theme={isEthereumAddress(currentAccountAddress) ? 'ethereum' : 'polkadot'}
        />
      )}
      {!isReady && (
        <View style={stylesheet.placeholder}>
          <ActivityIndicator size={16} />
        </View>
      )}

      <Icon phosphorIcon={CaretDown} weight={'bold'} iconColor={theme.colorTextLight3} size={'xxs'} />
    </TouchableOpacity>
  );
};
