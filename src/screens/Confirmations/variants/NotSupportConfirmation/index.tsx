// Copyright 2023 @soul-wallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ConfirmationResult } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { AccountJson, ConfirmationRequestBase } from '@soul-wallet/extension-base/src/background/types';
import AccountItemWithName from 'components/Common/Account/Item/AccountItemWithName';
import { ConfirmationContent, ConfirmationGeneralInfo } from 'components/Common/Confirmation';
import ConfirmationFooter from 'components/Common/Confirmation/ConfirmationFooter';
import { Button } from 'components/Design';
import { NEED_SIGN_CONFIRMATION } from 'constants/transaction';
import useGetAccountTitleByAddress from 'hooks/account/useGetAccountTitleByAddress';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { cancelSignRequest, completeConfirmation } from 'messaging/index';
import React, { useCallback, useMemo, useState } from 'react';
import { Text } from 'react-native';
import { EvmSignatureSupportType } from 'types/confirmation';
import createStyle from './styles';
import i18n from 'utils/i18n/i18n';

interface Props {
  request: ConfirmationRequestBase;
  isMessage: boolean;
  type: (typeof NEED_SIGN_CONFIRMATION)[number];
  account?: AccountJson;
}

const handleCancelEvm = async (type: EvmSignatureSupportType, id: string) => {
  return await completeConfirmation(type, {
    id,
    isApproved: false,
  } as ConfirmationResult<string>);
};

const handleCancelSubstrate = async (id: string) => await cancelSignRequest(id);

const NotSupportConfirmation: React.FC<Props> = (props: Props) => {
  const { account, isMessage, request, type } = props;

  const accountTitle = useGetAccountTitleByAddress(account?.address);
  const theme = useSoulWalletTheme().swThemes;
  const styles = useMemo(() => createStyle(theme), [theme]);

  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    let promise: (() => Promise<unknown>) | undefined;

    switch (type) {
      case 'evmSignatureRequest':
      case 'evmSendTransactionRequest':
        promise = () => handleCancelEvm(type, request.id);
        break;
      case 'signingRequest':
        promise = () => handleCancelSubstrate(request.id);
        break;
    }

    if (promise) {
      setLoading(true);

      setTimeout(() => {
        if (promise) {
          promise().finally(() => {
            setLoading(false);
          });
        }
      }, 300);
    }
  }, [request.id, type]);

  return (
    <>
      <ConfirmationContent>
        <ConfirmationGeneralInfo request={request} />
        <Text style={styles.text}>
          {isMessage ? i18n.confirmation.signatureRequest : i18n.confirmation.approveRequest}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.message}>{i18n.confirmation.notSpMessagePart1}</Text>
          <Text style={styles.highlight}>&nbsp;"{accountTitle}"</Text>
          <Text style={styles.message}>{`. ${i18n.confirmation.notSpMessagePart2}.`}</Text>
        </Text>
        <AccountItemWithName
          accountName={account?.name}
          address={account?.address || ''}
          avatarSize={24}
          showUnselectIcon={true}
          customStyle={{ container: styles.accountBlockContainer }}
        />
      </ConfirmationContent>
      <ConfirmationFooter>
        <Button block={true} loading={loading} onPress={handleCancel}>
          {i18n.buttonTitles.backToHome}
        </Button>
      </ConfirmationFooter>
    </>
  );
};

export default NotSupportConfirmation;
