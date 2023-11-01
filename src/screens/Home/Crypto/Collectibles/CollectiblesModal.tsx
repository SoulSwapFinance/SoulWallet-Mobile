// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { ListRenderItemInfo } from 'react-native';
// import { NetworkAndTokenToggleItem } from 'components/NetworkAndTokenToggleItem';
// import i18n from 'utils/i18n/i18n';
// import { FlatListScreen } from 'components/FlatListScreen';
// import useChainInfoWithState, { ChainInfoWithState } from 'hooks/chain/useChainInfoWithState';
// import { updateChainActiveState } from 'messaging/index';
// import { FlatListScreenPaddingTop, FontSemiBold } from 'styles/sharedStyles';
// import { useSelector } from 'react-redux';
// import { RootState } from 'stores/index';
// import { updateShowZeroBalanceState } from 'stores/utils';
// import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
// import { EmptyList } from 'components/EmptyList';
// import { MagnifyingGlass, Wallet } from 'phosphor-react-native';
// import { ToggleItem } from 'components/ToggleItem';
// import { SwFullSizeModal, Typography } from 'components/Design';
// import { SWModalRefProps } from 'components/Design/Modal/ModalBaseV2';
//   // import NFTStackScreen from 'screens/Home/NFT/NFTStackScreen'
//   import NftCollectionList from 'screens/Home/NFT/Collection/NftCollectionList';
//   import NftItemList from 'screens/Home/NFT/Item/NftItemList';
//   import NftDetail from 'screens/Home/NFT/Detail/NftDetail';
//   import { RootStackParamList } from 'routes/index';
//   import { Image } from 'phosphor-react-native';
//   import withPageWrapper from 'components/PageWrapper';
// import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NftCollection } from '@soul-wallet/extension-base/src/background/KoniTypes';
// // import NFTStackScreen from '../NFT/NFTStackScreen';

// interface Props {
//   modalVisible: boolean;
//   setVisible: (arg: boolean) => void;
// }

// let chainKeys: Array<string> | undefined;

// let cachePendingChainMap: Record<string, boolean> = {};

// const searchFunction = (items: ChainInfoWithState[], searchString: string) => {
//   return items.filter(network => network.name.toLowerCase().includes(searchString.toLowerCase()));
// };

// const processChainMap = (
//   chainInfoMap: Record<string, ChainInfoWithState>,
//   pendingKeys = Object.keys(cachePendingChainMap),
//   updateKeys = false,
// ): ChainInfoWithState[] => {
//   if (!chainKeys || updateKeys) {
//     chainKeys = Object.keys(chainInfoMap)
//       .filter(key => Object.keys(chainInfoMap[key].providers).length > 0)
//       .sort((a, b) => {
//         const aActive = pendingKeys.includes(a) ? cachePendingChainMap[a] : chainInfoMap[a].active;
//         const bActive = pendingKeys.includes(b) ? cachePendingChainMap[b] : chainInfoMap[b].active;

//         if (aActive === bActive) {
//           return 0;
//         } else if (aActive) {
//           return -1;
//         } else {
//           return 1;
//         }
//       });
//   }

//   return chainKeys.map(key => chainInfoMap[key]);
// };

// export type NFTStackParamList = {
//   CollectionList: undefined;
//   Collection: { collectionId: string };
//   NftDetail: { collectionId: string; nftId: string };
// };
// export type NavigationProps = NativeStackScreenProps<NFTStackParamList & RootStackParamList>;
// export type NFTNavigationProps = NavigationProps['navigation'];
// export type NFTCollectionProps = NativeStackScreenProps<NFTStackParamList, 'Collection'>;
// export type NFTDetailProps = NativeStackScreenProps<NFTStackParamList, 'NftDetail'>;

// export const renderEmptyNFT = () => {
//   return <EmptyList title={i18n.emptyScreen.nftEmptyTitle} icon={Image} message={i18n.emptyScreen.nftEmptyMessage} />;
// };

// export const CollectiblesModal = ({ modalVisible, setVisible }: Props) => {
//   const NFTStack = createNativeStackNavigator<NFTStackParamList>();

//   const theme = useSoulWalletTheme().swThemes;
//   const isShowZeroBalance = useSelector((state: RootState) => state.settings.isShowZeroBalance);
//   const chainInfoMap = useChainInfoWithState();
//   const [pendingChainMap, setPendingChainMap] = useState<Record<string, boolean>>(cachePendingChainMap);
//   const [currentChainList, setCurrentChainList] = useState(processChainMap(chainInfoMap));
//   const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
//   const modalBaseV2Ref = useRef<SWModalRefProps>(null);

//   const onCancel = () => modalBaseV2Ref?.current?.close();

//   useEffect(() => {
//     let timeout: NodeJS.Timeout;
//     if (modalVisible) {
//       timeout = setTimeout(() => setIsLoadingData(false), 100);
//     } else {
//       timeout = setTimeout(() => setIsLoadingData(true), 100);
//     }
//     return () => clearTimeout(timeout);
//   }, [modalVisible]);
//   useEffect(() => {
//     setPendingChainMap(prevPendingChainMap => {
//       Object.entries(prevPendingChainMap).forEach(([key, val]) => {
//         if (chainInfoMap[key].active === val) {
//           // @ts-ignore
//           delete prevPendingChainMap[key];
//         }
//       });

