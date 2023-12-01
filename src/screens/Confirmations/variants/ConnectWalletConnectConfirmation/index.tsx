import React, { useCallback, useMemo, useState } from 'react';
import { WalletConnectSessionRequest } from '@subwallet/extension-base/services/wallet-connect-service/types';
import { approveWalletConnectSession, rejectWalletConnectSession } from 'messaging/index';
import { isAccountAll } from 'utils/accountAll';
import {
  WALLET_CONNECT_EIP155_NAMESPACE,
  WALLET_CONNECT_POLKADOT_NAMESPACE,
} from '@subwallet/extension-base/services/wallet-connect-service/constants';
import useSelectWalletConnectAccount from 'hooks/wallet-connect/useSelectWalletConnectAccount';
import { VoidFunction } from 'types/index';
import { useToast } from 'react-native-toast-notifications';
import { convertKeyTypes } from 'utils/index';
import { RootStackParamList } from 'routes/index';
import ConfirmationContent from '../../../../components/Common/Confirmation/ConfirmationContent';
import ConfirmationGeneralInfo from '../../../../components/Common/Confirmation/ConfirmationGeneralInfo';
import AlertBox from 'components/Design/AlertBox';
import { View } from 'react-native';
import { Button, Icon, Typography } from 'components/Design';
import { ConfirmationFooter } from 'components/Common/Confirmation';
import { CheckCircle, PlusCircle, XCircle } from 'phosphor-react-native';
import i18n from 'utils/i18n/i18n';
import { WCNetworkSelected } from 'components/WalletConnect/Network/WCNetworkSelected';
import { WCAccountSelect } from 'components/WalletConnect/Account/WCAccountSelect';
import createStyle from './styles';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { WCNetworkSupported } from 'components/WalletConnect/Network/WCNetworkSupported';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { Minimizer } from '../../../../NativeModules';
import { updateIsDeepLinkConnect } from 'stores/base/Settings';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Props {
  request: WalletConnectSessionRequest;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const handleConfirm = async ({ id }: WalletConnectSessionRequest, selectedAccounts: string[]) => {
  return await approveWalletConnectSession({
    id,
    accounts: selectedAccounts.filter(item => !isAccountAll(item)),
  });
};

const handleCancel = async ({ id }: WalletConnectSessionRequest) => {
  return await rejectWalletConnectSession({
    id,
  });
};

export const ConnectWalletConnectConfirmation = ({ request, navigation }: Props) => {
  const { params } = request.request;
  const toast = useToast();
  const { hasMasterPassword } = useSelector((state: RootState) => state.accountState);
  const { isDeepLinkConnect } = useSelector((state: RootState) => state.settings);
  const nameSpaceNameMap = useMemo(
    (): Record<string, string> => ({
      [WALLET_CONNECT_EIP155_NAMESPACE]: i18n.common.evmNetworks,
      [WALLET_CONNECT_POLKADOT_NAMESPACE]: i18n.common.substrateNetworks,
    }),
    [],
  );
  const theme = useSoulWalletTheme().swThemes;
  const styles = useMemo(() => createStyle(theme), [theme]);
  const dispatch = useDispatch();

  const {
    isExpired,
    isUnSupportCase,
    missingType,
    namespaceAccounts,
    onApplyAccounts,
    onCancelSelectAccounts,
    onSelectAccount,
    supportOneChain,
    supportOneNamespace,
    supportedChains,
  } = useSelectWalletConnectAccount(params);

  const allowSubmit = useMemo(() => {
    return Object.values(namespaceAccounts).every(({ appliedAccounts }) => appliedAccounts.length);
  }, [namespaceAccounts]);

  const [loading, setLoading] = useState(false);

  const _onSelectAccount = useCallback(
    (namespace: string): ((address: string, applyImmediately?: boolean) => VoidFunction) => {
      return (address: string, applyImmediately = false) => {
        return () => {
          onSelectAccount(namespace, address, applyImmediately)();
        };
      };
    },
    [onSelectAccount],
  );

  const onCancel = useCallback(() => {
    setLoading(true);
    handleCancel(request).finally(() => {
      setLoading(false);
      dispatch(updateIsDeepLinkConnect(false));
    });
  }, [dispatch, request]);

  const onConfirm = useCallback(() => {
    setLoading(true);
    const selectedAccounts = Object.values(namespaceAccounts)
      .map(({ appliedAccounts }) => appliedAccounts)
      .flat();

    handleConfirm(request, selectedAccounts)
      .then(() => {
        toast.show('Connect Successfully', { type: 'success' });
        isDeepLinkConnect && Minimizer.goBack();
      })
      .catch(e => {
        toast.show((e as Error).message, { type: 'danger' });
      })
      .finally(() => {
        dispatch(updateIsDeepLinkConnect(false));
        setLoading(false);
      });
  }, [dispatch, isDeepLinkConnect, namespaceAccounts, request, toast]);

  const onAddAccount = useCallback(() => {
    if (hasMasterPassword) {
      navigation.replace('CreateAccount', { keyTypes: convertKeyTypes(missingType), isBack: true });
    } else {
      navigation.replace('CreatePassword', { pathName: 'CreateAccount', state: convertKeyTypes(missingType) });
    }
  }, [hasMasterPassword, missingType, navigation]);

  const onApplyModal = useCallback(
    (namespace: string) => {
      return () => {
        onApplyAccounts(namespace);
      };
    },
    [onApplyAccounts],
  );

  const onCancelModal = useCallback(
    (namespace: string) => {
      return () => {
        onCancelSelectAccounts(namespace);
      };
    },
    [onCancelSelectAccounts],
  );

  const isSupportCase = !isUnSupportCase && !isExpired;

  return (
    <React.Fragment>
      <ConfirmationContent>
        <ConfirmationGeneralInfo request={request} gap={0} />
        {isUnSupportCase && (
          <View>
            <View style={{ paddingBottom: 8 }}>
              <AlertBox
                title={i18n.warningTitle.unsupportedNetworkTitle}
                description={i18n.warningMessage.unsupportedNetworkMessage}
                type={'warning'}
              />
            </View>

            <WCNetworkSupported networks={supportedChains} />
          </View>
        )}
        {!isUnSupportCase && isExpired && (
          <>
            <AlertBox
              description={i18n.warningMessage.expiredConnectionMessage}
              title={i18n.warningTitle.expiredConnectionTitle}
              type="warning"
            />
          </>
        )}
        {isSupportCase && (
          <View style={{ gap: theme.padding }}>
            {Object.entries(namespaceAccounts).map(([namespace, value]) => {
              const { appliedAccounts, availableAccounts, networks, selectedAccounts } = value;

              return (
                <View key={namespace}>
                  {!supportOneChain && (
                    <>
                      <Typography.Text style={styles.text}>
                        {supportOneNamespace ? i18n.common.networks : nameSpaceNameMap[namespace]}
                      </Typography.Text>
                      <WCNetworkSelected networks={networks} />
                    </>
                  )}
                  {supportOneNamespace && (
                    <Typography.Text style={styles.text}>{i18n.common.chooseAccount}</Typography.Text>
                  )}

                  <WCAccountSelect
                    selectedAccounts={selectedAccounts}
                    appliedAccounts={appliedAccounts}
                    availableAccounts={availableAccounts}
                    useModal={!supportOneNamespace}
                    onApply={onApplyModal(namespace)}
                    onCancel={onCancelModal(namespace)}
                    onSelectAccount={_onSelectAccount(namespace)}
                    namespace={namespace}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ConfirmationContent>
      <ConfirmationFooter>
        {!isSupportCase && (
          <Button
            style={{ width: '100%' }}
            disabled={loading}
            icon={<Icon phosphorIcon={XCircle} weight={'fill'} />}
            onPress={onCancel}
            type={'secondary'}>
            {i18n.buttonTitles.cancel}
          </Button>
        )}
        {isSupportCase && !missingType.length && (
          <>
            <Button
              block
              disabled={loading}
              icon={color => <Icon phosphorIcon={XCircle} weight={'fill'} iconColor={color} />}
              onPress={onCancel}
              type={'secondary'}>
              {i18n.buttonTitles.cancel}
            </Button>
            <Button
              block
              disabled={!allowSubmit || loading}
              loading={loading}
              icon={color => <Icon phosphorIcon={CheckCircle} weight={'fill'} iconColor={color} />}
              onPress={onConfirm}>
              {i18n.buttonTitles.approve}
            </Button>
          </>
        )}
        {isSupportCase && !!missingType.length && (
          <>
            <Button
              block
              disabled={loading}
              icon={<Icon phosphorIcon={XCircle} weight={'fill'} />}
              onPress={onCancel}
              type={'secondary'}>
              {i18n.buttonTitles.cancel}
            </Button>
            <Button
              block
              disabled={loading}
              icon={<Icon phosphorIcon={PlusCircle} weight={'fill'} />}
              onPress={onAddAccount}>
              {i18n.buttonTitles.createOne}
            </Button>
          </>
        )}
      </ConfirmationFooter>
    </React.Fragment>
  );
};
