import React from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../../routes/index'

export type NFTStackParamList = {
    CollectionList: undefined
    Collection: { collectionId: string }
    NftDetail: { collectionId: string; nftId: string }
  }
  export type NavigationProps = NativeStackScreenProps<NFTStackParamList & RootStackParamList>
  export type NFTNavigationProps = NavigationProps['navigation']
  export type NFTCollectionProps = NativeStackScreenProps<NFTStackParamList, 'Collection'>
  export type NFTDetailProps = NativeStackScreenProps<NFTStackParamList, 'NftDetail'>