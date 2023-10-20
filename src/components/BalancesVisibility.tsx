import React from 'react';
import { StyleProp, View } from 'react-native';
import Text from '../components/Text';
import { FontSemiBold } from 'styles/sharedStyles';
import { Number } from 'components/Design';
import { SwNumberProps } from 'components/Design/Number';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';

type Props = {
  value: SwNumberProps['value'];
  symbol?: string;
  startWithSymbol?: boolean;
  subFloatNumber?: boolean;
};

const wrapperStyle: StyleProp<any> = {
  height: 46,
};

export const BalancesVisibility = ({ value, symbol, startWithSymbol = true, subFloatNumber = false }: Props) => {
  const isShowBalance = true // useSelector((state: RootState) => state.settings.isShowBalance);
  const theme = useSoulWalletTheme().swThemes;

  return (
    <View style={wrapperStyle}>
      {isShowBalance ? (
        <Number
          value={value}
          decimal={0}
          prefix={startWithSymbol ? (symbol ? symbol : '$') : undefined}
          suffix={!startWithSymbol ? (symbol ? symbol : '$') : undefined}
          size={38}
          textStyle={{ ...FontSemiBold, lineHeight: 20, paddingTop: 24 }}
          subFloatNumber={subFloatNumber}
          decimalOpacity={0.45}
        />
      ) : (
        <Text
          style={{
            ...FontSemiBold,
            fontSize: 38,
            lineHeight: 38,
            color: theme.colorTextLight1,
          }}>
          ******
        </Text>
      )}
    </View>
  );
};
