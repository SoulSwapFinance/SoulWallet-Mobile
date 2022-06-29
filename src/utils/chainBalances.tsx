import { AccountInfoItem, BalanceInfo, BalanceSubInfo } from '../types';
import { NetworkJson, TokenInfo } from '@subwallet/extension-base/background/KoniTypes';
import BigN from 'bignumber.js';
import { isEmptyArray } from 'utils/index';

export const BN_TEN = new BigN(10);
export const BN_ZERO = new BigN(0);

type BalanceType = {
  balance: string;
  price?: number;
  decimals: number;
  symbol: string;
};

type BalanceWithDecimalsProps = {
  balance: string;
  decimals: number;
};

const getBalanceWithDecimals = ({ balance, decimals }: BalanceWithDecimalsProps) => {
  return new BigN(balance).div(BN_TEN.pow(decimals));
};

const getConvertedBalance = (balance: BigN, price: string) =>
  balance && price ? balance.multipliedBy(new BigN(price)) : BN_ZERO;

export type BalanceValueType = {
  balanceValue: BigN;
  convertedBalanceValue: BigN;
  symbol: string;
};

export const getBalances = ({ balance, decimals, price, symbol }: BalanceType): BalanceValueType => {
  const stable = symbol.toLowerCase().includes('usd') ? 1 : 0;

  const balanceValue = getBalanceWithDecimals({ balance, decimals });

  const priceValue = price || stable;

  const convertedBalanceValue = getConvertedBalance(balanceValue, `${priceValue}`);

  return {
    balanceValue,
    convertedBalanceValue,
    symbol,
  };
};

function getTokenPrice(tokenPriceMap: Record<string, number>, token: string): number {
  if (token === 'LCDOT') {
    return (tokenPriceMap.dot || 0) * 0.6925;
  }

  return tokenPriceMap[token.toLowerCase()] || 0;
}

export const parseBalancesInfo = (
  priceMap: Record<string, number>,
  tokenPriceMap: Record<string, number>,
  balanceInfo: AccountInfoItem,
  tokenMap: Record<string, TokenInfo>,
  networkJson: NetworkJson,
): BalanceInfo => {
  const { balanceItem, networkKey, tokenDecimals, tokenSymbols } = balanceInfo;

  const decimals = tokenDecimals && !isEmptyArray(tokenDecimals) ? tokenDecimals[0] : 0;
  const symbol = tokenSymbols && !isEmptyArray(tokenSymbols) ? tokenSymbols[0] : '';

  const {
    children: balanceChildren,
    feeFrozen: frozenFee,
    free: freeBalance,
    miscFrozen: frozenMisc,
    reserved: reservedBalance,
  } = balanceItem;
  const transferableBalance = new BigN(freeBalance).minus(new BigN(frozenMisc)).toString();

  const accountData = [
    { key: 'free', label: 'Transferable', value: transferableBalance },
    { key: 'reserved', label: 'Reserved balance', value: reservedBalance },
    { key: 'locked', label: 'Locked balance', value: frozenMisc },
    { key: 'frozen', label: 'Frozen fee', value: frozenFee },
  ];

  const detailBalances: BalanceSubInfo[] = [];

  let totalBalanceValue = BN_ZERO;
  let totalConvertedBalanceValue = BN_ZERO;

  accountData.forEach(({ key, label, value }) => {
    const { balanceValue, convertedBalanceValue } = getBalances({
      balance: value,
      decimals,
      symbol,
      price: priceMap[networkJson.coinGeckoKey || networkKey],
    });

    if (['free', 'reserved', 'locked'].includes(key)) {
      totalBalanceValue = totalBalanceValue.plus(balanceValue);
      totalConvertedBalanceValue = totalConvertedBalanceValue.plus(convertedBalanceValue);
    }

    detailBalances.push({
      key,
      label,
      symbol,
      convertedBalanceValue,
      balanceValue,
    });
  });

  const childrenBalances: BalanceSubInfo[] = [];

  if (balanceChildren) {
    Object.keys(balanceChildren).forEach(token => {
      const item = balanceChildren[token];
      const _token: string = tokenMap[token]?.symbolAlt || token;

      const { balanceValue, convertedBalanceValue } = getBalances({
        balance: item.free,
        decimals: item.decimals,
        symbol: _token,
        price: getTokenPrice(tokenPriceMap, token),
      });

      childrenBalances.push({
        key: _token,
        label: '',
        symbol: _token,
        convertedBalanceValue,
        balanceValue,
      });
    });
  }

  return {
    symbol,
    balanceValue: totalBalanceValue,
    convertedBalanceValue: totalConvertedBalanceValue,
    detailBalances,
    childrenBalances,
  };
};