// Copyright 2023 @soul-wallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtrinsicType } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { AccountJson } from '@soul-wallet/extension-base/src/background/types';
import { useCallback } from 'react';

import { isEthereumAddress } from '@polkadot/util-crypto';
import { VoidFunction } from 'types/index';
import useGetAccountByAddress from 'hooks/screen/hooks/useGetAccountByAddress';
import { getSignMode } from 'utils/account';
import { AccountSignMode } from 'types/signer';
import { ALL_STAKING_ACTIONS } from 'constants/transaction';
import { BLOCK_ACTION_LEDGER_NETWORKS, PredefinedLedgerNetwork } from 'constants/ledger';
import { useToast } from 'react-native-toast-notifications';

//todo: i18n
//todo: solve error
const usePreCheckAction = (
  address?: string,
  blockAllAccount = true,
  message?: string,
): ((onPress: VoidFunction, action: ExtrinsicType) => VoidFunction) => {
  const { show, hideAll } = useToast();

  const account = useGetAccountByAddress(address);

  const getAccountTypeTitle = useCallback((_account: AccountJson): string => {
    const signMode = getSignMode(_account);

    switch (signMode) {
      case AccountSignMode.LEDGER:
        return 'Ledger Account';
      case AccountSignMode.ALL_ACCOUNT:
        return 'All Account';
      case AccountSignMode.PASSWORD:
        return 'Normal Account';
      case AccountSignMode.QR:
        return 'QR Signer Account';
      case AccountSignMode.READ_ONLY:
        return 'Watch-Only Account';
      case AccountSignMode.UNKNOWN:
      default:
        return 'Unknown account';
    }
  }, []);

  return useCallback(
    (onPress: VoidFunction, action: ExtrinsicType) => {
      return () => {
        if (!account) {
          hideAll();
          show('Account not exists');
        } else {
          const mode = getSignMode(account);
          let block = false;
          let accountTitle = getAccountTypeTitle(account);
          let defaultMessage = 'The account you are using is {{accountTitle}}, you cannot use this feature with it';

          switch (mode) {
            case AccountSignMode.READ_ONLY:
            case AccountSignMode.UNKNOWN:
              block = true;
              break;
            case AccountSignMode.ALL_ACCOUNT:
              if (blockAllAccount) {
                block = true;
              }

              break;
          }

          if (ALL_STAKING_ACTIONS.includes(action)) {
            defaultMessage = 'You are using a {{accountTitle}}. Staking is not supported with this account type';
          }

          if (mode === AccountSignMode.LEDGER) {
            const networkBlock: string[] = BLOCK_ACTION_LEDGER_NETWORKS[action] || [];
            const isEthereumAccount = isEthereumAddress(account.address);

            if (networkBlock.includes('*')) {
              // Block all network
              block = true;
            } else if (networkBlock.includes('evm') && isEthereumAccount) {
              // Block evm network
              accountTitle = 'Ledger - EVM account';
              block = true;
            } else if (networkBlock.includes('substrate') && !isEthereumAccount) {
              // Block evm network
              accountTitle = 'Ledger - Substrate account';
              block = true;
            } else {
              const ledgerNetwork = PredefinedLedgerNetwork.find(
                network => network.genesisHash === account.originGenesisHash,
              );
              const networkName = ledgerNetwork?.accountName || 'Unknown';
              const slug = ledgerNetwork?.slug || '';

              if (networkBlock.includes(slug)) {
                hideAll();
                show(`Ledger does not support this action with ${networkName}`);

                return;
              }
            }
          }

          if (!block) {
            onPress();
          } else {
            hideAll();
            show((message || defaultMessage).replace('{{accountTitle}}', accountTitle));
          }
        }
      };
    },
    [account, blockAllAccount, getAccountTypeTitle, hideAll, message, show],
  );
};

export default usePreCheckAction;
