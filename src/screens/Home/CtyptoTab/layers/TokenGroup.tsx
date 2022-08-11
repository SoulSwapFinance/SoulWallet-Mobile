import { ScreenContainer } from 'components/ScreenContainer';
import React, { useState } from 'react';
import { Header } from 'components/Header';
import { SubHeader } from 'components/SubHeader';
import { ColorMap } from 'styles/color';
import { MagnifyingGlass } from 'phosphor-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/routes';
import * as Tabs from 'react-native-collapsible-tab-view';
import { isItemAllowedToShow, renderTabBar } from 'screens/Home/CtyptoTab/layers/shared';
import { TokensTab } from 'screens/Home/CtyptoTab/tabs/TokensTab';
import { ChainsTab } from 'screens/Home/CtyptoTab/tabs/ChainsTab';
import { AccountInfoByNetwork, AccountType, TokenBalanceItemType } from 'types/ui-types';
import BigN from 'bignumber.js';
import { BalanceInfo } from '../../../../types';
import { ListRenderItemInfo } from 'react-native';
import { TokenChainBalance } from 'components/TokenChainBalance';
import TabsContainerHeader from 'screens/Home/CtyptoTab/TabsContainerHeader';
import { BN_ZERO, getTokenDisplayName } from 'utils/chainBalances';
import useTokenBalanceItems from 'hooks/screen/Home/CtyptoTab/layers/TokenGroup/useTokenBalanceItems';
import { useRefresh } from 'hooks/useRefresh';

interface Prop {
  isShowZeroBalance?: boolean;
  accountType: AccountType;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  onPressSearchButton: () => void;
  accountInfoByNetworkMap: Record<string, AccountInfoByNetwork>;
  onPressChainItem: (info: AccountInfoByNetwork, balanceInfo: BalanceInfo) => void;
  tokenGroupMap: Record<string, string[]>;
  tokenBalanceKeyPriceMap: Record<string, number>;
  tokenBalanceMap: Record<string, TokenBalanceItemType>;
  showedNetworks: string[];
  networkBalanceMap: Record<string, BalanceInfo>;
  handleChangeTokenItem: (tokenSymbol: string, tokenDisplayName: string, info?: AccountInfoByNetwork) => void;
  totalBalanceValue: BigN;
}

const prioritizedNetworkKeys = ['kusama', 'polkadot'];

function getTokenGroupDisplayName(tgKey: string) {
  const [symbol] = tgKey.split('|');
  return getTokenDisplayName(symbol.toUpperCase());
}

function getBalanceValue(
  isGroupDetail: boolean,
  currentTgKey: string,
  totalBalanceValue: BigN,
  tokenGroupMap: Record<string, string[]>,
  tokenBalanceMap: Record<string, TokenBalanceItemType>,
): BigN {
  if (!isGroupDetail) {
    return totalBalanceValue;
  }

  if (currentTgKey && tokenGroupMap[currentTgKey]) {
    let result = new BigN(0);

    tokenGroupMap[currentTgKey].forEach(tbKey => {
      if (tokenBalanceMap[tbKey] && tokenBalanceMap[tbKey].isReady) {
        result = result.plus(tokenBalanceMap[tbKey].convertedBalanceValue);
      }
    });

    return result;
  }

  return BN_ZERO;
}

function getChainTabsNetworkKeys(
  isGroupDetail: boolean,
  tokenBalanceItems: TokenBalanceItemType[],
  showedNetworks: string[],
  accountType: AccountType,
  isShowZeroBalance?: boolean,
): string[] {
  if (!isGroupDetail) {
    return showedNetworks;
  }

  const networkKeys: string[] = [];

  tokenBalanceItems.forEach(item => {
    if (!isItemAllowedToShow(item, accountType, isShowZeroBalance)) {
      return;
    }

    if (!networkKeys.includes(item.networkKey)) {
      networkKeys.push(item.networkKey);
    }
  });

  const result: string[] = networkKeys.filter(k => !prioritizedNetworkKeys.includes(k)).sort();

  prioritizedNetworkKeys.forEach(pk => {
    if (networkKeys.includes(pk)) {
      result.unshift(pk);
    }
  });

  return result;
}

