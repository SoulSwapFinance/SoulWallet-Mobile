import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { TokenBalanceItemType } from 'types/balance';
import { Icon, Logo, Number, Typography } from 'components/Design';
import { CaretRight } from 'phosphor-react-native';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import TokenGroupBalanceItemStyles from './style';
import { FontMedium, FontSemiBold } from 'styles/sharedStyles';

interface Props extends TokenBalanceItemType, TouchableOpacityProps {
  isShowBalance?: boolean;
}

// UI NOTE: Shows account balance.
export const TokenGroupBalanceItem = ({
  symbol,
  isTestnet,
  priceValue,
  total,
  priceChangeStatus,
  isShowBalance,
  ...wrapperProps
}: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const _style = TokenGroupBalanceItemStyles(theme);
  const isTotalBalanceDecrease = priceChangeStatus === 'decrease';

  return (
    <TouchableOpacity style={{ width: '100%' }} {...wrapperProps}>
      <View style={_style.chainBalanceMainArea}>
        <View style={_style.chainBalancePart1}>
          <Logo size={40} token={symbol.toLowerCase()} />
        </View>

        <View style={_style.chainBalanceMetaWrapper}>
          <Text style={_style.textStyle} numberOfLines={1}>
            {symbol}
          </Text>

          <Number
            value={isTestnet ? 0 : priceValue}
            decimal={0}
            prefix={'$'}
            intColor={isTotalBalanceDecrease ? theme.colorError : theme.colorSuccess}
            decimalColor={isTotalBalanceDecrease ? theme.colorError : theme.colorSuccess}
            unitColor={isTotalBalanceDecrease ? theme.colorError : theme.colorSuccess}
            size={theme.fontSizeSM}
            textStyle={{ ...FontMedium, lineHeight: theme.lineHeightSM * theme.fontSizeSM }}
          />
        </View>

      {/* UI-NOTE: Shows balances (top: currency, bottom: usd) */}
        <View style={_style.chainBalancePart2Wrapper}>
          <View style={_style.chainBalancePart2}>
              <>
                <Number
                  value={total.value}
                  decimal={0}
                  decimalOpacity={0.666}
                  size={theme.fontSizeLG}
                  textStyle={{ ...FontSemiBold, lineHeight: theme.lineHeightLG * theme.fontSizeLG }}
                  suffix={symbol}
                />
                <Number
                  value={total.convertedValue}
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
            <Icon type="phosphor" phosphorIcon={CaretRight} size={'sm'} iconColor={theme.colorTextLight3} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