//       return { ...prevPendingChainMap };
//     });
//   }, [chainInfoMap]);

//   useEffect(() => {
//     setCurrentChainList(processChainMap(chainInfoMap, Object.keys(pendingChainMap)));
//   }, [chainInfoMap, pendingChainMap]);

//   useEffect(() => {
//     cachePendingChainMap = pendingChainMap;
//   }, [pendingChainMap]);

//   const onToggleItem = (item: ChainInfoWithState) => {
//     setPendingChainMap({ ...pendingChainMap, [item.slug]: !item.active });
//     const reject = () => {
//       console.warn('Toggle network request failed.');
//       // @ts-ignore
//       delete pendingNetworkMap[item.key];
//       setPendingChainMap({ ...pendingChainMap });
//     };

//     updateChainActiveState(item.slug, !item.active)
//       .then(result => {
//         if (!result) {
//           reject();
//         }
//       })
//       .catch(reject);
//   };

//   const renderItem = ({ item }: ListRenderItemInfo<ChainInfoWithState>) => {
//     return (
//       <NetworkAndTokenToggleItem
//         isDisableSwitching={
//           item.slug === 'polkadot' || item.slug === 'kusama' || Object.keys(pendingChainMap).includes(item.slug)
//         }
//         key={`${item.slug}-${item.name}`}
//         itemName={item.name}
//         itemKey={item.slug}
//         connectionStatus={item.connectionStatus}
//         style={{ paddingRight: theme.sizeXS }}
//         // @ts-ignore
//         isEnabled={
//           Object.keys(pendingChainMap).includes(item.slug) ? pendingChainMap[item.slug] : chainInfoMap[item.slug].active
//         }
//         onValueChange={() => onToggleItem(item)}
//       />
//     );
//   };

//   const renderListEmptyComponent = () => {
//     return (
//       <EmptyList
//         icon={MagnifyingGlass}
//         title={i18n.emptyScreen.networkSettingsTitle}
//         message={i18n.emptyScreen.networkSettingsMessage}
//       />
//     );
//   };

//   const onChangeZeroBalance = useCallback(() => {
//     updateShowZeroBalanceState(!isShowZeroBalance);
//   }, [isShowZeroBalance]);

//   const beforeList = useMemo(() => {
//     return (
//       <>
//         <Typography.Text
//           style={{
//             fontSize: theme.fontSizeSM,
//             lineHeight: theme.fontSizeSM * theme.lineHeightSM,
//             color: theme.colorTextLight3,
//             ...FontSemiBold,
//             paddingLeft: 16,
//             paddingTop: 8,
//             paddingBottom: 8,
//           }}>
//           {i18n.customization.balance}
//         </Typography.Text>
//         <ToggleItem
//           backgroundIcon={Wallet}
//           backgroundIconColor={theme['green-7']}
//           style={{ marginHorizontal: 16 }}
//           label={i18n.customization.showZeroBalance}
//           isEnabled={isShowZeroBalance}
//           onValueChange={onChangeZeroBalance}
//         />
//         <Typography.Text
//           style={{
//             fontSize: theme.fontSizeSM,
//             lineHeight: theme.fontSizeSM * theme.lineHeightSM,
//             color: theme.colorTextLight3,
//             ...FontSemiBold,
//             paddingLeft: 16,
//           }}>
//           {i18n.customization.networks}
//         </Typography.Text>
//       </>
//     );
//   }, [isShowZeroBalance, onChangeZeroBalance, theme]);

//   // NFT //
//   const filteredCollection = (items: NftCollection[], searchString: string) => {
//     return items.filter(collection => {
//       return collection.collectionName && collection.collectionName.toLowerCase().includes(searchString.toLowerCase());
//     });
//   }

