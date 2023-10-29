import React, { useMemo, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import ActionButton from 'components/ActionButton';
// import i18n from 'utils/i18n/i18n';
import { CaretLeft } from 'phosphor-react-native';
import { SwNumberProps } from 'components/Design/Number';
import Number from 'components/Design/Number';
import { BalancesVisibility } from 'components/BalancesVisibility';
import { Button, Icon, Typography } from 'components/Design';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { FontSemiBold } from 'styles/sharedStyles';
// import { getAccountType } from 'utils/index';
// import { PREDEFINED_TRANSAK_TOKEN } from '../../../predefined/transak';
// import { RootState } from 'stores/index';
// import { useSelector } from 'react-redux';
import { ThemeTypes } from 'styles/themes';
import { ButtonIcon } from 'screens/Home/Crypto/shared/Button';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import { ColorMap } from 'styles/color';
// import WebView from 'react-native-webview';

interface Props {
  balanceValue: SwNumberProps['value'];
  groupSymbol: string;
  tokenGroupSlug: string;
  onClickBack: () => void;
  onOpenSendFund?: () => void;
  onOpenReceive?: () => void;
}

export const TokenGroupsDetailUpperBlock = ({
  onOpenReceive,
  onOpenSendFund,
  onClickBack,
  balanceValue,
  groupSymbol,
  tokenGroupSlug,
}: Props) => {
  const navigation = useNavigation<RootNavigationProps>();
  const theme = useSoulWalletTheme().swThemes;
  // const accounts = useSelector((state: RootState) => state.accountState.accounts);
  // const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  // const isAllAccount = useSelector((state: RootState) => state.accountState.isAllAccount);
  const _style = createStyleSheet(theme);
  // const isSupportBuyTokens = useMemo(() => {
  //   if (Platform.OS === 'ios') {
  //     return false;
  //   }
  //   const transakInfoItems = Object.values(PREDEFINED_TRANSAK_TOKEN);

  //   for (const infoItem of transakInfoItems) {
  //     if (infoItem.symbol === groupSymbol) {
  //       const supportType = infoItem.support;

  //       if (isAllAccount) {
  //         for (const account of accounts) {
  //           if (supportType === getAccountType(account.address)) {
  //             return true;
  //           }
  //         }
  //       } else {
  //         if (currentAccount?.address && supportType === getAccountType(currentAccount?.address)) {
  //           return true;
  //         }
  //       }
  //     }
  //   }

  //   return false;
  // }, [accounts, currentAccount?.address, isAllAccount, ]);

  return (
    <View style={_style.containerStyle} pointerEvents="box-none">
      <View style={_style.topArea}>
        <Button
          type="secondary"
          size="xs"
          icon={<Icon size="md" phosphorIcon={CaretLeft} iconColor={theme.colorTextLight1} />}
          onPress={onClickBack}
        />
        <View style={_style.tokenDisplay}>
          <Typography.Title level={4} style={{ color: theme.colorTextLight1, ...FontSemiBold }}>
            {/* {`${i18n.title.token}: ${groupSymbol}`} */}
            {groupSymbol}
          </Typography.Title>
        </View>
      </View>
    {/* UI NOTE: Balance Summary (token detail view) */}
      <BalancesVisibility value={balanceValue} startWithSymbol subFloatNumber />

      <View style={[_style.actionButtonWrapper]} pointerEvents="box-none">
      <ActionButton
          // label={i18n.cryptoScreen.send}
          // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/sent.png'}
          // imageSize={30}
          icon={ButtonIcon.SendFund}
          onPress={onOpenSendFund}
          buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
        />
        <ActionButton
          // label={i18n.cryptoScreen.receive}
          // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/received.png'}
          // imageSize={30}
          icon={ButtonIcon.Receive}
          onPress={onOpenReceive}
          buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
        />
        {/* {Platform.OS !== 'ios' && ( */}
          <ActionButton
            // label={i18n.cryptoScreen.buy}
            // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/purchased.png'}
            // imageSize={30}  
            icon={ButtonIcon.Buy}
            onPress={() => navigation.navigate('Drawer', { screen: 'BuyToken', params: {} })}
            buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
          />
      <ActionButton
            // label={'Swap'}
            // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/purchased.png'}
            // imageSize={30}  
            icon={ButtonIcon.Charts}
            // UI NOTE: OPEN URL IN BROWSER
            // onPress={toggleTokenView}
            onPress={ () => navigation.navigate('BrowserTabsManager', { url: `https://coingecko.com/en/coins/${'soul-swap'}?utm_source=soulswap`, name: 'SoulSwap' }) }
            // @ts-ignore
            // onPress={() => navigation.navigate('Home', { screen: 'Main', params: {screen: "NFTs", params: {} }})}
            // params: {
              //   // @ts-ignore
              //   screen: 'NFTs'})}
              buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
              />
        </View>
    </View>

  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createStyleSheet(theme: ThemeTypes) {
  return StyleSheet.create({
    actionButtonWrapper: {
      paddingTop: 24,
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
    containerStyle: {
      height: 214,
      alignItems: 'center',
      paddingBottom: 2,
      marginLeft: -8,
      marginRight: -8,
      marginBottom: 24,
    },
    topArea: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 8,
    },
    tokenDisplay: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 40,
      justifyContent: 'center',
    },
  });
}
