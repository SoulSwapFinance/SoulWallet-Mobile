import React, { useContext, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ListRenderItem, SafeAreaView, ScrollView, View } from 'react-native';
// import { soulSites } from '../../../predefined/soulSites';
// import { CaretRight } from 'phosphor-react-native';
// import createStylesheet from './styles/BrowserHome';
// import { StyleSheet } from 'react-native';
// import { RootNavigationProps } from 'routes/index';
// import {
//   ArrowClockwise,
//   CaretLeft,
//   CaretRight,
//   DotsThree,
//   GlobeSimple,
//   House,
//   IconProps,
//   X,
// } from 'phosphor-react-native';
// import TabIcon from 'screens/Home/Browser/Shared/TabIcon';

// import FastImage from 'react-native-fast-image';
// import { Images } from 'assets/index';
// import { Icon, Typography } from 'components/Design';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';
// import { RootState } from 'stores/index';
import { DAppInfo, PredefinedDApps } from 'types/browser';
// import { BrowserItem } from 'components/Browser/BrowserItem';
// import { SiteInfo, StoredSiteInfo } from 'stores/types';
// import { getHostName } from 'utils/browser';
// import { useNavigation, useNavigationState } from '@react-navigation/native';
// import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
// import i18n from 'utils/i18n/i18n';
// import isaac from 'isaac';
// import { browserHomeItem, browserHomeItemIconOnly, browserHomeItemWidth } from 'constants/itemHeight';
import { ScreenContainer } from 'components/ScreenContainer';
// import BrowserHeader from './Shared/BrowserHeader';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { FakeSearchInput } from 'screens/Home/Browser/Shared/FakeSearchInput';
// import { FontSemiBold } from 'styles/sharedStyles';
// import { ThemeTypes } from 'styles/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { NoInternetScreen } from 'components/NoInternetScreen';
// import { EmptyList } from 'components/EmptyList';
// import i18n from 'utils/i18n/i18n';
import WebView from 'react-native-webview';
import { useToast } from 'react-native-toast-notifications';
import { BrowserOptionModal, BrowserOptionModalRef } from './BrowserOptionModal';
// import { WebRunnerContext } from 'providers/contexts';
// import { NavigationInfo } from './BrowserTab';
// import { updateTabScreenshot } from 'stores/updater';
// import { captureScreen } from 'react-native-view-shot';
// import { BrowserService } from './BrowserService';
// import { DEVICE } from 'constants/index';
// import SoulSwapListByCategory from './SoulSwapListByCategory';

// interface HeaderProps {
//   title?: string;
//   actionTitle: string;
//   onPress: () => void;
// }

interface SectionListProps {
  data: RecommendedListType[]
  renderItem: (item: DAppInfo) => JSX.Element
}
type RecommendedListType = {
  data: DAppInfo[]
};


const BrowserMarkets = ({ navigation }: NativeStackScreenProps<{}>) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const webviewRef = useRef<WebView>(null);
  const siteUrl = useRef<string | null>(null);
  const browserOptionModalRef = useRef<BrowserOptionModalRef>(null);

  return (
    <ScreenContainer backgroundColor={'#0C0C0C'}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'black',
        }}>

        <WebView
          // style={stylesheet.colorBlack}
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ uri: 'https://coingecko.com' }}
          // injectedJavaScriptBeforeContentLoaded={injectedScripts}
          // onLoadStart={onLoadStart}
          // onLoad={onLoad}
          // onLoadProgress={onLoadProgress}
          // onMessage={onWebviewMessage}
          // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          // onContentProcessDidTerminate={onOutOfMemmories}
          allowFileAccess
          allowsInlineMediaPlayback
          allowUniversalAccessFromFileURLs
          allowFileAccessFromFileURLs
          domStorageEnabled
          javaScriptEnabled
        />
      </View>
      <SafeAreaView style={{
        backgroundColor: '#1A1A1A'
      }}
      />
      <BrowserOptionModal ref={browserOptionModalRef} visibleModal={modalVisible} setVisibleModal={setModalVisible} />

    </ScreenContainer>
  )
  // return (
  //   <ScreenContainer backgroundColor={theme.colorBgDefault}>
  //     <>
  //       {/* <BrowserHeader /> */}
  //       {/* @ts-ignore */}
  //       {/* <FakeSearchInput style={stylesheet.fakeSearch} onPress={() => navigation.navigate('BrowserSearch')} /> */}

  //       {/* ISOLATE RECOMMENDED SCREEN */}
  //       <Tab.Navigator
  //        initialLayout={initialLayout}
  //        sceneContainerStyle={transparent}
  //        initialRouteName="TabBrowserHome0"
  //        screenListeners={screenListener}
  //        screenOptions={screenOptions(currentTabIndex)}
  //       >
  //        {allTabRoutes.map((item, index) => {
  //         if (index === 0) {
  //           return (
  //             <Tab.Screen
  //               key={'TabBrowserHome0'}
  //               name="TabBrowserHome0"
  //               component={_BrowserSoulSwap}
  //               options={tabScreenOptions(item)}
  //             />
  //           );
  //         }
  //       })}
  //       </Tab.Navigator>
  //     </>
  //   </ScreenContainer>
  // );
};

export default BrowserMarkets;
