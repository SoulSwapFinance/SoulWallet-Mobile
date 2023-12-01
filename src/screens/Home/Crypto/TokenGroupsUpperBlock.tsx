import React from 'react'
import { StyleProp, View, TouchableOpacity } from 'react-native'
import ActionButton from 'components/ActionButton'
import i18n from 'utils/i18n/i18n'
// import { Eye, EyeSlash } from 'phosphor-react-native'
import { SwNumberProps } from 'components/Design/Number'
import { BalancesVisibility } from 'components/BalancesVisibility'
import { Icon, Number, Tag, Typography } from 'components/Design'
import { FontBold, FontMedium } from 'styles/sharedStyles'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/index'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { toggleBalancesVisibility } from 'messaging/index'
import { ButtonIcon } from 'screens/Home/Crypto/shared/Button'
import { updateToggleBalance } from 'stores/base/Settings'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from 'routes/index'
import { useShowBuyToken } from 'hooks/static-content/useShowBuyToken'
import { ColorMap } from 'styles/color'

interface Props {
  totalValue: SwNumberProps['value'];
  totalChangeValue: SwNumberProps['value'];
  totalChangePercent: SwNumberProps['value'];
  isPriceDecrease: boolean;
  onOpenSendFund?: () => void;
  onOpenReceive?: () => void;
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
  marginTop: -2,
  paddingBottom: 2,
  marginBottom: -2,
};

export const TokenGroupsUpperBlock = ({
  isPriceDecrease,
  onOpenReceive,
  onOpenSendFund,
  // totalChangePercent,
  totalChangeValue,
  totalValue,
}: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const navigation = useNavigation<RootNavigationProps>();
  // const isShowBalance = useSelector((state: RootState) => state.settings.isShowBalance);
  // const { isShowBuyToken } = useShowBuyToken();
  const _toggleBalances = () => {
    updateToggleBalance();
    toggleBalancesVisibility().catch(console.log);
  };

  return (
    <View style={containerStyle} pointerEvents="box-none">
    <BalancesVisibility value={
      totalValue
      // new BigN(totalValue).plus(customValue)
    } startWithSymbol subFloatNumber />
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
        label={'Explore'}
        // image={'https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/icons/purchased.png'}
        // imageSize={30}  
        // icon={ButtonIcon.Swap}
        icon={ButtonIcon.Explore}
        // UI NOTE: OPEN URL IN BROWSER
        onPress={() => navigation.navigate('BrowserTabsManager', { url: 'https://links.soulswap.finance', name: 'SoulSwap' })}
        // @ts-ignore
        // onPress={() => navigation.navigate('Home', { screen: 'Main', params: {screen: "NFTs", params: {} }})}
          // params: {
          //   // @ts-ignore
          //   screen: 'NFTs'})}
        buttonWrapperStyle={{ borderRadius: 32, paddingHorizontal: 1, paddingVertical: 1, backgroundColor: ColorMap.backgroundSecondary, marginLeft: 12, marginRight: 12 }}
      />
  </View>
</View>

    // <View style={containerStyle} pointerEvents="box-none">
    //   <TouchableOpacity style={{ alignItems: 'center' }} onPress={_toggleBalances}>
    //     <BalancesVisibility value={totalValue} startWithSymbol subFloatNumber />

    //     <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3, height: 40 }}>
    //       <View style={{ marginRight: 8 }}>
    //         <Icon
    //           size="md"
    //           phosphorIcon={isShowBalance ? Eye : EyeSlash}
    //           iconColor={theme.colorTextLight3}
    //           weight={'bold'}
    //         />
    //       </View>
    //       {isShowBalance && (
    //         <Number
    //           size={theme.fontSize}
    //           textStyle={{
    //             ...FontMedium,
    //             lineHeight: theme.fontSize * theme.lineHeight,
    //             paddingBottom: theme.paddingXXS / 2,
    //           }}
    //           decimal={0}
    //           value={totalChangeValue}
    //           prefix={isPriceDecrease ? '- $' : '+ $'}
    //         />
    //       )}

    //       {!isShowBalance && (
    //         <Typography.Text
    //           style={{
    //             fontSize: theme.fontSize,
    //             lineHeight: theme.fontSize * theme.lineHeight,
    //             ...FontMedium,
    //             color: theme.colorTextLight1,
    //           }}>
    //           {'******'}
    //         </Typography.Text>
    //       )}

    //       <Tag
    //         style={{ marginLeft: 8, height: 22 }}
    //         color={isPriceDecrease ? 'error' : 'success'}
    //         shape={'round'}
    //         closable={false}>
    //         <>
    //           {isShowBalance && (
    //             <Number
    //               textStyle={{ ...FontBold, lineHeight: 18 }}
    //               size={10}
    //               value={totalChangePercent}
    //               decimal={0}
    //               prefix={isPriceDecrease ? '- ' : '+ '}
    //               suffix={'%'}
    //             />
    //           )}

    //           {!isShowBalance && (
    //             <Typography.Text
    //               style={{
    //                 ...FontMedium,
    //                 lineHeight: 18,
    //                 fontSize: 10,
    //                 color: theme.colorTextLight1,
    //               }}>
    //               {'******'}
    //             </Typography.Text>
    //           )}
    //         </>
    //       </Tag>
    //     </View>
    //   </TouchableOpacity>

    //   <View style={[actionButtonWrapper]} pointerEvents="box-none">
    //     <ActionButton
    //       label={i18n.cryptoScreen.receive}
    //       icon={ButtonIcon.Receive}
    //       onPress={onOpenReceive}
    //       buttonWrapperStyle={{ paddingHorizontal: theme.paddingSM }}
    //     />
    //     <ActionButton
    //       label={i18n.cryptoScreen.send}
    //       icon={ButtonIcon.SendFund}
    //       onPress={onOpenSendFund}
    //       buttonWrapperStyle={{ paddingHorizontal: theme.paddingSM }}
    //     />
    //     {isShowBuyToken && (
    //       <ActionButton
    //         label={i18n.cryptoScreen.buy}
    //         icon={ButtonIcon.Buy}
    //         onPress={() => navigation.navigate('Drawer', { screen: 'BuyToken', params: {} })}
    //         buttonWrapperStyle={{ paddingHorizontal: theme.paddingSM }}
    //       />
    //     )}
    //   </View>
    // </View>
  );
};
