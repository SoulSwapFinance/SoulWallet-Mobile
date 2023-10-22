import React, { useMemo } from 'react';
import AccountItemBase from 'components/Common/Account/Item/AccountItemBase';
import AvatarGroup from 'components/Common/AvatarGroup';
import { Icon, Typography } from 'components/Design';
import { AccountJson } from '@soul-wallet/extension-base/src/background/types';
import { isSameAddress } from '@soul-wallet/extension-base/src/utils';
import { DotsThree } from 'phosphor-react-native';
import i18n from 'utils/i18n/i18n';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { FontMedium } from 'styles/sharedStyles';

interface Props {
  accounts: AccountJson[];
  selected: string[];
}

export const WCAccountInput = ({ accounts, selected }: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const selectedAccounts = useMemo(
    () => accounts.filter(account => selected.some(address => isSameAddress(address, account.address))),
    [accounts, selected],
  );

  const countSelected = selectedAccounts.length;

  return (
    <AccountItemBase
      customStyle={{ left: { paddingRight: countSelected ? 8 : 0 }, right: { marginRight: -2 } }}
      address={''}
      leftItem={<AvatarGroup addresses={selectedAccounts.map(acc => acc.address)} />}
      middleItem={
        <Typography.Text style={{ color: theme.colorWhite, ...FontMedium }}>
          {countSelected ? i18n.message.connectedAccounts(countSelected) : i18n.inputLabel.selectAcc}
        </Typography.Text>
      }
      rightItem={<Icon phosphorIcon={DotsThree} weight={'fill'} />}
    />
  );
};