//   return (
//     <SwFullSizeModal
//       modalBaseV2Ref={modalBaseV2Ref}
//       isUseModalV2
//       setVisible={setVisible}
//       modalVisible={modalVisible}
//       onBackButtonPress={onCancel}>
//        <FlatListScreen
//         autoFocus={false}
//         showLeftBtn={false}
//         title={i18n.header.yourCollections}
//         titleTextAlign={'left'}
//         renderItem={renderItem}
//         renderListEmptyComponent={renderEmptyNFT}
//         searchFunction={filteredCollection}
//         items={nftCollections}
//         placeholder={i18n.placeholder.searchCollectionName}
//         flatListStyle={{ flex: 1 }}
//         rightIconOption={{
//           icon: Plus,
//           onPress: () => {
//             navigation.navigate('ImportNft');
//           },
//         }}
//         refreshControl={
//           <RefreshControl
//             style={{ backgroundColor: theme.colorBgDefault }}
//             tintColor={theme.colorWhite}
//             refreshing={isRefresh}
//             onRefresh={() => refresh(reloadCron({ data: 'nft' }))}
//           />
//         }
//         androidKeyboardVerticalOffset={0}
//         numberColumns={2}
//         searchMarginBottom={16}
//         isShowMainHeader
//         getItemLayout={getItemLayout}
//       />
//       {/* <FlatListScreen
//         beforeListItem={beforeList}
//         items={currentChainList}
//         isShowFilterBtn={false}
//         style={FlatListScreenPaddingTop}
//         title={i18n.header.customizeAssetDisplay}
//         searchFunction={searchFunction}
//         renderItem={renderItem}
//         onPressBack={onCancel}
//         renderListEmptyComponent={renderListEmptyComponent}
//         isLoadingData={isLoadingData}
//         isShowListWrapper
//         placeholder={i18n.placeholder.networkName}
//       /> */}
//     </SwFullSizeModal>
//   );
// };
import { NftCollection } from '@soul-wallet/extension-base/src/background/KoniTypes';
import { FlatListScreen } from 'components/FlatListScreen';
import React, { useCallback, useEffect, useRef } from 'react';
import { ListRenderItemInfo, RefreshControl, SectionListData } from 'react-native';
import NftCollectionItem from 'screens/Home/NFT/Collection/NftCollectionItem';
import i18n from 'utils/i18n/i18n';
import { Plus } from 'phosphor-react-native';
import useFetchNftCollection from 'hooks/screen/Home/Nft/useFetchNftCollection';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NFTNavigationProps, renderEmptyNFT } from 'screens/Home/NFT/NFTStackScreen';
import { setAdjustPan } from 'rn-android-keyboard-adjust';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { useRefresh } from 'hooks/useRefresh';
import { reloadCron } from 'messaging/index';
import SwFullSizeModal from 'components/Design/Modal/SwFullSizeModal';
import { SWModalRefProps } from 'components/Design/Modal/ModalBaseV2';

type GetItemLayoutType =
  | readonly NftCollection[]
  | SectionListData<NftCollection, SectionListData<NftCollection>>[]
  | null
  | undefined;
const filteredCollection = (items: NftCollection[], searchString: string) => {
  return items.filter(collection => {
    return collection.collectionName && collection.collectionName.toLowerCase().includes(searchString.toLowerCase());
  });
};
const ITEM_HEIGHT = 220;
const ITEM_SEPARATOR = 16;
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + ITEM_SEPARATOR;

interface Props {
  modalVisible: boolean;
  setVisible: (arg: boolean) => void;
}

export const CollectiblesModal = ({ modalVisible, setVisible }: Props) => {
  const theme = useSoulWalletTheme().swThemes;
  const { nftCollections } = useFetchNftCollection();
  const navigation = useNavigation<NFTNavigationProps>();
  const [isRefresh, refresh] = useRefresh();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setAdjustPan();
    }
  }, [isFocused]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NftCollection>) => {
      const key = `${item.collectionName}-${item.collectionId}`;
      const onPress = () => {
        navigation.navigate('Collection', { collectionId: key });
      };

      return <NftCollectionItem key={key} nftCollection={item} onPress={onPress} />;
    },
    [navigation],
  );

  const getItemLayout = (data: GetItemLayoutType, index: number) => ({
    index,
    length: TOTAL_ITEM_HEIGHT,
    offset: TOTAL_ITEM_HEIGHT * index,
  });
    const modalBaseV2Ref = useRef<SWModalRefProps>(null);

  const onCancel = () => modalBaseV2Ref?.current?.close();
  const handleClose = useCallback(() => {
    setVisible(false)
    navigation.navigate('ImportNft')
  }, [modalBaseV2Ref, setVisible])

  return (
    <SwFullSizeModal
      modalBaseV2Ref={modalBaseV2Ref}
      isUseModalV2
      setVisible={setVisible}
      modalVisible={modalVisible}
      onBackButtonPress={onCancel}>
    { modalVisible  && (
      <FlatListScreen
        autoFocus={false}
        showLeftBtn={false}
        title={i18n.header.yourCollections}
        titleTextAlign={'left'}
        renderItem={renderItem}
        renderListEmptyComponent={renderEmptyNFT}
        searchFunction={filteredCollection}
        items={nftCollections}
        placeholder={i18n.placeholder.searchCollectionName}
        flatListStyle={{ flex: 1 }}
        rightIconOption={{
          icon: Plus,
          // () => { navigation.navigate('ImportNft'); }
          onPress: () => {
           handleClose();
          },
        }}
        refreshControl={
          <RefreshControl
            style={{ backgroundColor: theme.colorBgDefault }}
            tintColor={theme.colorWhite}
            refreshing={isRefresh}
            onRefresh={() => refresh(reloadCron({ data: 'nft' }))}
          />
        }
        androidKeyboardVerticalOffset={0}
        numberColumns={2}
        searchMarginBottom={16}
        isShowMainHeader ={false}
        getItemLayout={getItemLayout}
        onPressBack={onCancel}
      />
      )}
    </SwFullSizeModal>
  );
};

export default CollectiblesModal;
