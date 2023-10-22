import DeriveAccountModal from 'components/Common/Modal/DeriveAccountModal';
import React, { useCallback, useMemo, useRef } from 'react';
import {
  DeviceTabletCamera,
  Eye,
  FileJs,
  Leaf,
  PlusCircle,
  QrCode,
  ShareNetwork,
  Swatches,
  Wallet,
} from 'phosphor-react-native';
import { EVM_ACCOUNT_TYPE } from 'constants/index';
import i18n from 'utils/i18n/i18n';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamList } from 'routes/index';
import ToastContainer from 'react-native-toast-notifications';
import { SelectAccountTypeModal } from 'components/Modal/SelectAccountTypeModal';
import { KeypairType } from '@polkadot/util-crypto/types';
import { canDerive } from '@soul-wallet/extension-base/src/utils';
import { AccountActionSelectModal, ActionItemType } from 'components/Modal/AccountActionSelectModal';
import { ModalRef } from 'types/modalRef';
import useGoHome from 'hooks/screen/hooks/useGoHome';
import { ColorMap } from 'styles/color';

interface Props {
  createAccountRef: React.MutableRefObject<ModalRef | undefined>;
  importAccountRef: React.MutableRefObject<ModalRef | undefined>;
  attachAccountRef: React.MutableRefObject<ModalRef | undefined>;
  allowToShowSelectType?: boolean;
}

