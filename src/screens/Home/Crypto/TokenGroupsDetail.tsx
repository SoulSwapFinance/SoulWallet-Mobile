import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ListRenderItemInfo, View } from 'react-native'
import { CryptoNavigationProps, TokenGroupsDetailProps } from 'routes/home'
// import { SwNumberProps } from 'components/Design/Number'
import { TokenBalanceItemType } from 'types/balance'
import { GradientBackgroundColorSet, ScreenContainer } from 'components/ScreenContainer'
import { Header } from 'components/Header'
import { TokensLayout } from 'screens/Home/Crypto/shared/TokensLayout'
import { itemWrapperStyle } from 'screens/Home/Crypto/layers/shared'
import { TokenBalanceItem } from 'components/Common/TokenBalanceItem'
import { TokenGroupsDetailUpperBlock } from 'screens/Home/Crypto/TokenGroupsDetailUpperBlock'
import { useNavigation } from '@react-navigation/native'
import { TokenDetailModal } from 'screens/Home/Crypto/TokenDetailModal'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import useReceiveQR from 'hooks/screen/Home/Crypto/useReceiveQR'
import { ReceiveModal } from 'screens/Home/Crypto/ReceiveModal'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/index'
import { useGetChainSlugs } from 'hooks/screen/Home/useGetChainSlugs'
// import useTokenGroup from 'hooks/screen/hooks/useTokenGroup'
// import useAccountBalance from 'hooks/screen/hooks/useAccountBalance'
import { useToast } from 'react-native-toast-notifications'
import i18n from 'utils/i18n/i18n'
import { SelectAccAndTokenModal } from 'screens/Home/Crypto/shared/SelectAccAndTokenModal'
// import WebView from 'react-native-webview'
import { _getAssetPriceId } from '@soul-wallet/extension-base/src/services/chain-service/utils'
import PriceChart from 'components/Chart/PriceChart'
import { SwNumberProps } from 'components/Design/Number'
import useTokenGroup from 'hooks/screen/useTokenGroup'
import useAccountBalance from 'hooks/screen/useAccountBalance'

type CurrentSelectToken = {
  symbol: string;
  slug: string;
  priceId: string;
  address: string;
};

