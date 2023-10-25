import React, { useContext, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, ListRenderItem, SafeAreaView, ScrollView, View } from 'react-native';
import { soulSites } from '../../../predefined/soulSites';
// import { CaretRight } from 'phosphor-react-native';
import createStylesheet from './styles/BrowserHome';
// import { StyleSheet } from 'react-native';
import { RootNavigationProps } from 'routes/index';
import {
  ArrowClockwise,
  CaretLeft,
  CaretRight,
  DotsThree,
  GlobeSimple,
  House,
  IconProps,
  X,
} from 'phosphor-react-native';
import TabIcon from 'screens/Home/Browser/Shared/TabIcon';

import FastImage from 'react-native-fast-image';
import { Images } from 'assets/index';
import { Icon, Typography } from 'components/Design';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useSelector } from 'react-redux';
// import { RootState } from 'stores/index';
import { DAppInfo, PredefinedDApps } from 'types/browser';
import { BrowserItem } from 'components/Browser/BrowserItem';
import { SiteInfo, StoredSiteInfo } from 'stores/types';
import { getHostName } from 'utils/browser';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
// import i18n from 'utils/i18n/i18n';
import isaac from 'isaac';
// import { browserHomeItem, browserHomeItemIconOnly, browserHomeItemWidth } from 'constants/itemHeight';
import { ScreenContainer } from 'components/ScreenContainer';
// import BrowserHeader from './Shared/BrowserHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { FakeSearchInput } from 'screens/Home/Browser/Shared/FakeSearchInput';
import { FontSemiBold } from 'styles/sharedStyles';
import { ThemeTypes } from 'styles/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NoInternetScreen } from 'components/NoInternetScreen';
import { EmptyList } from 'components/EmptyList';
import i18n from 'utils/i18n/i18n';
import WebView from 'react-native-webview';
import { useToast } from 'react-native-toast-notifications';
import { BrowserOptionModal, BrowserOptionModalRef } from './BrowserOptionModal';
import { WebRunnerContext } from 'providers/contexts';
import { NavigationInfo } from './BrowserTab';
import { updateTabScreenshot } from 'stores/updater';
import { captureScreen } from 'react-native-view-shot';
import { BrowserService } from './BrowserService';
import { DEVICE } from 'constants/index';
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
type SearchItemType = {
  isSearch?: boolean
} & SiteInfo

const SectionList: React.FC<SectionListProps> = ({ data, renderItem }): JSX.Element => {
  const stylesheet = createStylesheet();
  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      // contentContainerStyle={stylesheet.recommendListContentContainer}
      contentContainerStyle={{
        paddingHorizontal: 48,
        paddingVertical: 16,
      }}
    >
      {data.map(item => (
        <View key={isaac.random()} style={stylesheet.recommendListSeparator}>
          {item.data.map(item2 => renderItem(item2))}
        </View>
      ))}
    </ScrollView>
  );
};
// const ItemSeparator = () => {
//   const stylesheet = createStylesheet();
//   return <View style={stylesheet.flatListSeparator} />;
// };