export const AccountCreationArea = ({
  allowToShowSelectType = false,
  createAccountRef,
  importAccountRef,
  attachAccountRef,
}: Props) => {
  const navigation = useNavigation<RootNavigationProps>();
  const { accounts, hasMasterPassword } = useSelector((state: RootState) => state.accountState);
  const selectTypeRef = useRef<ModalRef>();
  const deriveAccModalRef = useRef<ModalRef>();
  const goHome = useGoHome();
  const importAccountActions = [
    {
      key: 'secretPhrase',
      backgroundColor: ColorMap.lightPurple,
      icon: Leaf,
      label: i18n.importAccount.importFromSeedPhrase,
    },
    {
      key: 'restoreJson',
      backgroundColor: ColorMap.lightPurple,
      icon: FileJs,
      label: i18n.importAccount.importFromJson,
    },
    {
      key: 'privateKey',
      backgroundColor: ColorMap.lightPurple,
      icon: Wallet,
      label: i18n.importAccount.importByMetaMaskPrivateKey,
    },
    {
      key: 'qrCode',
      backgroundColor: ColorMap.lightPurple,
      icon: QrCode,
      label: i18n.importAccount.importByQRCode,
    },
  ];

  const attachAccountActions = [
    {
      key: 'ledger',
      backgroundColor: ColorMap.lightPurple,
      icon: Swatches,
      label: i18n.attachAccount.connectALedgerDevice,
    },
    {
      key: 'polkadotVault',
      backgroundColor: ColorMap.lightPurple,
      icon: QrCode,
      label: i18n.attachAccount.connectAPolkadotVaultAcc,
    },
    {
      key: 'keystone',
      backgroundColor: ColorMap.lightPurple,
      icon: DeviceTabletCamera,
      label: i18n.attachAccount.connectAKeystoneDevice,
    },
    {
      key: 'watchOnly',
      backgroundColor: ColorMap.lightPurple,
      icon: Eye,
      label: i18n.attachAccount.attachAWatchOnlyAccount,
    },
  ];

  const canDerivedAccounts = useMemo(
    () =>
      accounts
        .filter(({ isExternal }) => !isExternal)
        .filter(
          ({ isMasterAccount, type }) =>
            canDerive(type) && (type !== EVM_ACCOUNT_TYPE || (isMasterAccount && type === EVM_ACCOUNT_TYPE)),
        ),
    [accounts],
  );

  const toastRef = useRef<ToastContainer>(null);
  const show = useCallback((text: string) => {
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.hideAll();
      // @ts-ignore
      toastRef.current.show(text);
    }
  }, []);

  const onSelectAccountTypes = useCallback(
    (keyTypes: KeypairType[]) => {
      createAccountRef && createAccountRef.current?.onCloseModal();
      selectTypeRef && selectTypeRef.current?.onCloseModal();
      setTimeout(() => {
        if (hasMasterPassword) {
          navigation.navigate('CreateAccount', { keyTypes: keyTypes });
        } else {
          navigation.navigate('CreatePassword', { pathName: 'CreateAccount', state: keyTypes });
        }
      }, 300);
    },
    [createAccountRef, hasMasterPassword, navigation],
  );

  const createAccountAction = useMemo(() => {
    return [
      {
        key: 'createAcc',
        backgroundColor: '#51BC5E',
        icon: PlusCircle,
        label: i18n.createAccount.createWithNewSeedPhrase,
      },
      {
        key: 'derive',
        backgroundColor: '#E6478E',
        icon: ShareNetwork,
        label: i18n.createAccount.deriveFromAnExistingAcc,
        disabled: !canDerivedAccounts.length,
      },
    ];
  }, [canDerivedAccounts.length]);

  const createAccountFunc = (item: ActionItemType) => {
    if (item.key === 'createAcc') {
      if (allowToShowSelectType) {
        selectTypeRef && selectTypeRef.current?.onOpenModal();
      } else {
        createAccountRef?.current?.onCloseModal();
        setTimeout(() => {
          if (hasMasterPassword) {
            navigation.navigate('CreateAccount', {});
          } else {
            navigation.navigate('CreatePassword', { pathName: 'CreateAccount' });
          }
        }, 3000);
      }
    } else {
      deriveAccModalRef && deriveAccModalRef.current?.onOpenModal();
    }
  };

  const importAccountActionFunc = (item: ActionItemType) => {
    let pathName: keyof RootStackParamList;
    importAccountRef && importAccountRef.current?.onCloseModal();
    if (item.key === 'secretPhrase') {
      pathName = 'ImportSecretPhrase';
    } else if (item.key === 'restoreJson') {
      pathName = 'RestoreJson';
    } else if (item.key === 'privateKey') {
      pathName = 'ImportPrivateKey';
    } else {
      pathName = 'ImportQrCode';
    }

    setTimeout(() => {
      if (hasMasterPassword) {
        // @ts-ignore
        navigation.navigate(pathName);
      } else {
        // @ts-ignore
        navigation.navigate('CreatePassword', { pathName: pathName });
      }
    }, 300);
  };

  const attachAccountFunc = (item: ActionItemType) => {
    let pathName: keyof RootStackParamList;

    if (item.key === 'ledger') {
      show(i18n.notificationMessage.comingSoon);
      return;
    } else if (item.key === 'polkadotVault') {
      pathName = 'ConnectParitySigner';
    } else if (item.key === 'keystone') {
      pathName = 'ConnectKeystone';
    } else {
      pathName = 'AttachReadOnly';
    }

    attachAccountRef && attachAccountRef.current?.onCloseModal();
    setTimeout(() => {
      if (hasMasterPassword) {
        // @ts-ignore
        navigation.navigate(pathName);
      } else {
        // @ts-ignore
        navigation.navigate('CreatePassword', { pathName: pathName });
      }
    }, 300);
  };

  return (
    <>
      <AccountActionSelectModal
        accActionRef={createAccountRef}
        modalTitle={i18n.header.createNewAcc}
        items={createAccountAction}
        onSelectItem={createAccountFunc}>
        <DeriveAccountModal deriveAccModalRef={deriveAccModalRef} goHome={goHome} navigation={navigation} />
      </AccountActionSelectModal>

      <SelectAccountTypeModal selectTypeRef={selectTypeRef} onConfirm={onSelectAccountTypes} />

      <AccountActionSelectModal
        accActionRef={importAccountRef}
        modalTitle={i18n.header.importAcc}
        items={importAccountActions}
        onSelectItem={importAccountActionFunc}
      />

      <AccountActionSelectModal
        accActionRef={attachAccountRef}
        modalTitle={i18n.header.attachAnAcc}
        items={attachAccountActions}
        onSelectItem={attachAccountFunc}
        toastRef={toastRef}
      />
    </>
  );
};
