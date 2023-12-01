import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { getTokenLogo } from 'utils/index';
import Text from 'components/Text';
import { ColorMap } from 'styles/color';
import { FontMedium, FontSemiBold } from 'styles/sharedStyles';
import { CheckCircle } from 'phosphor-react-native';
import { Icon, Typography } from 'components/Design';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { ThemeTypes } from 'styles/themes';

interface Props extends TouchableOpacityProps {
  symbol: string;
  name: string;
  chain: string;
  logoKey: string;
  subLogoKey?: string;
  isSelected: boolean;
  onSelectNetwork: () => void;
  defaultItemKey?: string;
  iconSize?: number;
}
const itemArea: StyleProp<any> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 14,
  alignItems: 'center',
  paddingHorizontal: 12,
  backgroundColor: '#1A1A1A',
  marginHorizontal: 16,
  marginBottom: 8,
  borderRadius: 8,
};

const itemBodyArea: StyleProp<any> = {
  flexDirection: 'row',
  alignItems: 'center',
};

const itemTextStyle: StyleProp<any> = {
  paddingLeft: 8,
  color: ColorMap.light,
  fontSize: 16,
  lineHeight: 24,
  ...FontSemiBold,
};

const subTextStyle: StyleProp<any> = {
  paddingLeft: 8,
  color: 'rgba(255, 255, 255, 0.45)',
  fontSize: 12,
  lineHeight: 20,
  ...FontMedium,
};

export const TokenSelectItem = ({
  symbol,
  name,
  chain,
  logoKey,
  subLogoKey,
  isSelected,
  onSelectNetwork,
  defaultItemKey,
  iconSize = 40,
}: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const styles = useMemo(() => createStyle(theme), [theme]);

  return (
    <TouchableOpacity onPress={onSelectNetwork}>
      <View style={itemArea}>
        <View style={itemBodyArea}>
          {getTokenLogo(logoKey, subLogoKey, iconSize, defaultItemKey)}
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Typography.Text style={itemTextStyle} ellipsis>
                {symbol}
              </Typography.Text>
              <Typography.Text style={subTextStyle} ellipsis>{`(${name})`}</Typography.Text>
            </View>

            <Text style={styles.subTextStyle}>{chain}</Text>
          </View>
        </View>

        {isSelected && (
          <View 
          // style={styles.selectedIconWrapper}
            style={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: -theme.marginXS,
            }}
          >
            <Icon phosphorIcon={CheckCircle} weight={'fill'} size={'sm'} iconColor={theme.colorSuccess} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

function createStyle(theme: ThemeTypes) {
  return StyleSheet.create({
    itemArea: {
      flexDirection: 'row',
      flex: 1,
      // justifyContent: 'space-between',
      paddingVertical: theme.paddingSM + 2,
      alignItems: 'center',
      paddingHorizontal: theme.paddingSM,
      backgroundColor: theme.colorBgSecondary,
      marginHorizontal: theme.padding,
      marginBottom: theme.marginXS,
      borderRadius: theme.borderRadiusLG,
    },

    itemBodyArea: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },

    itemTextStyle: {
      paddingLeft: theme.marginXS,
      color: ColorMap.light,
      fontSize: theme.fontSizeLG,
      lineHeight: theme.fontSizeLG * theme.lineHeightLG,
      ...FontSemiBold,
    },

    itemTokenNameStyle: {
      paddingLeft: theme.paddingXXS,
      color: theme.colorTextTertiary,
      fontSize: theme.fontSizeLG,
      lineHeight: theme.fontSizeLG * theme.lineHeightLG,
      flex: 1,
      ...FontSemiBold,
    },

    subTextStyle: {
      paddingLeft: theme.paddingXS,
      color: theme.colorTextTertiary,
      fontSize: theme.fontSizeSM,
      lineHeight: theme.fontSizeSM * theme.lineHeightSM,
      ...FontMedium,
    },
    selectedIconWrapper: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: -theme.marginXS,
    },
  });
}
