import React from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { TokenGroups } from 'screens/Home/Crypto/TokenGroups'
import { TokenGroupsDetail } from 'screens/Home/Crypto/TokenGroupsDetail'
import { CryptoStackParamList } from 'routes/home'
// import { RootStackParamList } from 'routes/index'
import withPageWrapper from 'components/PageWrapper'
import NftItemList from './Collectibles/Item/NftItemList'
import NftCollectionList from './Collectibles/Collection/NftCollectionList'
import NftDetail from './Collectibles/Detail/NftDetail'
import i18n from 'utils/i18n/i18n'
import { EmptyList } from 'components/EmptyList'
import { Image } from 'phosphor-react-native'
import { NFTStackParamList } from './Collectibles'

export const renderEmptyNFT = () => {
  return <EmptyList title={i18n.emptyScreen.nftEmptyTitle} icon={Image} message={i18n.emptyScreen.nftEmptyMessage} />;
}

export const CryptoScreen = () => {
  const Stack = createNativeStackNavigator<CryptoStackParamList>()
  const NFTStack = createNativeStackNavigator<NFTStackParamList>()
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="TokenGroups" component={TokenGroups} />
      <Stack.Screen name="TokenGroupsDetail" component={TokenGroupsDetail} />
      <NFTStack.Screen name="CollectionList" component={withPageWrapper(NftCollectionList, ['nft'])} />
      <NFTStack.Screen name="Collection" component={NftItemList} />
      <NFTStack.Screen name="NftDetail" component={NftDetail} />

    </Stack.Navigator>
  )
}
