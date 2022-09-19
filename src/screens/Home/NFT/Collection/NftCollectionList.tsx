import { NftCollection } from '@subwallet/extension-base/background/KoniTypes';
import { FlatListScreen } from 'components/FlatListScreen';
import React, { useCallback } from 'react';
import { ListRenderItemInfo, Platform, SafeAreaView, StyleProp, View } from 'react-native';
import NftCollectionItem from 'screens/Home/NFT/Collection/NftCollectionItem';
import { EmptyList } from 'screens/Home/NFT/Shared/EmptyList';
import { NftScreenActionParams, NftScreenActionType } from 'reducers/nftScreen';

interface Props {
  dispatchNftState: React.Dispatch<NftScreenActionParams>;
  nftCollections: NftCollection[];
}

const NftCollectionListStyle: StyleProp<any> = {
  height: '100%',
};

if (Platform.OS === 'ios') {
  NftCollectionListStyle.paddingBottom = 50;
}

const renderEmpty = () => {
  return <EmptyList />;
};

const filteredCollection = (items: NftCollection[], searchString: string) => {
  return items.filter(collection => {
    return collection.collectionName && collection.collectionName.toLowerCase().includes(searchString.toLowerCase());
  });
};

const NftCollectionList = ({ dispatchNftState, nftCollections }: Props) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<NftCollection>) => {
      const key = `${item.collectionName}-${item.collectionId}`;
      const onPress = () => {
        dispatchNftState({ type: NftScreenActionType.OPEN_COLLECTION, payload: { collection: item } });
      };

      return <NftCollectionItem key={key} nftCollection={item} onPress={onPress} />;
    },
    [dispatchNftState],
  );

  return (
    <View style={NftCollectionListStyle}>
      <FlatListScreen
        withSubHeader={false}
        autoFocus={false}
        showLeftBtn={false}
        renderItem={renderItem}
        renderListEmptyComponent={renderEmpty}
        filterFunction={filteredCollection}
        items={nftCollections}
        numberColumns={2}
        searchMarginBottom={16}
      />
      <SafeAreaView />
    </View>
  );
};

export default NftCollectionList;
