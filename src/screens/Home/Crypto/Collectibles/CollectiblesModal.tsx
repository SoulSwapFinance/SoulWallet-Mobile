import { NftCollection } from '@soul-wallet/extension-base/src/background/KoniTypes'
import { FlatListScreen } from 'components/FlatListScreen'
import React, { useCallback, useEffect, useRef } from 'react'
import { ListRenderItemInfo, RefreshControl, SectionListData } from 'react-native'
import NftCollectionItem from 'screens/Home/Crypto/Collectibles/Collection/NftCollectionItem'
import i18n from 'utils/i18n/i18n'
import { Plus } from 'phosphor-react-native'
import useFetchNftCollection from 'hooks/screen/Home/Nft/useFetchNftCollection'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { setAdjustPan } from 'rn-android-keyboard-adjust'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { useRefresh } from 'hooks/useRefresh'
import { reloadCron } from 'messaging/index'
import SwFullSizeModal from 'components/Design/Modal/SwFullSizeModal'
import { SWModalRefProps } from 'components/Design/Modal/ModalBaseV2'
import { NFTNavigationProps } from '.'
import { renderEmptyNFT } from '..'

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
        // setVisible(false)
        console.log('collectionName: %s', item.collectionName);
        console.log('collectionId: %s', item.collectionId);
        console.log('key: %s', key);
        navigation.navigate('CollectionList');
        // navigation.navigate('CollectionItem', { collectionId: key })
        // navigation.navigate('CollectionList', { collectionId: key })
        // handleViewCollection()
        handleClose()
      }
        // @ts-ignore
        // navigation.navigate(
        //   // 'Home', {
        //   // @ts-ignore
        //   // screen: 'Main',
        //   // params: {
        //     // @ts-ignore
        //     // screen: 'Tokens',
        //     // screen: 'NFTs',
        //     // params: {
        //       // @ts-ignore
        //       'Collection',
        //       { collectionId: key })
        // }
      // const onPress = () => {
      //   // navigation.navigate('Collection', { collectionId: key });

      // };
      // console.log('collectionName: %s', item.collectionName);
      // console.log('collectionId: %s', item.collectionId);
      // console.log('key: %s', key);
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
const handleImport = useCallback(() => {
  setVisible(false)
  navigation.navigate('ImportNft')
}, [modalBaseV2Ref, setVisible])
const handleClose = useCallback(() => {
  setVisible(false)
  // navigation.navigate('ImportNft')
}, [modalBaseV2Ref, setVisible])

const handleViewCollection = useCallback(() => {
  navigation.navigate('ImportNft')
  // navigation.navigate('Home', { screen: 'Browser' })
  setVisible(false)
}, [modalBaseV2Ref])

return (
  <SwFullSizeModal
    modalBaseV2Ref={modalBaseV2Ref}
    isUseModalV2
    setVisible={setVisible}
    modalVisible={modalVisible}
    onBackButtonPress={onCancel}>
    {modalVisible && (
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
          onPress: () => {
            // navigation.navigate('ImportNft')
            handleImport()
        }
          // () => { navigation.navigate('ImportNft'); }
          // onPress: () => {
          //   handleClose();
          // },
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
        isShowMainHeader={false}
        getItemLayout={getItemLayout}
        onPressBack={onCancel}
      />
    )}
  </SwFullSizeModal>
);
};

export default CollectiblesModal;
