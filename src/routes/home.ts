import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { StakingScreenStackParamList } from 'routes/staking/stakingScreen';
// import { NFTStackParamList } from 'screens/Home/NFT/NFTStackScreen';
import { BrowserHomeProps, RootStackParamList } from 'routes/index';
import { NFTStackParamList } from 'screens/Home/Crypto/Collectibles';

export type CryptoStackParamList = {
  TokenGroups: undefined;
  TokenGroupsDetail: { slug: string };
  Collectibles: { slug: string };
  CollectionList: undefined
  Collection: { collectionId: string }
  NftDetail: { collectionId: string; nftId: string }

};

export type CryptoNavigationProps = NativeStackScreenProps<CryptoStackParamList & RootStackParamList>['navigation'];
export type TokenGroupsDetailProps = NativeStackScreenProps<CryptoStackParamList, 'TokenGroupsDetail'>;

export type HomeStackParamList = {
  Tokens: NavigatorScreenParams<CryptoStackParamList>;
  NFTs: NavigatorScreenParams<NFTStackParamList>;
  // Crowdloans: undefined;
  Staking: NavigatorScreenParams<StakingScreenStackParamList> | undefined;
  SoulSwap: NavigatorScreenParams<BrowserHomeProps>;
  Portfolios: NavigatorScreenParams<BrowserHomeProps>;
  Markets: NavigatorScreenParams<BrowserHomeProps>;
  // News: NavigatorScreenParams<BrowserHomeProps>;
  // Markets: NavigatorScreenParams<BrowserHomeProps>;
  Browser: NavigatorScreenParams<BrowserHomeProps>;
};

type NavigationProps = NativeStackScreenProps<HomeStackParamList>;
export type HomeNavigationProps = NavigationProps['navigation'];
