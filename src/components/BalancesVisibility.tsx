import React, {useState} from 'react';
import { StyleProp, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import { BalanceVal } from 'components/BalanceVal';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { toggleBalancesVisibility } from '../messaging';
import { sharedStyles } from 'styles/sharedStyles';
import BigN from 'bignumber.js';
import { ColorMap } from 'styles/color';

type Props = {
  value: BigN;
  symbol: string;
  startWithSymbol?: boolean;
};

const wrapperStyle: StyleProp<any> = {
  height: 51,
};

const textStyle: StyleProp<any> = {
  ...sharedStyles.largeText,
  color: ColorMap.light,
};

export const BalancesVisibility = ({ value, symbol, startWithSymbol = true }: Props) => {
  const {
    settings: { isShowBalance },
  } = useSelector((state: RootState) => state);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const _toggleBalances = async () => {
    setDisabled(true);
    await toggleBalancesVisibility(v => {
      console.log('Balances visible:', v.isShowBalance);
    });
    setDisabled(false);
  };

  return (
    <TouchableOpacity onPress={() => _toggleBalances()} style={wrapperStyle} disabled={isDisabled}>
      {isShowBalance ? (
        <BalanceVal value={value} startWithSymbol={startWithSymbol} symbol={symbol} />
      ) : (
        <Text style={textStyle}>******</Text>
      )}
    </TouchableOpacity>
  );
};
