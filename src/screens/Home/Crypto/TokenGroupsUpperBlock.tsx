import React from 'react'
import { StyleProp, View } from 'react-native'
import ActionButton from 'components/ActionButton'
import i18n from 'utils/i18n/i18n'
import { SwNumberProps } from 'components/Design/Number'
import { BalancesVisibility } from 'components/BalancesVisibility'
import { Number, Typography } from 'components/Design'
import { FontMedium } from 'styles/sharedStyles'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { ButtonIcon } from 'screens/Home/Crypto/shared/Button'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from 'routes/index'
import { ColorMap } from 'styles/color'
// import { toggleBalancesVisibility } from 'messaging/index'
// import { updateToggleBalance } from 'stores/base/Settings'

interface Props {
  totalValue: SwNumberProps['value']
  totalChangeValue: SwNumberProps['value']
  totalChangePercent: SwNumberProps['value']
  isPriceDecrease: boolean
  onOpenSendFund?: () => void
  onOpenReceive?: () => void
  openSelectAccount?: () => void
}

const actionButtonWrapper: StyleProp<any> = {
  paddingTop: 24,
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'center',
  paddingBottom: 25,
};

const containerStyle: StyleProp<any> = {
  height: 238,
  paddingHorizontal: 16,
  paddingTop: 32,
  alignItems: 'center',
  marginTop: 12,
  paddingBottom: 2,
  marginBottom: 4,
  borderLeftWidth: 8,
  borderRightWidth: 8,
  borderRadius: 12,
  borderColor: '#9854FF',
};

export const TokenGroupsUpperBlock = ({
  isPriceDecrease,
  onOpenReceive,
  onOpenSendFund,
  openSelectAccount,
  totalChangeValue,
  totalValue,
}: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const navigation = useNavigation<RootNavigationProps>();

  return (
    <View style={containerStyle} pointerEvents="box-none">
        <BalancesVisibility value={totalValue} startWithSymbol subFloatNumber />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, height: 40 }}>
            <Number
              size={theme.fontSize}
              textStyle={{
                ...FontMedium,
                color: isPriceDecrease ? "#fc6d6d" : '#00ff91',
                lineHeight: theme.fontSize * theme.lineHeight,
                paddingBottom: theme.paddingXXS / 2,
              }}
              decimal={0}
              value={totalChangeValue}
              prefix={isPriceDecrease ? '- $' : '+ $'}
            />
              <Typography.Text
                style={{
                  ...FontMedium,
                  lineHeight: 18,
                  fontSize: theme.fontSize,
                  color: theme.colorTextLight1,
                  marginLeft: 4,
                }}
                
                >
                {'Today'}
              </Typography.Text>
        </View>

      <View style={[actionButtonWrapper]} pointerEvents="box-none">
        <ActionButton
          label={i18n.cryptoScreen.send}
          // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/sent.png'}
          // imageSize={30}
          icon={ButtonIcon.SendFund}
          onPress={onOpenSendFund}
          buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
        />
        <ActionButton
          label={i18n.cryptoScreen.receive}
          // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/received.png'}
          // imageSize={30}
          icon={ButtonIcon.Receive}
          onPress={onOpenReceive}
          buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
        />
        {/* {Platform.OS !== 'ios' && ( */}
          <ActionButton
            label={i18n.cryptoScreen.buy}
            // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/purchased.png'}
            // imageSize={30}  
            icon={ButtonIcon.Buy}
            onPress={() => navigation.navigate('Drawer', { screen: 'BuyToken', params: {} })}
            buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
          />
        {/* )} */}
          <ActionButton
            label={'Swap'}
            // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/purchased.png'}
            // imageSize={30}  
            icon={ButtonIcon.Swap}
            // UI NOTE: OPEN URL IN BROWSER
            onPress={() => navigation.navigate('BrowserTabsManager', { url: 'https://meta.soulswap.finance', name: 'SoulSwap' })}
            buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
          />
      </View>
    </View>
  );
};
