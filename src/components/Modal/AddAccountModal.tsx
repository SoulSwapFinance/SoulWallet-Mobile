import { useNavigation } from '@react-navigation/native';
import { ImageLogosMap } from 'assets/logo';
import { SubWalletModal } from 'components/Modal/Base/SubWalletModal';
import { SelectAccountTypeModal } from 'components/Modal/SelectAccountTypeModal';
import QrAddressScanner from 'components/Scanner/QrAddressScanner';
import { SecretTypeItem } from 'components/SecretTypeItem';
import { EVM_ACCOUNT_TYPE, HIDE_MODAL_DURATION, SUBSTRATE_ACCOUNT_TYPE } from 'constants/index';
import { SCAN_TYPE } from 'constants/qr';
import useModalScanner from 'hooks/scanner/useModalScanner';
import { Article, Eye, FileArrowUp, HardDrives, LockKey, QrCode } from 'phosphor-react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { RESULTS } from 'react-native-permissions';
import ToastContainer from 'react-native-toast-notifications';
import { RootNavigationProps } from 'routes/index';
import { ColorMap } from 'styles/color';
import { FontBold, FontMedium, sharedStyles } from 'styles/sharedStyles';
import { QrAccount } from 'types/account/qr';
import { AccountActionGroup } from 'types/ui-types';
import i18n from 'utils/i18n/i18n';
import { requestCameraPermission } from 'utils/validators';
import Text from '../Text';

interface Props {
  modalVisible: boolean;
  onHideModal: () => void;
}

const ContainerStyle: StyleProp<ViewStyle> = {
  width: '100%',
};

const ModalTitleStyle: StyleProp<TextStyle> = {
  ...sharedStyles.mediumText,
  ...FontBold,
  color: ColorMap.light,
  paddingBottom: 16,
  textAlign: 'center',
};

const LogoAccountTypeStyle: StyleProp<ImageStyle> = {
  width: 20,
  height: 20,
  borderRadius: 10,
};

const GroupContainerStyle: StyleProp<ViewStyle> = {
  marginVertical: 8,
};

const TitleGroupStyle: StyleProp<TextStyle> = {
  ...sharedStyles.mainText,
  ...FontMedium,
  color: ColorMap.disabled,
};

