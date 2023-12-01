import { AccountJson } from '@subwallet/extension-base/background/types';
import { SelectAccountItem } from 'components/Common/SelectAccountItem';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, ListRenderItemInfo, Platform, Share, StyleProp, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import {
  Copy,
  CopySimple,
  FileArrowDown,
  MagnifyingGlass,
  PlusCircle,
  QrCode,
  Share as ShareIcon,
  Swatches,
  Trash,
} from 'phosphor-react-native';
import { AccountsScreenProps, RootNavigationProps } from 'routes/index';
import i18n from 'utils/i18n/i18n';
import { FontMedium, FontSemiBold, MarginBottomForSubmitButton, STATUS_BAR_HEIGHT } from 'styles/sharedStyles';
import { forgetAccount, saveCurrentAccountAddress } from 'messaging/index';
import { isAccountAll } from '@subwallet/extension-base/utils';
import { findAccountByAddress, toShort } from 'utils/index';
import { CurrentAccountInfo } from '@subwallet/extension-base/background/KoniTypes';
import { Avatar, Button, Icon, QRCode, SwModal, Typography } from 'components/Design';
import { AccountCreationArea } from 'components/Common/Account/AccountCreationArea';
import { FlatListScreen } from 'components/FlatListScreen';
import { EmptyList } from 'components/EmptyList';
import { ModalRef } from 'types/modalRef';
import { Swipeable } from 'react-native-gesture-handler';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast, { useToast } from 'react-native-toast-notifications';
import { deviceHeight, TOAST_DURATION } from 'constants/index';
import { ColorMap } from 'styles/color';
import ToastContainer from 'react-native-toast-notifications';
import { isEthereumAddress } from '@polkadot/util-crypto';
import DeleteModal from 'components/Common/Modal/DeleteModal';
import useConfirmModal from 'hooks/modal/useConfirmModal';
import useGoHome from 'hooks/screen/useGoHome';

const renderListEmptyComponent = () => {
  return (
    <EmptyList
      icon={MagnifyingGlass}
      title={i18n.emptyScreen.selectorEmptyTitle}
      message={i18n.emptyScreen.selectorEmptyMessage}
    />
  );
};

const searchFunction = (items: AccountJson[], searchString: string) => {
  return items.filter(
    account =>
      account.name?.toLowerCase().includes(searchString.toLowerCase()) ||
      account.address.toLowerCase().includes(searchString.toLowerCase()),
  );
};
const OFFSET_BOTTOM = deviceHeight - STATUS_BAR_HEIGHT - 140;

const receiveModalContentWrapper: StyleProp<any> = {
  alignItems: 'center',
  width: '100%',
};

