import { StyleProp, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { AccountJson } from '@subwallet/extension-base/background/types';
import React, { useCallback, useEffect, useState } from 'react';
import { saveCurrentAccountAddress } from '../messaging';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentAccount } from 'stores/Accounts';
import { RootNavigationProps } from 'types/routes';
import { accountAllRecoded, defaultRecoded, getIcon } from 'utils/index';
import { RootState } from 'stores/index';
import { NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import { Recoded } from 'types/ui-types';
import { isAccountAll } from '@subwallet/extension-koni-base/utils/utils';
import Clipboard from '@react-native-clipboard/clipboard';
import { FontBold, FontSemiBold, sharedStyles } from 'styles/sharedStyles';
import { SubWalletAvatar } from 'components/SubWalletAvatar';
import { CircleWavyCheck } from 'phosphor-react-native';
import { ColorMap } from 'styles/color';

export interface AccountProps extends AccountJson {
  name: string;
  isShowBanner?: boolean;
  isShowAddress?: boolean;
  showCopyBtn?: boolean;
}

const accountNameStyle: StyleProp<any> = {
  color: ColorMap.light,
  ...sharedStyles.mediumText,
  ...FontBold,
  paddingRight: 5,
};

const accountAddressStyle: StyleProp<any> = {
  color: ColorMap.disabled,
  ...sharedStyles.mainText,
  ...FontSemiBold,
};

const accountAddressBlock: StyleProp<any> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

const accountCopyBtn: StyleProp<any> = {
  paddingLeft: 11,
};

const nameWrapper: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
};

export const Account = ({
  name,
  address,
  isExternal,
  isHardware,
  genesisHash,
  isShowBanner = true,
  isShowAddress = true,
  showCopyBtn = true,
  type: givenType,
}: AccountProps) => {
  const navigation = useNavigation<RootNavigationProps>();
  const dispatch = useDispatch();
  const { accounts, networkMap } = useSelector((state: RootState) => state);
  const accountList = accounts.accounts;
  const [{ account, formatted, genesisHash: recodedGenesis, isEthereum, prefix }, setRecoded] =
    useState<Recoded>(defaultRecoded);
  const getNetworkInfoByGenesisHash = useCallback(
    (hash?: string | null): NetworkJson | null => {
      if (!hash) {
        return null;
      }

      for (const n in networkMap) {
        if (!Object.prototype.hasOwnProperty.call(networkMap, n)) {
          continue;
        }

        const networkInfo = networkMap[n];

        if (networkInfo.genesisHash === hash) {
          return networkInfo;
        }
      }

      return null;
    },
    [networkMap],
  );
  const _isAccountAll = address && isAccountAll(address);
  const networkInfo = getNetworkInfoByGenesisHash(genesisHash || recodedGenesis);
  const [isSelected, setSelected] = useState(false);
  const {
    accounts: { currentAccountAddress },
  } = useSelector((state: RootState) => state);
  useEffect((): void => {
    if (!address) {
      setRecoded(defaultRecoded);

      return;
    }

    if (_isAccountAll) {
      setRecoded(accountAllRecoded);

      return;
    }

    setRecoded({
      account: {
        address: '5DnVVG5afXqUSa6wyMEbecAtWckTTNFrbb7jy1z4gCfR6Ljf',
      },
      formatted: '5DnVVG5afXqUSa6wyMEbecAtWckTTNFrbb7jy1z4gCfR6Ljf',
      prefix: 42,
      isEthereum: false,
    });
    //TODO: change recoded
  }, [accountList, _isAccountAll, address, networkInfo, givenType]);

  useEffect((): void => {
    if (currentAccountAddress === address) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [address, currentAccountAddress]);

  const toShortAddress = (_address: string | null, halfLength?: number) => {
    const currentAddress = (_address || '').toString();

    const addressLength = halfLength || 7;

    return currentAddress.length > 13
      ? `${currentAddress.slice(0, addressLength)}…${currentAddress.slice(-addressLength)}`
      : currentAddress;
  };

  const copyToClipboard = useCallback((text: string) => {
    Clipboard.setString(text);
  }, []);

  const selectAccount = useCallback(
    (accAddress: string) => {
      setSelected(true);

      saveCurrentAccountAddress({ address: accAddress }, rs => {
        dispatch(updateCurrentAccount(rs.address));
        navigation.navigate('Home');
      })
        .then(console.log)
        .catch(console.error);
    },
    [dispatch, navigation],
  );

  // const removeAccount = (accAddress: string) => {
  //   forgetAccount(accAddress).then(console.log).catch(console.error);
  // };

  const Name = () => {
    return (
      <View style={nameWrapper}>
        <Text style={accountNameStyle}>{name}</Text>
        {isSelected && <CircleWavyCheck size={20} color={'#42C59A'} weight={'bold'} />}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        selectAccount(address);
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}>
        <SubWalletAvatar address={address} size={42} />
        <View style={{ marginLeft: 16 }}>
          <Name />

          <View style={accountAddressBlock}>
            {isShowAddress && (
              <Text style={accountAddressStyle}>
                {_isAccountAll ? 'All Accounts' : toShortAddress(formatted || address, 10)}
              </Text>
            )}

            {showCopyBtn && (
              <TouchableOpacity style={accountCopyBtn} onPress={() => copyToClipboard((formatted && formatted) || '')}>
                {getIcon('CloneIcon', 20, '#FFF')}
              </TouchableOpacity>
            )}
          </View>
        </View>
        {networkInfo?.genesisHash && isShowBanner && (
          <div className="account-info-banner account-info-chain" data-field="chain">
            {networkInfo.chain.replace(' Relay Chain', '')}
          </div>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
