import { Images, SVGImages } from 'assets/index';
import { FileArrowDown, PlusCircle, Swatches } from 'phosphor-react-native';
import React, { Suspense, useCallback, useRef } from 'react';
import { ImageBackground, Platform, SafeAreaView, StatusBar, StyleProp, View } from 'react-native';
import { ColorMap } from 'styles/color';
import { FontMedium, FontSemiBold, sharedStyles, STATUS_BAR_LIGHT_CONTENT } from 'styles/sharedStyles';
import i18n from 'utils/i18n/i18n';
import Text from 'components/Text';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import AccountActionButton from 'components/Common/Account/AccountActionButton';
import { AccountCreationArea } from 'components/Common/Account/AccountCreationArea';
import { SelectedActionType } from 'stores/types';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { ModalRef } from 'types/modalRef';
import { PRIVACY_AND_POLICY_URL, TERMS_OF_SERVICE_URL } from 'constants/index';

const imageBackgroundStyle: StyleProp<any> = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingHorizontal: 16,
  // paddingBottom: Platform.OS === 'ios' ? 0 : 20,
  paddingBottom: Platform.OS === 'ios' ? 56 : 20,
  position: 'relative',
};

const logoStyle: StyleProp<any> = {
  width: '100%',
  flex: 1,
  justifyContent: 'flex-end',
  position: 'relative',
  alignItems: 'center',
  paddingBottom: 22,
};

const logoTextStyle: StyleProp<any> = {
  fontSize: 38,
  lineHeight: 46,
  ...FontSemiBold,
  color: ColorMap.light,
  paddingTop: 9,
};

const logoSubTextStyle: StyleProp<any> = {
  fontSize: 16,
  fontStyle: 'italic',
  lineHeight: 24,
  color: 'rgba(255, 255, 255, 0.65)',
  paddingTop: 12,
};

const firstScreenNotificationStyle: StyleProp<any> = {
  ...sharedStyles.smallText,
  color: 'rgba(255, 255, 255, 0.45)',
  textAlign: 'center',
  // paddingHorizontal: 4,
  paddingHorizontal: 16,
  paddingTop: 0,
  ...FontMedium,
};

export const FirstScreen = () => {
  const navigation = useNavigation<RootNavigationProps>();
  // @ts-ignore
  const hasMasterPassword = useSelector((state: RootState) => state.accountState.hasMasterPassword);
  const createAccountRef = useRef<ModalRef>();
  const importAccountRef = useRef<ModalRef>();
  const attachAccountRef = useRef<ModalRef>();
  const theme = useSoulWalletTheme().swThemes;

  const onPressActionButton = useCallback((action: SelectedActionType) => {
    return () => {
      switch (action) {
        case 'createAcc':
          createAccountRef && createAccountRef.current?.onOpenModal();
          break;
        case 'attachAcc':
          attachAccountRef && attachAccountRef.current?.onOpenModal();
          break;
        case 'importAcc':
          importAccountRef && importAccountRef.current?.onOpenModal();
          break;
      }
    };
  }, []);

  const onPressTermsCondition = () => {
    Linking.openURL(TERMS_OF_SERVICE_URL);
  };

  const onPressPolicy = () => {
    Linking.openURL(PRIVACY_AND_POLICY_URL);
  };

  const onCreate = useCallback(() => {
    if (hasMasterPassword) {
      navigation.navigate('CreateAccount', {});
    } else {
      navigation.navigate('CreatePassword', { pathName: 'CreateAccount' });
    }
  }, [hasMasterPassword, navigation]);

  const actionList = [
    {
      key: 'create',
      icon: PlusCircle,
      title: i18n.welcomeScreen.createAccLabel,
      subTitle: i18n.welcomeScreen.createAccMessage,
      onPress: onCreate,
    },
    {
      key: 'import',
      icon: FileArrowDown,
      title: i18n.welcomeScreen.importAccLabel,
      subTitle: i18n.welcomeScreen.importAccMessage,
      onPress: onPressActionButton('importAcc'),
    },
    {
      key: 'attach',
      icon: Swatches,
      title: i18n.welcomeScreen.attachAccLabel,
      subTitle: i18n.welcomeScreen.attachAccMessage,
      onPress: onPressActionButton('attachAcc'),
    },
  ];

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <StatusBar barStyle={STATUS_BAR_LIGHT_CONTENT} translucent={true} backgroundColor={'transparent'} />
      <ImageBackground source={Images.backgroundImg} resizeMode={'cover'} style={imageBackgroundStyle}>
        <SafeAreaView />
        <View style={logoStyle}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              // marginBottom: 4,
              // paddingTop: 0,
              marginBottom: 16,
              paddingTop: 40,
              alignItems: 'center',
            }}>
            <Suspense>
              <SVGImages.LogoGradient width={66} height={100} />
            </Suspense>
            <Text style={logoTextStyle}>SoulWallet</Text>
            <Text style={logoSubTextStyle}>{i18n.title.slogan}</Text>
          </View>

          <View 
            style={{ width: '100%'
            // , marginBottom: 200,
            }}
          >
            {actionList.map(item => (
              <AccountActionButton key={item.key} item={item} />
            ))}
          </View>
        </View>

        {/*// TODO: add hyperlink for T&C and Privacy Policy*/}
        <Text style={firstScreenNotificationStyle}>
          {i18n.common.firstScreenMessagePart1}
        </Text>
        <Text style={firstScreenNotificationStyle}>
          <Text onPress={onPressTermsCondition} style={{ color: theme.colorTextLight1 }}>
            {i18n.common.termAndConditions}
          </Text>
          <Text>{i18n.common.and}</Text>
          <Text onPress={onPressPolicy} style={{ color: theme.colorTextLight1 }}>
            {i18n.common.privacyPolicy}
          </Text>
        </Text>

        <AccountCreationArea
          createAccountRef={createAccountRef}
          importAccountRef={importAccountRef}
          attachAccountRef={attachAccountRef}
          allowToShowSelectType={true}
        />
        <SafeAreaView />
      </ImageBackground>
    </View>
  );
};
