import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Typography } from 'components/Design';
import { isAccountAll } from '@soul-wallet/extension-base/src/utils';
import AvatarGroup from '../../AvatarGroup';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import AccountSelectFieldStyles from './style';
import { CaretDown } from 'phosphor-react-native';
import { DisabledStyle } from 'styles/sharedStyles';
import i18n from 'utils/i18n/i18n';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

const AccountSelectField = ({ disabled, onPress }: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const _style = AccountSelectFieldStyles(theme);
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  const isAll = useMemo((): boolean => !!currentAccount && isAccountAll(currentAccount.address), [currentAccount]);
  // TODO: reformat address when have new network info

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} disabled={disabled} style={disabled && DisabledStyle}>
      <View style={_style.container}>
        {isAll ? (
          <AvatarGroup />
        ) : (
          <Avatar
            value={currentAccount?.address || ''}
            size={20}
            identPrefix={42}
            theme={currentAccount?.type === 'ethereum' ? 'ethereum' : 'polkadot'}
          />
        )}
        <Typography.Text style={_style.accountNameStyle} ellipsis={true}>
          {isAll ? i18n.common.allAccounts : currentAccount?.name}
        </Typography.Text>
        {!isAll && <Text style={_style.accountAddressStyle}>{`(...${currentAccount?.address.slice(-3)})`}</Text>}
        <Icon phosphorIcon={CaretDown} size={'xxs'} />
      </View>
    </TouchableOpacity>
  );
};

export default AccountSelectField;
