import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { TokenBalanceItemType } from 'types/balance';
import { BN_ZERO } from 'utils/chainBalances';
import { Icon, Logo, Number, Typography } from 'components/design-system-ui';
import { CaretRight } from 'phosphor-react-native';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import TokenGroupBalanceItemStyles from './style';
import { FontMedium, FontSemiBold } from 'styles/sharedStyles';

interface Props extends TokenBalanceItemType, TouchableOpacityProps {
  isShowBalance?: boolean;
}

export const TokenGroupBalanceItem = ({
  symbol,
  isTestnet,
  priceValue,
  isReady,
  total,
  priceChangeStatus,
  isShowBalance,
  ...wrapperProps
}: Props) => {
  const theme = useSubWalletTheme().swThemes;
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
            size={theme.fontSize}
            textStyle={{ ...FontMedium, lineHeight: theme.lineHeight * theme.fontSize }}
          />
        </View>

        <View style={_style.chainBalancePart2Wrapper}>
          <View style={_style.chainBalancePart2}>
            {isShowBalance && (
              <>
                <Number
                  value={!isReady ? BN_ZERO : total.value}
                  decimal={0}
                  decimalOpacity={0.45}
                  size={theme.fontSizeLG}
                  textStyle={{ ...FontSemiBold, lineHeight: theme.lineHeightLG * theme.fontSizeLG }}
                />
                <Number
                  value={isTestnet || !isReady ? BN_ZERO : total.convertedValue}
                  decimal={0}
                  intOpacity={0.45}
                  unitOpacity={0.45}
                  decimalOpacity={0.45}
                  prefix={'$'}
                  size={theme.fontSize}
                  textStyle={{ ...FontMedium, lineHeight: theme.lineHeight * theme.fontSize }}
                />
              </>
            )}

            {!isShowBalance && (
              <>
                <Typography.Text
                  style={{
                    fontSize: theme.fontSizeLG,
                    ...FontSemiBold,
                    lineHeight: theme.lineHeightLG * theme.fontSizeLG,
                    color: theme.colorTextLight1,
                  }}>
                  ******
                </Typography.Text>
                <Typography.Text style={{ ...FontMedium, color: theme.colorTextLight4 }}>******</Typography.Text>
              </>
            )}
          </View>
          <Icon type="phosphor" phosphorIcon={CaretRight} size={'sm'} iconColor={theme.colorTextLight3} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
