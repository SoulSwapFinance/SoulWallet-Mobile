import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleProp, Text, View } from 'react-native';
import { FontMedium, sharedStyles } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';
import i18n from 'utils/i18n/i18n';
import { filterAndSortingAccountByAuthType } from '@subwallet/extension-koni-base/utils';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { RequestAuthorizeTab } from '@subwallet/extension-base/background/types';
import { ConnectAccount } from 'components/ConnectAccount';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-koni-base/constants';
import { Warning } from 'components/Warning';

interface Props {
  request: RequestAuthorizeTab;
}

const textStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  ...FontMedium,
  color: ColorMap.disabled,
};

export const AuthorizeRequest = ({ request: { origin, accountAuthType, allowedAccounts } }: Props) => {
  const accounts = useSelector((state: RootState) => state.accounts.accounts);
  const accountList = useMemo(() => {
    return filterAndSortingAccountByAuthType(accounts, accountAuthType || 'substrate', true);
  }, [accountAuthType, accounts]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(allowedAccounts || []);
  const [isSelectedAll, setIsSelectedAll] = useState(true);

  useEffect(() => {
    const notInSelected = accountList.find(acc => !selectedAccounts.includes(acc.address));
    setIsSelectedAll(!notInSelected);
  }, [accountList, selectedAccounts]);

  return (
    <View style={{ width: '100%' }}>
      <Text style={[textStyle, { paddingTop: 3, paddingBottom: 24, textAlign: 'center' }]}>{origin}</Text>
      {accountList && accountList.length ? (
        <>
          <Text style={[textStyle, { paddingBottom: 16 }]}>{i18n.common.chooseAccount}</Text>
          <ScrollView style={{ maxHeight: 168 }} showsVerticalScrollIndicator={false}>
            <>
              <ConnectAccount
                isSelected={isSelectedAll}
                address={ALL_ACCOUNT_KEY}
                name={'Select All'}
                selectedAccounts={accountList.map(account => account.address)}
                selectAccountCallBack={setSelectedAccounts}
              />
              {accountList.map(acc => (
                <ConnectAccount
                  key={acc.address}
                  isSelected={selectedAccounts.includes(acc.address)}
                  address={acc.address}
                  name={acc.name || ''}
                  selectedAccounts={selectedAccounts}
                  selectAccountCallBack={setSelectedAccounts}
                />
              ))}
            </>
          </ScrollView>
        </>
      ) : (
        <Warning
          message={
            accountAuthType === 'evm'
              ? i18n.warningMessage.noEvmAccountMessage
              : i18n.warningMessage.noSubstrateAccountMessage
          }
        />
      )}

      <Text style={[textStyle, { paddingTop: 16, paddingBottom: 24 }]}>{i18n.warningMessage.trustSiteMessage}</Text>
    </View>
  );
};
