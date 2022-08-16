import React, { Suspense, useState } from 'react';
import { ImageBackground, Platform, SafeAreaView, StatusBar, StyleProp, View } from 'react-native';
import { Images, SVGImages } from 'assets/index';
import Text from '../../components/Text';
import { SubmitButton } from 'components/SubmitButton';
import { ColorMap } from 'styles/color';
import { FontMedium, sharedStyles, STATUS_BAR_LIGHT_CONTENT } from 'styles/sharedStyles';
import { ArchiveTray, Article, FileArrowUp, LockKey, UserCirclePlus } from 'phosphor-react-native';
import { SelectImportAccountModal } from 'screens/SelectImportAccountModal';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps, RootStackParamList } from 'types/routes';
import i18n from 'utils/i18n/i18n';
import { AccountActionType } from 'types/ui-types';
import { EVM_ACCOUNT_TYPE, HIDE_MODAL_DURATION, SUBSTRATE_ACCOUNT_TYPE } from '../../constant';
import { SelectAccountTypeModal } from 'components/SelectAccountTypeModal';

const imageBackgroundStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingBottom: Platform.OS === 'ios' ? 42 : 20,
  position: 'relative',
};

const logoStyle: StyleProp<any> = { alignItems: 'center', justifyContent: 'center', flex: 1 };

const firstScreenNotificationStyle: StyleProp<any> = {
  ...sharedStyles.mainText,
  color: ColorMap.light,
  textAlign: 'center',
  paddingHorizontal: 42,
  paddingTop: 56,
  ...FontMedium,
};

export const FirstScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  const [importSelectModalVisible, setSelectModalVisible] = useState<boolean>(false);
  const [selectTypeModalVisible, setSelectTypeModalVisible] = useState<boolean>(false);
  const [selectedAction, setSelectedAction] = useState<keyof RootStackParamList | null>(null);
  const SECRET_TYPE: AccountActionType[] = [
    {
      icon: Article,
      title: i18n.title.importSecretPhrase,
      onCLickButton: () => {
        setSelectedAction('ImportSecretPhrase');
        setSelectModalVisible(false);
        setTimeout(() => {
          setSelectTypeModalVisible(true);
        }, HIDE_MODAL_DURATION);
      },
    },
    {
      icon: LockKey,
      title: i18n.title.importEVMPrivateKey,
      onCLickButton: () => {
        navigation.navigate('ImportPrivateKey');
        setSelectModalVisible(false);
      },
    },
    {
      icon: FileArrowUp,
      title: i18n.title.importFromJson,
      onCLickButton: () => {
        navigation.navigate('RestoreJson');
        setSelectModalVisible(false);
      },
    },
  ];

  const onSelectSubstrateAccount = () => {
    setSelectTypeModalVisible(false);
    !!selectedAction && navigation.navigate(selectedAction, { keyTypes: SUBSTRATE_ACCOUNT_TYPE });
  };

  const onSelectEvmAccount = () => {
    setSelectTypeModalVisible(false);
    !!selectedAction && navigation.navigate(selectedAction, { keyTypes: EVM_ACCOUNT_TYPE });
  };

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <StatusBar barStyle={STATUS_BAR_LIGHT_CONTENT} translucent={true} backgroundColor={'transparent'} />
      <ImageBackground source={Images.loadingScreen} resizeMode={'cover'} style={imageBackgroundStyle}>
        <SafeAreaView />
        <View style={logoStyle}>
          {
            <Suspense fallback={<View style={{ width: 230, height: 230 }} />}>
              <SVGImages.SubWallet2 width={230} height={230} />
            </Suspense>
          }
        </View>

        <SubmitButton
          leftIcon={UserCirclePlus}
          title={i18n.common.createNewWalletAccount}
          style={{ marginBottom: 16, width: '100%' }}
          onPress={() => {
            setSelectedAction('CreateAccount');
            setSelectTypeModalVisible(true);
          }}
        />

        <SubmitButton
          leftIcon={ArchiveTray}
          title={i18n.common.importExistingWallet}
          style={{ width: '100%' }}
          backgroundColor={ColorMap.primary}
          onPress={() => {
            setSelectModalVisible(true);
          }}
        />
        {/*//TODO: add hyperlink for T&C and Privacy Policy*/}
        <Text style={firstScreenNotificationStyle}>{i18n.common.firstScreenMessage}</Text>
        <SelectImportAccountModal
          modalTitle={i18n.common.selectYourImport}
          modalHeight={256}
          secretTypeList={SECRET_TYPE}
          modalVisible={importSelectModalVisible}
          onChangeModalVisible={() => setSelectModalVisible(false)}
        />

        <SelectAccountTypeModal
          modalVisible={selectTypeModalVisible}
          onChangeModalVisible={() => setSelectTypeModalVisible(false)}
          modalHeight={206}
          onSelectSubstrateAccount={onSelectSubstrateAccount}
          onSelectEvmAccount={onSelectEvmAccount}
        />
        <SafeAreaView />
      </ImageBackground>
    </View>
  );
};