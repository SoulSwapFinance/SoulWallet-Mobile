import React, { useMemo, useRef, useState } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import ActionButton from 'components/ActionButton'
// import i18n from 'utils/i18n/i18n'
import { CaretLeft } from 'phosphor-react-native'
import { SwNumberProps } from 'components/Design/Number'
// import Number from 'components/Design/Number'
import { BalancesVisibility } from 'components/BalancesVisibility'
import { Button, Icon, Typography } from 'components/Design'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { FontSemiBold } from 'styles/sharedStyles'
// import { getAccountType } from 'utils/index'
// import { PREDEFINED_TRANSAK_TOKEN } from '../../../predefined/transak'
// import { RootState } from 'stores/index'
// import { useSelector } from 'react-redux'
import { ThemeTypes } from 'styles/themes'
import { ButtonIcon } from 'screens/Home/Crypto/shared/Button'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from 'routes/index'
import { ColorMap } from 'styles/color'
// import useTokenBalanceKeyPriceMap from 'hooks/screen/hooks/useTokenBalanceKeyPriceMap'
// import useTokenGroup from 'hooks/screen/hooks/useTokenGroup'
// import { useSelector } from 'react-redux'
// import useGetNetworkJson from 'hooks/screen/hooks/useGetNetworkJson'
// import useShowedNetworks from 'hooks/screen/hooks/useShowedNetworks'
// import { RootState } from 'stores/index'
// import WebView from 'react-native-webview'
import BigN from 'bignumber.js'
import Text from 'components/Text'
import { _getAssetPriceId } from '@soul-wallet/extension-base/src/services/chain-service/utils'
import { getPrice } from 'constants/prices'

interface Props {
  balanceValue: SwNumberProps['value'];
  balanceUSD: SwNumberProps['value'];
  groupSymbol: string;
  groupPriceId: string;
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
  balanceUSD,
  groupSymbol,
  groupPriceId,
  tokenGroupSlug,
}: Props) => {
  const navigation = useNavigation<RootNavigationProps>();
  const theme = useSoulWalletTheme().swThemes;
  // console.log('tokenSlug: %s', tokenGroupSlug);
  // console.log('groupSymbol: %s', groupSymbol);
  const _style = createStyleSheet(theme)
  const balance = new BigN(balanceValue)
  const tokenPrice = 
    balanceUSD.toString() == '0' ?
    new BigN(getPrice(groupSymbol))
      : new BigN(balanceUSD).div(balance)

    // isSoul ? new BigN(getPrice('SOUL')) : new BigN(balanceUSD).div(balance)
  const USDValue = balanceUSD.toString() == '0' ? tokenPrice.times(balance) : balanceUSD
  // isSoul ? tokenPrice.times(balance) : balanceUSD

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
      <BalancesVisibility value={USDValue} startWithSymbol subFloatNumber />
      {/* <Number value={balanceValue} subFloatNumber decimal={0} /> */}
      <Text
        style={{
          color: theme.colorTextLight1,
          fontSize: 12,
          marginTop: 4,
          ...FontSemiBold,
        }}
      >
        {`${balance.toFixed(4)} ${groupSymbol}`}
      </Text>

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
          // label={'Charts'}
          // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/purchased.png'}
          // imageSize={30}  
          icon={ButtonIcon.Charts}
          // UI NOTE: OPEN URL IN BROWSER
          // onPress={toggleTokenView}
          onPress={() => navigation.navigate('BrowserTabsManager', { url: `https://coingecko.com/en/coins/${groupPriceId ?? 'soul-swap'}?utm_source=soulswap`, name: 'SoulSwap' })}
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
