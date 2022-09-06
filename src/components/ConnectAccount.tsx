import React, { useCallback } from 'react';
import { StyleProp, Text, TouchableOpacity, View } from 'react-native';
import { SubWalletAvatar } from 'components/SubWalletAvatar';
import { Check } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';
import { toShort } from 'utils/index';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-koni-base/constants';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';

interface Props {
  address: string;
  name: string;
  isSelected: boolean;
  selectedAccounts: string[];
  selectAccountCallBack?: (selectedAccounts: string[]) => void;
}

const accountContainerStyle: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: ColorMap.dark1,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 5,
  marginBottom: 8,
};

const textStyle: StyleProp<any> = { paddingLeft: 8, color: ColorMap.disabled, ...sharedStyles.mainText, ...FontMedium };

export const ConnectAccount = ({ address, name, isSelected, selectedAccounts, selectAccountCallBack }: Props) => {
  const selectAccounts = useCallback(() => {
    let newSelectedList = selectedAccounts;

    if (address !== ALL_ACCOUNT_KEY) {
      if (isSelected) {
        newSelectedList = selectedAccounts.filter(acc => acc !== address);
      } else {
        newSelectedList = selectedAccounts.concat(address);
      }
    } else if (isSelected) {
      newSelectedList = [];
    }

    selectAccountCallBack && selectAccountCallBack(newSelectedList);
  }, [address, isSelected, selectAccountCallBack, selectedAccounts]);

  return (
    <TouchableOpacity onPress={selectAccounts} style={accountContainerStyle}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SubWalletAvatar address={address || ''} size={14} />
        <Text style={textStyle}>
          <Text>{name}</Text>
          <Text> ({toShort(address, 0, 5)})</Text>
        </Text>
      </View>
      {isSelected && <Check weight={'bold'} size={20} color={ColorMap.primary} />}
    </TouchableOpacity>
  );
};
