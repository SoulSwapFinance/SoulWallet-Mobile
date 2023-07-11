import React, { useMemo, useState } from 'react';
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native';
import { predefinedDApps } from '../../../predefined/dAppSites';
import { CaretRight } from 'phosphor-react-native';
import createStylesheet from './styles/BrowserHome';
import FastImage from 'react-native-fast-image';
import { Images } from 'assets/index';
import { Icon, Typography } from 'components/design-system-ui';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { DAppInfo, PredefinedDApps } from 'types/browser';
import { BrowserItem } from 'components/Browser/BrowserItem';
import { SiteInfo, StoredSiteInfo } from 'stores/types';
import IconItem from './Shared/IconItem';
import { getHostName } from 'utils/browser';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';

interface HeaderProps {
  title: string;
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
const ICON_ITEM_HEIGHT = 44;
const ITEM_HEIGHT = 72;
const SectionHeader: React.FC<HeaderProps> = ({ title, onPress }): JSX.Element => {
  const theme = useSubWalletTheme().swThemes;
  const stylesheet = createStylesheet();
  return (
    <View style={stylesheet.sectionContainer}>
      <Typography.Title level={5} style={stylesheet.sectionTitle}>
        {title}
      </Typography.Title>
      <TouchableOpacity onPress={onPress}>
        <View style={stylesheet.sectionAction}>
          <Typography.Text style={stylesheet.sectionActionTitle}>See all</Typography.Text>
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
        <View key={Math.random()} style={stylesheet.recommendListSeparator}>
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
const BrowserHome = () => {
  const stylesheet = createStylesheet();
  const theme = useSubWalletTheme().swThemes;
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

  const renderRecentItem: ListRenderItem<StoredSiteInfo> = ({ item }) => {
    const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));

    return (
      <IconItem
        data={data}
        onPress={() => navigation.navigate('BrowserTabsManager', { url: item.url, name: data?.name })}
      />
    );
  };
  const renderBookmarkItem: ListRenderItem<StoredSiteInfo> = ({ item }) => {
    const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));
    return (
      <IconItem
        data={data}
        defaultData={item}
        onPress={() =>
          navigation.navigate('BrowserTabsManager', { url: data?.url || item.url, name: data?.name || item.name })
        }
        isWithText
      />
    );
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
        <FastImage style={stylesheet.banner} resizeMode="cover" source={Images.browserBanner} />
        {historyItems && historyItems.length > 0 && (
          <>
            <SectionHeader title="Recent" onPress={() => navigation.navigate('BrowserSearch')} />
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ maxHeight: ICON_ITEM_HEIGHT, marginBottom: theme.marginSM }}
              contentContainerStyle={stylesheet.flatListContentContainer}
              data={historyItems}
              renderItem={renderRecentItem}
              ItemSeparatorComponent={ItemSeparator}
              getItemLayout={(data, index) => ({ index, length: ICON_ITEM_HEIGHT, offset: ICON_ITEM_HEIGHT * index })}
              horizontal
            />
          </>
        )}
        {bookmarkItems && bookmarkItems.length > 0 && (
          <>
            <SectionHeader
              title="Favorite"
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
              getItemLayout={(data, index) => ({ index, length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index })}
              horizontal
            />
          </>
        )}
        <SectionHeader
          title="Recommended"
          onPress={() => navigation.navigate('BrowserListByTabview', { type: 'RECOMMENDED' })}
        />
        <SectionList data={recommendedList} renderItem={renderSectionItem} />
      </ScrollView>
    </View>
  );
};
export default BrowserHome;