const _BrowserSoulSwap = () => {
  const stylesheet = createStylesheet()
  // const theme = useSoulWalletTheme().swThemes
  const [dApps] = useState<PredefinedDApps>(soulSites)
  const navigation = useNavigation<RootNavigationProps>()
  const recommendedList = useMemo((): RecommendedListType[] => {
    const sectionData = [];
    for (let i = 0; i < 20; i += 5) {
      const section = {
        data: dApps.dapps.slice(i, i + 5),
      };
      sectionData.push(section);
    }
    return sectionData;
  }, [dApps.dapps]);

  const onPressSectionItem = (item: SearchItemType) => {
    navigation.navigate('BrowserTabsManager', { url: item.url, name: item.name });
  };

  const renderSectionItem = (item: DAppInfo) => {
    return (
      <BrowserItem
        key={item.id}
        style={stylesheet.browserItem}
        title={item.name}
        subtitle={getHostName(item.url)}
        url={item.url}
        logo={item.icon}
        tags={item.categories}
        onPress={() => onPressSectionItem(item)}
      />
    );
  };

  return (
    <View style={stylesheet.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <FastImage style={stylesheet.banner} resizeMode="cover" source={Images.soulswapBanner} />
        <SectionList data={recommendedList} renderItem={renderSectionItem} />
      </ScrollView>
    </View>
  );
};

type RoutesType = {
  key: string;
  title: string;
};
type TabbarType = {
  focused: boolean;
};
const Tab = createMaterialTopTabNavigator();
const initialLayout = {
  width: Dimensions.get('window').width,
};
const transparent = { backgroundColor: 'transparent' };
const screenOptions = (currentTabIndex: number) => ({
  tabBarStyle: { height: 28, ...transparent },
  tabBarItemStyle: {
    width: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
  },
  tabBarIconStyle: { width: 'auto', marginLeft: 2, marginRight: 2, top: -12 },
  tabBarScrollEnabled: true,
  lazy: true,
  tabBarShowLabel: false,
  swipeEnabled: !!currentTabIndex,
  tabBarIndicatorStyle: transparent,
});
const tabbarIcon = (focused: boolean, item: RoutesType, theme: ThemeTypes) => {
  const wrapperStyle = {
    paddingHorizontal: 8,
    paddingLeft: item.title.toLocaleLowerCase() === '' ? 16 : undefined,
  };
  const spaceStyle = {
    height: 2,
    marginTop: theme.marginXXS,
    backgroundColor: focused ? theme.colorPrimary : 'transparent',
  };
  return (
    <View style={wrapperStyle}>
      <Typography.Text style={{ ...FontSemiBold, color: focused ? theme.colorTextLight1 : theme.colorTextLight4 }}>
        {item.title}
      </Typography.Text>
      <View style={spaceStyle} />
    </View>
  );
};


const BrowserSoulSwap = ({ navigation }: NativeStackScreenProps<{}>) => {
  const [{ canGoBack, canGoForward }, setNavigationInfo] = useState<NavigationInfo>({
    canGoBack: false,
    canGoForward: false,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const webviewRef = useRef<WebView>(null);
  const browserSv = useRef<BrowserService | null>(null);
  const siteUrl = useRef<string | null>(null);
  const siteName = useRef('');
  const browserOptionModalRef = useRef<BrowserOptionModalRef>(null);
  const hostname = siteUrl.current ? getHostName(siteUrl.current) : null;
  const isNetConnected = useContext(WebRunnerContext).isNetConnected;
  // const isWebviewReady = !!(initWebViewSource && injectedScripts);
  const toast = useToast();
  type BrowserActionButtonType = {
    key: string;
    icon?: (iconProps: IconProps) => JSX.Element;
    onPress: () => void;
    isDisabled?: boolean;
  };
  
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.navigate('Home', { screen: 'Browser' });
    } else {
      navigation.replace('Home', { screen: 'Browser' });
    }
  };

  const bottomButtonList: BrowserActionButtonType[] = [
    {
      key: 'back',
      icon: CaretLeft,
      onPress: () => {
        if (!canGoBack) {
          return;
        }
        const { current } = webviewRef;
        current && current.goBack && current.goBack();
      },
      isDisabled: !canGoBack,
    },
    {
      key: 'forward',
      icon: CaretRight,
      onPress: () => {
        if (!canGoForward) {
          return;
        }
        const { current } = webviewRef;
        current && current.goForward && current.goForward();
      },
      isDisabled: !canGoForward,
    },
    {
      key: 'home',
      icon: House,
      onPress: goBack,
    },
    {
      key: 'tabs',
      onPress: () => {
        captureScreen({
          format: 'jpg',
          quality: 1,
          width: DEVICE.width,
          height: DEVICE.height,
        })
          .then(screenShot => {
            // updateTabScreenshot(tabId, screenShot);
          })
          .catch(e => {
            console.log('Error when taking screenshot:', e);
          })
          .finally(() => {
            // onOpenBrowserTabs();
          });
      },
    },
    {
      key: 'more',
      icon: DotsThree,
      // isDisabled: !isWebviewReady,
      onPress: () => {
        setModalVisible(true);
      },
    },
  ];

  const renderBrowserTabBar = (button: BrowserActionButtonType) => {
    // if (!button.icon) {
      if (button.key === 'back') {
        // return button.icon;
        return <TabIcon onPress={button.onPress} />;
      // }
      // if (button.key === 'tabs') {
      //   return <TabIcon onPress={button.onPress} />;
      // }

      return null;
    }
  }


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
          source={{ uri: 'https://cryptoverse-by-rohit.vercel.app' }}
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

      {/* <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
      }}>{bottomButtonList.map(renderBrowserTabBar)}
      </View> */}
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

export default BrowserSoulSwap;
