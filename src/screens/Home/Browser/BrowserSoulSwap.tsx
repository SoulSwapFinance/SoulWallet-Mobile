import React, { useMemo, useState } from 'react';
import { Animated, Dimensions, FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { predefinedDApps } from '../../../predefined/dAppSites';
import { CaretRight } from 'phosphor-react-native';
import createStylesheet from './styles/BrowserHome';
import { StyleSheet } from 'react-native';

import FastImage from 'react-native-fast-image';
import { Images } from 'assets/index';
import { Icon, Typography } from 'components/Design';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { DAppInfo, PredefinedDApps } from 'types/browser';
import { BrowserItem } from 'components/Browser/BrowserItem';
import { SiteInfo, StoredSiteInfo } from 'stores/types';
import IconItem from './Shared/IconItem';
import { getHostName } from 'utils/browser';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import i18n from 'utils/i18n/i18n';
import isaac from 'isaac';
import { browserHomeItem, browserHomeItemIconOnly, browserHomeItemWidth } from 'constants/itemHeight';
import { ScreenContainer } from 'components/ScreenContainer';
import BrowserHeader from './Shared/BrowserHeader';
import BrowserListByCategory from './BrowserListByCategory';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FakeSearchInput } from 'screens/Home/Browser/Shared/FakeSearchInput';
import { FontSemiBold } from 'styles/sharedStyles';
import { ThemeTypes } from 'styles/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SoulSwapListByCategory from './SoulSwapListByCategory';
interface HeaderProps {
  title: string;
  actionTitle: string;
  onPress: () => void;
}
interface SectionListProps {
  data: RecommendedListType[];
  renderItem: (item: DAppInfo) => JSX.Element;
}
type RecommendedListType = {
  data: DAppInfo[];
};
type SearchItemType = {
  isSearch?: boolean;
} & SiteInfo;
const ICON_ITEM_HEIGHT = browserHomeItemIconOnly;
const ITEM_HEIGHT = browserHomeItem;
const ITEM_WIDTH = browserHomeItemWidth;
const SectionHeader: React.FC<HeaderProps> = ({ title, actionTitle, onPress }): JSX.Element => {
  const theme = useSoulWalletTheme().swThemes;
  const stylesheet = createStylesheet();
  return (
    <View style={stylesheet.sectionContainer}>
      <Typography.Title level={5} style={stylesheet.sectionTitle}>
        {title}
      </Typography.Title>
      <TouchableOpacity onPress={onPress}>
        <View style={stylesheet.sectionAction}>
          <Typography.Text style={stylesheet.sectionActionTitle}>{actionTitle}</Typography.Text>
          <Icon phosphorIcon={CaretRight} weight="bold" customSize={16} iconColor={theme.colorTextLight1} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SectionList: React.FC<SectionListProps> = ({ data, renderItem }): JSX.Element => {
  const stylesheet = createStylesheet();
  return (
    <ScrollView
      horizontal
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={stylesheet.recommendListContentContainer}>
      {data.map(item => (
        <View key={isaac.random()} style={stylesheet.recommendListSeparator}>
          {item.data.map(item2 => renderItem(item2))}
        </View>
      ))}
    </ScrollView>
  );
};
const ItemSeparator = () => {
  const stylesheet = createStylesheet();
  return <View style={stylesheet.flatListSeparator} />;
};

const _BrowserSoulSwap = () => {
  const stylesheet = createStylesheet();
  const theme = useSoulWalletTheme().swThemes;
  const [dApps] = useState<PredefinedDApps>(predefinedDApps);
  const navigation = useNavigation<RootNavigationProps>();
  const historyItems = useSelector((state: RootState) => state.browser.history);
  const bookmarkItems = useSelector((state: RootState) => state.browser.bookmarks);
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

  // const renderRecentItem: ListRenderItem<StoredSiteInfo> = ({ item }) => {
  //   const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));

  //   return (
  //     <IconItem
  //       data={data}
  //       url={item.url}
  //       onPress={() => navigation.navigate('BrowserTabsManager', { url: item.url, name: data?.name })}
  //     />
  //   );
  // };
  // const renderBookmarkItem: ListRenderItem<StoredSiteInfo> = ({ item }) => {
  //   const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));
  //   return (
  //     <IconItem
  //       data={data}
  //       url={item.url}
  //       defaultData={item}
  //       onPress={() => navigation.navigate('BrowserTabsManager', { url: item.url, name: item.name })}
  //       isWithText
  //     />
  //   );
  // };
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
  const getItemLayout = (data: StoredSiteInfo[] | null | undefined, index: number) => ({
    index,
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
  });

  return (
    <View style={stylesheet.container}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <FastImage style={stylesheet.banner} resizeMode="cover" source={Images.browserBanner} />
        {/* {historyItems && historyItems.length > 0 && (
          <>
            <SectionHeader
              title={i18n.browser.recent}
              actionTitle={i18n.browser.seeAll}
              onPress={() => navigation.navigate('BrowserSearch')}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: ICON_ITEM_HEIGHT, marginBottom: theme.marginSM }}
              contentContainerStyle={stylesheet.flatListContentContainer}
              data={historyItems}
              renderItem={renderRecentItem}
              ItemSeparatorComponent={ItemSeparator}
              getItemLayout={getItemLayout}
              horizontal
            />
          </>
        )} */}
        {/* {bookmarkItems && bookmarkItems.length > 0 && (
          <>
            <SectionHeader
              title={i18n.browser.favorite}
              actionTitle={i18n.browser.seeAll}
              onPress={() => navigation.navigate('BrowserListByTabview', { type: 'BOOKMARK' })}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: ITEM_HEIGHT, marginBottom: theme.marginSM }}
              contentContainerStyle={stylesheet.flatListContentContainer}
              data={bookmarkItems}
              renderItem={renderBookmarkItem}
              ItemSeparatorComponent={ItemSeparator}
              getItemLayout={getItemLayout}
              horizontal
            />
          </>
        )} */}
        <SectionHeader
          title={i18n.browser.recommended}
          actionTitle={i18n.browser.seeAll}
          onPress={() => navigation.navigate('BrowserListByTabview', { type: 'RECOMMENDED' })}
        />
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
  tabBarIconStyle: { width: 'auto', marginLeft: -2, marginRight: -2, top: -12 },
  tabBarScrollEnabled: true,
  lazy: true,
  tabBarShowLabel: false,
  swipeEnabled: !!currentTabIndex,
  tabBarIndicatorStyle: transparent,
});
const tabbarIcon = (focused: boolean, item: RoutesType, theme: ThemeTypes) => {
  const wrapperStyle = {
    paddingHorizontal: 8,
    paddingLeft: item.title.toLocaleLowerCase() === 'all' ? 16 : undefined,
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
 const createStylesheet = (theme: ThemeTypes) =>
  StyleSheet.create({
    fakeSearch: {
      margin: theme.margin,
    },
  });
  const theme = useSoulWalletTheme().swThemes;
  const stylesheet = createStylesheet(theme);
  const [dApps] = useState<PredefinedDApps>(predefinedDApps);
  const [searchString] = useState<string>('');
  const categoryTabRoutes = dApps.categories().map(item => ({ key: item.id, title: item.name }));
  const allTabRoutes = [{ key: 'all', title: i18n.common.all }, ...categoryTabRoutes];
  const navigationState = useNavigationState(state => state);
  const currentTabIndex = navigationState.routes[navigationState.routes.length - 1].state?.index || 0;
  const av = new Animated.Value(0);
  av.addListener(() => {
    return;
  });

  const tabScreenOptions = (item: RoutesType) => {
    return {
      tabBarIcon: ({ focused }: TabbarType) => tabbarIcon(focused, item, theme),
    };
  };

  const screenListener = {
    focus: () => {
      Animated.timing(av, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
  };

  return (
    <ScreenContainer backgroundColor={theme.colorBgDefault}>
      <>
        <BrowserHeader />
        {/* @ts-ignore */}
        <FakeSearchInput style={stylesheet.fakeSearch} onPress={() => navigation.navigate('BrowserSearch')} />

        <Tab.Navigator
          initialLayout={initialLayout}
          sceneContainerStyle={transparent}
          initialRouteName="TabBrowserHome0"
          screenListeners={screenListener}
          screenOptions={screenOptions(currentTabIndex)}>
          {allTabRoutes.map((item, index) => {
            if (index === 0) {
              return (
                <Tab.Screen
                  key={'TabBrowserHome0'}
                  name="TabBrowserHome0"
                  component={_BrowserSoulSwap}
                  options={tabScreenOptions(item)}
                />
              );
            }
            return (
              <Tab.Screen
                key={item.key}
                name={item.key}
                initialParams={{ searchString }}
                component={SoulSwapListByCategory}
                options={tabScreenOptions(item)}
              />
            );
          })}
        </Tab.Navigator>
      </>
    </ScreenContainer>
  );
};

export default BrowserSoulSwap;