const TokenGroupLayer = ({
  accountType,
  navigation,
  onPressSearchButton,
  accountInfoByNetworkMap,
  onPressChainItem,
  tokenGroupMap,
  tokenBalanceKeyPriceMap,
  tokenBalanceMap,
  showedNetworks,
  networkBalanceMap,
  handleChangeTokenItem,
  totalBalanceValue,
  isShowZeroBalance,
}: Prop) => {
  const [isRefresh, refresh] = useRefresh();
  const [currentTgKey, setCurrentTgKey] = useState<string>('');
  const [isGroupDetail, setGroupDetail] = useState<boolean>(false);
  const [refreshTabId, setRefreshTabId] = useState<string>('');
  const onPressBack = () => {
    setCurrentTgKey('');
    setGroupDetail(false);
  };
  const tokenBalanceItems = useTokenBalanceItems(
    isGroupDetail,
    currentTgKey,
    tokenGroupMap,
    tokenBalanceMap,
    tokenBalanceKeyPriceMap,
  );
  const chainTabsNetworkKeys = getChainTabsNetworkKeys(
    isGroupDetail,
    tokenBalanceItems,
    showedNetworks,
    accountType,
    isShowZeroBalance,
  );

  const onPressTokenItem = (item: TokenBalanceItemType, info?: AccountInfoByNetwork) => {
    if (isGroupDetail) {
      handleChangeTokenItem(item.symbol, item.displayedSymbol, info);
    } else {
      setCurrentTgKey(item.id);
      setGroupDetail(true);
    }
  };

  const renderTokenTabItem = ({ item }: ListRenderItemInfo<TokenBalanceItemType>) => {
    const info = accountInfoByNetworkMap[item.networkKey];

    if (!isItemAllowedToShow(item, accountType, isShowZeroBalance)) {
      return null;
    }

    return <TokenChainBalance key={item.id} onPress={() => onPressTokenItem(item, info)} {...item} />;
  };

  const renderTabContainerHeader = () => {
    return (
      <TabsContainerHeader
        balanceBlockProps={{
          balanceValue: getBalanceValue(isGroupDetail, currentTgKey, totalBalanceValue, tokenGroupMap, tokenBalanceMap),
        }}
      />
    );
  };

  const _onRefresh = (tabId: string) => {
    setRefreshTabId(tabId);
    refresh();
  };

  return (
    <ScreenContainer>
      <>
        {!isGroupDetail && <Header navigation={navigation} onPressSearchButton={onPressSearchButton} />}
        {isGroupDetail && (
          <SubHeader
            showRightBtn
            backgroundColor={ColorMap.dark2}
            rightIcon={MagnifyingGlass}
            onPressRightIcon={onPressSearchButton}
            onPressBack={onPressBack}
            title={getTokenGroupDisplayName(currentTgKey)}
          />
        )}

        <Tabs.Container
          lazy
          containerStyle={{ backgroundColor: ColorMap.dark2 }}
          allowHeaderOverscroll={true}
          renderTabBar={renderTabBar}
          renderHeader={renderTabContainerHeader}>
          <Tabs.Tab name={'one'} label={'Token'}>
            <TokensTab
              items={tokenBalanceItems}
              renderItem={renderTokenTabItem}
              isRefresh={isRefresh}
              refresh={_onRefresh}
              refreshTabId={refreshTabId}
            />
          </Tabs.Tab>
          <Tabs.Tab name={'two'} label={'Chain'}>
            <ChainsTab
              isShowZeroBalance={isShowZeroBalance}
              onPressChainItem={onPressChainItem}
              networkKeys={chainTabsNetworkKeys}
              networkBalanceMap={networkBalanceMap}
              accountInfoByNetworkMap={accountInfoByNetworkMap}
              isRefresh={isRefresh}
              refresh={_onRefresh}
              refreshTabId={refreshTabId}
            />
          </Tabs.Tab>
        </Tabs.Container>
      </>
    </ScreenContainer>
  );
};

export default TokenGroupLayer;