export const AccountsScreen = ({
  route: {
    params: { pathName },
  },
}: AccountsScreenProps) => {
  const toast = useToast();
  const theme = useSoulWalletTheme().swThemes;
  const goHome = useGoHome();
  const navigation = useNavigation<RootNavigationProps>();
  const fullAccounts = useSelector((state: RootState) => state.accountState.accounts);
  const currentAccountAddress = useSelector((state: RootState) => state.accountState.currentAccount?.address);
  let svg: { toDataURL: (arg0: (data: any) => void) => void };
  const [qrModalVisible, setQrModalVisible] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [deleting, setDeleting] = useState(false);
  const toastRef = useRef<ToastContainer>(null);
  const accounts = useMemo(() => {
    if (fullAccounts.length > 2) {
      return fullAccounts;
    }

    return fullAccounts.filter(a => !isAccountAll(a.address));
  }, [fullAccounts]);

  const createAccountRef = useRef<ModalRef>();
  const importAccountRef = useRef<ModalRef>();
  const attachAccountRef = useRef<ModalRef>();
  let row = useRef<(Swipeable | null)[]>([]);
  let prevOpenedRow = useRef<Swipeable>(null);
  const onDelete = useCallback(() => {
    if (selectedAddress) {
      setDeleting(true);
      forgetAccount(selectedAddress)
        .then(() => {
          goHome();
        })
        .catch((e: Error) => {
          toast.show(e.message, { type: 'danger' });
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  }, [selectedAddress, goHome, toast]);

  const closeOpenedRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow.current !== row.current?.[index]) {
      prevOpenedRow.current?.close();
    }
    prevOpenedRow = { current: row.current?.[index] };
  };

  const {
    onPress: onPressDelete,
    onCancelModal: onCancelDelete,
    visible: deleteVisible,
    onCompleteModal: onCompleteDeleteModal,
    setVisible: setDeleteVisible,
  } = useConfirmModal(onDelete);

  const copyToClipboard = useCallback(
    (text: string) => {
      toast.hideAll();
      Platform.OS === 'ios' && toast.show(i18n.common.copiedToClipboard);
      Clipboard.setString(text);
    },
    [toast],
  );

  const selectAccount = useCallback(
    (accAddress: string) => {
      if (currentAccountAddress !== accAddress) {
        const accountByAddress = findAccountByAddress(accounts, accAddress);

        if (accountByAddress) {
          const accountInfo = {
            address: accAddress,
          } as CurrentAccountInfo;

          saveCurrentAccountAddress(accountInfo).catch(e => {
            console.error('There is a problem when set Current Account', e);
          });
        }
      }

      if (pathName === 'TokenGroupsDetail') {
        // need 2x goBack() for going back to TokenGroups because of specific reason
        navigation.goBack();
        navigation.goBack();
      } else if (pathName === 'SendFund' || pathName === 'BuyToken') {
        navigation.navigate('Home', {
          screen: 'Main',
          params: { screen: 'Tokens', params: { screen: 'TokenGroups' } },
        });
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    },
    [currentAccountAddress, pathName, accounts, navigation],
  );

  const onShareImg = () => {
    svg.toDataURL(data => {
      const shareImageBase64 = {
        title: 'QR',
        message: `My Public Address to Receive ${selectedAddress}`,
        url: `data:image/png;base64,${data}`,
      };
      Share.share(shareImageBase64);
    });
  };

  const rightSwipeActions = useCallback(
    (address: string, index: number) => {
      return () => (
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
            paddingRight: theme.padding,
            gap: theme.paddingXS,
          }}>
          <Button
            shape={'circle'}
            style={{ backgroundColor: 'rgba(217, 163, 62, 0.1)' }}
            type={'ghost'}
            icon={<Icon phosphorIcon={Copy} size={'sm'} iconColor={theme['gold-6']} />}
            size={'xs'}
            onPress={() => {
              copyToClipboard(address);
              row.current?.[index]?.close();
            }}
          />
          <Button
            shape={'circle'}
            style={{ backgroundColor: 'rgba(0, 75, 255, 0.1)' }}
            type={'ghost'}
            icon={<Icon phosphorIcon={QrCode} size={'sm'} iconColor={theme.colorPrimary} />}
            size={'xs'}
            onPress={() => {
              row.current?.[index]?.close();
              setSelectedAddress(address);
              setQrModalVisible(true);
            }}
          />
          <Button
            shape={'circle'}
            style={{ backgroundColor: 'rgba(191, 22, 22, 0.1)' }}
            type={'ghost'}
            icon={<Icon phosphorIcon={Trash} size={'sm'} iconColor={theme.colorError} />}
            size={'xs'}
            onPress={() => {
              row.current?.[index]?.close();
              setSelectedAddress(address);
              onPressDelete();
            }}
            loading={deleting}
          />
        </View>
      );
    },
    [copyToClipboard, deleting, onPressDelete, row, theme],
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<AccountJson>) => {
      const isAllAccount = isAccountAll(item.address);

      return (
        <Swipeable
          enabled={!isAllAccount}
          ref={ref => (row.current[index] = ref)}
          friction={2}
          leftThreshold={80}
          rightThreshold={40}
          onSwipeableWillOpen={() => closeOpenedRow(index)}
          renderRightActions={rightSwipeActions(item.address, index)}>
          <SelectAccountItem
            key={item.address}
            address={item.address}
            accountName={item.name}
            isSelected={currentAccountAddress === item.address}
            isAllAccount={isAllAccount}
            onSelectAccount={selectAccount}
            onPressDetailBtn={() => {
              navigation.navigate('EditAccount', { address: item.address, name: item.name || '' });
            }}
          />
        </Swipeable>
      );
    },
    [currentAccountAddress, navigation, rightSwipeActions, selectAccount],
  );

  const onPressFooterBtn = (action: () => void) => {
    Keyboard.dismiss();
    setTimeout(action, 200);
  };

  const renderFooterComponent = () => {
    return (
      <View
        style={{
          paddingHorizontal: 16,
          ...MarginBottomForSubmitButton,
          marginTop: 16,
          flexDirection: 'row',
        }}>
        <Button
          style={{ marginRight: 12 }}
          block
          icon={<Icon phosphorIcon={PlusCircle} size={'lg'} weight={'fill'} />}
          type={'secondary'}
          externalTextStyle={{ flex: 1 }}
          onPress={() => onPressFooterBtn(() => createAccountRef?.current?.onOpenModal())}>
          {i18n.buttonTitles.createANewAcc}
        </Button>
        <Button
          style={{ marginRight: 12 }}
          icon={<Icon phosphorIcon={FileArrowDown} size={'lg'} weight={'fill'} />}
          type={'secondary'}
          onPress={() => onPressFooterBtn(() => importAccountRef?.current?.onOpenModal())}
        />
        <Button
          icon={<Icon phosphorIcon={Swatches} size={'lg'} weight={'fill'} />}
          type={'secondary'}
          onPress={() => onPressFooterBtn(() => attachAccountRef?.current?.onOpenModal())}
        />
      </View>
    );
  };

  return (
    <>
      <FlatListScreen
        style={{ flex: 1 }}
        onPressBack={() => navigation.goBack()}
        title={i18n.header.selectAccount}
        items={accounts}
        flatListStyle={{ gap: theme.paddingXS }}
        renderItem={renderItem}
        renderListEmptyComponent={renderListEmptyComponent}
        searchFunction={searchFunction}
        autoFocus={false}
        afterListItem={renderFooterComponent()}
        placeholder={i18n.placeholder.accountName}
      />

      <AccountCreationArea
        createAccountRef={createAccountRef}
        importAccountRef={importAccountRef}
        attachAccountRef={attachAccountRef}
        allowToShowSelectType={true}
      />

      <SwModal isUseModalV2 modalVisible={qrModalVisible} setVisible={setQrModalVisible}>
        <View style={receiveModalContentWrapper}>
          <Typography.Text
            size={'lg'}
            style={{
              color: theme.colorWhite,
              ...FontSemiBold,
            }}>
            {i18n.header.yourAddress}
          </Typography.Text>
          <View style={{ paddingTop: 38 }}>
            {/* @ts-ignore */}
            {selectedAddress && <QRCode qrRef={(ref?) => (svg = ref)} value={selectedAddress} errorLevel={'Q'} />}
          </View>

          <View
            style={{
              height: 48,
              flexDirection: 'row',
              backgroundColor: theme.colorBgSecondary,
              padding: theme.paddingXXS,
              paddingLeft: theme.paddingSM,
              alignItems: 'center',
              gap: theme.paddingXS,
              borderRadius: theme.borderRadiusLG,
              marginVertical: theme.margin,
            }}>
            <Avatar
              value={selectedAddress}
              size={24}
              theme={isEthereumAddress(selectedAddress) ? 'ethereum' : 'polkadot'}
            />

            <Typography.Text
              style={{
                color: theme.colorTextLight4,
                ...FontMedium,
              }}>
              {toShort(selectedAddress, 7, 7)}
            </Typography.Text>

            <Button
              icon={<Icon phosphorIcon={CopySimple} weight={'bold'} size={'sm'} iconColor={theme.colorTextLight4} />}
              type={'ghost'}
              size={'xs'}
              onPress={() => copyToClipboard(selectedAddress)}
            />
          </View>

          <View
            style={{
              marginHorizontal: -theme.size,
              paddingHorizontal: theme.size,
              gap: theme.size,
              flexDirection: 'row',
              paddingTop: theme.size,
              borderTopColor: theme.colorBgSecondary,
              borderTopWidth: 2,
              borderStyle: 'solid',
            }}>
            <Button
              style={{ flex: 1 }}
              icon={<Icon phosphorIcon={ShareIcon} weight={'fill'} size={'lg'} />}
              onPress={onShareImg}>
              {i18n.common.share}
            </Button>
          </View>
          {
            <Toast
              duration={TOAST_DURATION}
              normalColor={ColorMap.notification}
              ref={toastRef}
              placement={'bottom'}
              offsetBottom={OFFSET_BOTTOM}
            />
          }
        </View>
      </SwModal>

      <DeleteModal
        title={i18n.header.removeThisAcc}
        visible={deleteVisible}
        message={i18n.removeAccount.removeAccountMessage}
        onCancelModal={onCancelDelete}
        onCompleteModal={onCompleteDeleteModal}
        setVisible={setDeleteVisible}
      />
    </>
  );
};
