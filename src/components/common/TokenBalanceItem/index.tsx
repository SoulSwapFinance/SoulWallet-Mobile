import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { TokenBalanceItemType } from 'types/balance'
import { BN_ZERO } from 'utils/chainBalances'
import { Icon, Logo, Number, Typography } from 'components/Design'
import { DotsThree } from 'phosphor-react-native'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import TokenBalanceItemStyles from './style'
import { FontMedium, FontSemiBold } from 'styles/sharedStyles'
import BigN from 'bignumber.js'
import { SOUL_PRICE } from 'constants/prices'

interface Props extends TokenBalanceItemType, TouchableOpacityProps {
  isShowBalance?: boolean;
}

export const TokenBalanceItem = ({
  symbol,
  isTestnet,
  chainDisplayName,
  isReady,
  total,
  chain,
  isShowBalance,
  ...wrapperProps
}: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const _style = TokenBalanceItemStyles(theme);
  const isSoul = symbol === 'SOUL'
  const customValue = isSoul ? new BigN(SOUL_PRICE).times(total.value) : new BigN(0)

  return (
    <TouchableOpacity style={{ width: '100%' }} {...wrapperProps}>
      <View style={_style.chainBalanceMainArea}>
        <View style={_style.chainBalancePart1}>
          <Logo 
            size={40} token={symbol.toLowerCase()} 
            isShowSubLogo
            subNetwork={chain} 
          />
        </View>

        <View style={_style.chainBalanceMetaWrapper}>
          <Text style={_style.symbolStyle} numberOfLines={1}>
            {symbol}
          </Text>
          <Text style={_style.chainNameStyle} numberOfLines={1}>
            {chainDisplayName?.replace(' Relay Chain', '')}
          </Text>
          {/* <Text style={_style.chainNameStyle} numberOfLines={1}>
            {balanceUSD}
          </Text> */}
        </View>

        <View style={_style.chainBalancePart2Wrapper}>
          <View style={_style.chainBalancePart2}>
              <>
                <Number
                  style={{ paddingBottom: 4 }}
                  value={!isReady ? BN_ZERO : total.value}
                  decimal={0}
                  decimalOpacity={0.45}
                  size={theme.fontSizeLG}
                  textStyle={{ ...FontSemiBold, lineHeight: theme.lineHeightLG * theme.fontSizeLG }}
                />
                <Number
                  value={isTestnet || !isReady ? BN_ZERO : 
                    symbol == 'SOUL' ? customValue
                    : total.convertedValue
                    }
                  decimal={0}
                  intOpacity={0.45}
                  unitOpacity={0.45}
                  decimalOpacity={0.45}
                  prefix={'$'}
                  size={theme.fontSizeSM}
                  textStyle={{ ...FontMedium, lineHeight: theme.lineHeightSM * theme.fontSizeSM }}
                />
              </>
          </View>
          <View style={_style.iconWrapper}>
            <Icon
              type="phosphor"
              weight={'bold'}
              phosphorIcon={DotsThree}
              size={'sm'}
              iconColor={theme.colorTextLight3}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