const AddAccountModal = ({ modalVisible, onHideModal: onHideMainModal }: Props) => {
  const navigation = useNavigation<RootNavigationProps>();

  const toastRef = useRef<ToastContainer>(null);

  const [selectTypeModalVisible, setSelectTypeModalVisible] = useState<boolean>(false);
  const [scanType, setScanType] = useState<SCAN_TYPE.QR_SIGNER | SCAN_TYPE.SECRET>(SCAN_TYPE.SECRET);

  const show = useCallback((text: string) => {
    if (toastRef.current) {
      // @ts-ignore
      toastRef.current.hideAll();
      // @ts-ignore
      toastRef.current.show(text);
    }
  }, []);

  const scanSuccess = useCallback(
    (data: QrAccount) => {
      switch (scanType) {
        case SCAN_TYPE.QR_SIGNER:
          navigation.navigate('AttachAccount', {
            screen: 'AttachQrSignerConfirm',
            params: data,
          });
          break;
        case SCAN_TYPE.SECRET:
          navigation.navigate('AttachAccount', {
            screen: 'ImportAccountQrConfirm',
            params: data,
          });
          break;
        default:
          break;
      }
    },
    [navigation, scanType],
  );

  const { onOpenModal, onScan, isScanning, onHideModal } = useModalScanner(scanSuccess);

  const onSelectSubstrateAccount = useCallback(() => {
    setSelectTypeModalVisible(false);
    navigation.navigate('ImportSecretPhrase', { keyTypes: SUBSTRATE_ACCOUNT_TYPE });
  }, [navigation]);

  const onSelectEvmAccount = useCallback(() => {
    setSelectTypeModalVisible(false);
    navigation.navigate('ImportSecretPhrase', { keyTypes: EVM_ACCOUNT_TYPE });
  }, [navigation]);

  const actionGroups = useMemo(
    (): AccountActionGroup[] => [
      {
        key: 'createNewAccount',
        title: i18n.title.createNewAccount,
        items: [
          {
            icon: () => <Image source={ImageLogosMap.polkadot} style={LogoAccountTypeStyle} />,
            title: 'Substrate Account',
            onCLickButton: () => {
              onHideMainModal();
              navigation.navigate('CreateAccount', { keyTypes: SUBSTRATE_ACCOUNT_TYPE });
            },
          },
          {
            icon: () => <Image source={ImageLogosMap.eth} style={LogoAccountTypeStyle} />,
            title: 'EVM Account',
            onCLickButton: () => {
              onHideMainModal();
              navigation.navigate('CreateAccount', { keyTypes: EVM_ACCOUNT_TYPE });
            },
          },
        ],
      },
      {
        key: 'importAccount',
        title: i18n.title.importAccount,
        items: [
          {
            icon: Article,
            title: i18n.title.importBySecretPhrase,
            onCLickButton: () => {
              onHideMainModal();
              setTimeout(() => {
                setSelectTypeModalVisible(true);
              }, HIDE_MODAL_DURATION);
            },
          },
          {
            icon: LockKey,
            title: i18n.title.importByPrivateKey,
            onCLickButton: () => {
              navigation.navigate('ImportPrivateKey');
              onHideMainModal();
            },
          },
          {
            icon: FileArrowUp,
            title: i18n.title.importFromJson,
            onCLickButton: () => {
              navigation.navigate('RestoreJson');
              onHideMainModal();
            },
          },
          {
            icon: QrCode,
            title: i18n.title.importByQrCode,
            onCLickButton: async () => {
              const result = await requestCameraPermission();

              if (result === RESULTS.GRANTED) {
                onHideMainModal();
                setScanType(SCAN_TYPE.SECRET);
                setTimeout(() => {
                  onOpenModal();
                }, HIDE_MODAL_DURATION);
              }
            },
          },
        ],
      },
      {
        key: 'attachAccount',
        title: i18n.title.attachAccount,
        items: [
          {
            icon: Eye,
            title: i18n.title.attachReadonlyAccount,
            onCLickButton: () => {
              navigation.navigate('AttachAccount', {
                screen: 'AttachReadOnly',
              });
              onHideMainModal();
            },
          },
          {
            icon: QrCode,
            title: i18n.title.attachQRSignerAccount,
            onCLickButton: async () => {
              const result = await requestCameraPermission();

              if (result === RESULTS.GRANTED) {
                onHideMainModal();
                setScanType(SCAN_TYPE.QR_SIGNER);
                setTimeout(() => {
                  onOpenModal();
                }, HIDE_MODAL_DURATION);
              }
            },
          },
          {
            icon: HardDrives,
            title: i18n.title.connectLedgerDevice,
            onCLickButton: () => {
              show(i18n.common.comingSoon);
            },
          },
        ],
      },
    ],
    [navigation, onHideMainModal, onOpenModal, show],
  );

  const onHideSelectTypeModal = useCallback(() => {
    setSelectTypeModalVisible(false);
  }, []);

  return (
    <>
      <SubWalletModal modalVisible={modalVisible} onModalHide={onHideMainModal} onChangeModalVisible={onHideMainModal}>
        <View style={ContainerStyle}>
          <Text style={ModalTitleStyle}>{i18n.title.addAccount}</Text>
          {actionGroups.map(({ key, items, title }) => {
            return (
              <View style={GroupContainerStyle} key={key}>
                <Text style={TitleGroupStyle}>{title}</Text>
                {items.map(item => {
                  return (
                    <SecretTypeItem
                      key={item.title}
                      title={item.title}
                      icon={item.icon}
                      onClickButton={item.onCLickButton}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </SubWalletModal>
      <SelectAccountTypeModal
        modalVisible={selectTypeModalVisible}
        onChangeModalVisible={onHideSelectTypeModal}
        onSelectSubstrateAccount={onSelectSubstrateAccount}
        onSelectEvmAccount={onSelectEvmAccount}
      />
      <QrAddressScanner visible={isScanning} onHideModal={onHideModal} onSuccess={onScan} type={scanType} />
    </>
  );
};

export default React.memo(AddAccountModal);
