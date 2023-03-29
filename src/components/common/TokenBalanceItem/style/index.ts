import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { ThemeTypes } from 'styles/themes';
import { FontMedium, FontSemiBold } from 'styles/sharedStyles';
import { ColorMap } from 'styles/color';

export interface TokenBalanceItemStyles {
  chainBalanceMainArea: ViewStyle;
  chainBalancePart1: ViewStyle;
  symbolStyle: TextStyle;
  chainNameStyle: TextStyle;
  chainBalanceMetaWrapper: ViewStyle;
  chainBalancePart2: ViewStyle;
  chainBalancePart2Wrapper: ViewStyle;
}

export default (theme: ThemeTypes) =>
  StyleSheet.create<TokenBalanceItemStyles>({
    chainBalanceMainArea: {
      flexDirection: 'row',
      width: '100%',
      overflow: 'hidden',
      height: 68,
      alignItems: 'center',
    },
    chainBalancePart1: {
      justifyContent: 'center',
      paddingLeft: theme.paddingSM,
    },
    chainBalanceMetaWrapper: {
      flex: 1,
      paddingLeft: theme.paddingXS,
      overflow: 'hidden',
    },
    symbolStyle: {
      fontSize: theme.fontSizeLG,
      lineHeight: theme.fontSizeLG * theme.lineHeightLG,
      ...FontSemiBold,
      color: ColorMap.light,
      overflow: 'hidden',
    },
    chainNameStyle: {
      fontSize: theme.fontSize,
      lineHeight: theme.fontSize * theme.lineHeight,
      ...FontMedium,
      color: theme.colorTextLight4,
      overflow: 'hidden',
    },
    chainBalancePart2: {
      alignItems: 'flex-end',
      paddingRight: 10,
      paddingLeft: theme.sizeXXS,
    },
    chainBalancePart2Wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: theme.size - 2,
    },
  });