export const TokenGroupsDetail = ({
  route: {
    params: { slug: tokenGroupSlug },
  },
}: TokenGroupsDetailProps) => {
  const theme = useSoulWalletTheme().swThemes;
  const navigation = useNavigation<CryptoNavigationProps>();
  const [currentTokenInfo, setCurrentTokenInfo] = useState<CurrentSelectToken | undefined>(undefined);
  const [tokenDetailVisible, setTokenDetailVisible] = useState<boolean>(false);
  const assetRegistryMap = useSelector((root: RootState) => root.assetRegistry.assetRegistry);
  const multiChainAssetMap = useSelector((state: RootState) => state.assetRegistry.multiChainAssetMap);

  const groupPriceId = useMemo<string>(() => {
    let priceId = '';
    if (tokenGroupSlug) {
      if (multiChainAssetMap[tokenGroupSlug]) {
        priceId = multiChainAssetMap[tokenGroupSlug].priceId ?? '';
      }

      if (assetRegistryMap[tokenGroupSlug]) {
        assetRegistryMap[tokenGroupSlug].symbol == "SOUL" ? priceId = 'soul-swap' 
          : priceId = assetRegistryMap[tokenGroupSlug].priceId ?? 
        '';
      }
    }

    return priceId;
  }, [tokenGroupSlug, assetRegistryMap, multiChainAssetMap])
  const groupSymbol = useMemo<string>(() => {
    if (tokenGroupSlug) {
      if (multiChainAssetMap[tokenGroupSlug]) {
        return multiChainAssetMap[tokenGroupSlug].symbol;
      }

      if (assetRegistryMap[tokenGroupSlug]) {
        return assetRegistryMap[tokenGroupSlug].symbol;
      }
    }

    return '';
  }, [tokenGroupSlug, assetRegistryMap, multiChainAssetMap]);
  
  const groupNetwork = useMemo<string>(() => {
    let address = ''
    if (tokenGroupSlug) {
      if (multiChainAssetMap[tokenGroupSlug]) {
        address =  multiChainAssetMap[tokenGroupSlug].originChainAsset
      }

      if (assetRegistryMap[tokenGroupSlug]) {
        address = assetRegistryMap[tokenGroupSlug].originChain;
      }
    }

    return address;
  }, [tokenGroupSlug, assetRegistryMap, multiChainAssetMap]);
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);

  const {
    accountSelectorItems,
    onOpenReceive,
    openSelectAccount,
    openSelectToken,
    selectedAccount,
    selectedNetwork,
    setQrModalVisible,
    isQrModalVisible,
    tokenSelectorItems,
    accountRef,
    tokenRef,
    selectedAccountMap,
  } = useReceiveQR(tokenGroupSlug);

  const toast = useToast();

  const isShowBalance = true //useSelector((state: RootState) => state.settings.isShowBalance);

  const chainsByAccountType = useGetChainSlugs();
  const { tokenGroupMap, isComputing: isTokenGroupComputing } = useTokenGroup(chainsByAccountType, true);
  const {
    tokenBalanceMap,
    tokenGroupBalanceMap,
    isComputing: isAccountBalanceComputing,
  } = useAccountBalance(tokenGroupMap, true);

  const tokenBalanceValue = useMemo<SwNumberProps['value']>(() => {
    if (tokenGroupSlug) {
      if (tokenGroupBalanceMap[tokenGroupSlug]) {
        return tokenGroupBalanceMap[tokenGroupSlug].total.value;
      }

      if (tokenBalanceMap[tokenGroupSlug]) {
        return tokenBalanceMap[tokenGroupSlug].total.value;
      }
    }

    return '0';
  }, [tokenGroupSlug, tokenBalanceMap, tokenGroupBalanceMap]);
  
  const tokenBalanceUSD = useMemo<SwNumberProps['value']>(() => {
    if (tokenGroupSlug) {
      if (tokenGroupBalanceMap[tokenGroupSlug]) {
        return tokenGroupBalanceMap[tokenGroupSlug].total.convertedValue;
      }

      if (tokenBalanceMap[tokenGroupSlug]) {
        return tokenBalanceMap[tokenGroupSlug].total.convertedValue;
      }
    }

    return '0';
  }, [tokenGroupSlug, tokenBalanceMap, tokenGroupBalanceMap]);

  const tokenBalanceItems = useMemo<TokenBalanceItemType[]>(() => {
    if (tokenGroupSlug) {
      if (tokenGroupMap[tokenGroupSlug]) {
        const items: TokenBalanceItemType[] = [];

        tokenGroupMap[tokenGroupSlug].forEach(tokenSlug => {
          if (tokenBalanceMap[tokenSlug]) {
            items.push(tokenBalanceMap[tokenSlug]);
          }
        });

        return (
          items
            // @ts-ignore
            .sort((firstItem, secondItem) => secondItem.total.convertedValue - firstItem.total.convertedValue)
        );
      }

      if (tokenBalanceMap[tokenGroupSlug]) {
        return [tokenBalanceMap[tokenGroupSlug]];
      }
    }

    return [] as TokenBalanceItemType[];
  }, [tokenGroupSlug, tokenGroupMap, tokenBalanceMap]);

  const onClickItem = useCallback((item: TokenBalanceItemType) => {
    return () => {
      setCurrentTokenInfo({
        slug: item.slug,
        symbol: item.symbol,
        priceId: groupPriceId,
        address: groupNetwork
      });
      setTokenDetailVisible(true);
    };
  }, []);

  const onClickBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const showNoti = useCallback(
    (text: string) => {
      toast.hideAll();
      toast.show(text, { textStyle: { textAlign: 'center' }, type: 'normal' });
    },
    [toast],
  );

  const _onOpenSendFund = useCallback(() => {
    if (currentAccount && currentAccount.isReadOnly) {
      showNoti(i18n.notificationMessage.watchOnlyNoti);
      return;
    }

    navigation.navigate('Drawer', {
      screen: 'TransactionAction',
      params: { screen: 'SendFund', params: { slug: tokenGroupSlug } },
    });
  }, [currentAccount, navigation, showNoti, tokenGroupSlug]);

  // UI NOTE: total balance for selected token group.
  const listHeaderNode = useMemo(() => {
    return (
      <TokenGroupsDetailUpperBlock
        onOpenReceive={onOpenReceive}
        onOpenSendFund={_onOpenSendFund}
        balanceValue={tokenBalanceValue}
        balanceUSD={tokenBalanceUSD}
        groupPriceId={groupPriceId}
        onClickBack={onClickBack}
        groupSymbol={groupSymbol}
        tokenGroupSlug={tokenGroupSlug}
      />
    );
  }, [onOpenReceive, _onOpenSendFund, tokenBalanceValue, onClickBack, groupSymbol, groupNetwork, tokenGroupSlug]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TokenBalanceItemType>) => (
      <View key={item.slug} style={[itemWrapperStyle, { backgroundColor: theme.colorBgSecondary }]}>
        {/* UI NOTE: Token Group Item (show logo, symbol, network, balance, balanceUSD) */}
        <TokenBalanceItem onPress={onClickItem(item)} {...item} isShowBalance={isShowBalance} />
      </View>
    ),
    [isShowBalance, onClickItem, theme.colorBgSecondary],
  );

  useEffect(() => {
    if (!isTokenGroupComputing && !isAccountBalanceComputing && !tokenBalanceItems.length) {
      navigation.navigate('Home', {screen: 'Main', params: {screen: 'Tokens', params: {screen: 'TokenGroups'}}});
        // 'Home', { 
        //   screen: 'Main', 
        // }
        // 'Home', { screen: 'Tokens', params: { screen: 'TokenGroups' } });
    }
  }, [isAccountBalanceComputing, isTokenGroupComputing, navigation, tokenBalanceItems]);

  return (
    <ScreenContainer gradientBackground={GradientBackgroundColorSet[2]}>
      <>
        <Header />

        <TokensLayout
          loading={isTokenGroupComputing || isAccountBalanceComputing}
          items={tokenBalanceItems}
          layoutHeader={listHeaderNode}
          renderItem={renderItem}
        />

        <TokenDetailModal
          currentTokenInfo={currentTokenInfo}
          tokenBalanceMap={tokenBalanceMap}
          modalVisible={tokenDetailVisible}
          setVisible={setTokenDetailVisible}
        />

        <SelectAccAndTokenModal
          accountRef={accountRef}
          tokenRef={tokenRef}
          accountItems={accountSelectorItems}
          tokenItems={tokenSelectorItems}
          openSelectAccount={openSelectAccount}
          openSelectToken={openSelectToken}
          selectedValueMap={selectedAccountMap}
        />

        <ReceiveModal
          modalVisible={isQrModalVisible}
          address={selectedAccount}
          selectedNetwork={selectedNetwork}
          setModalVisible={setQrModalVisible}
        />

        <PriceChart 
          groupSymbol={groupSymbol}
          // networkId={groupNetwork ?? 'ethereum'}
        />
      </>
    </ScreenContainer>
  );
};
