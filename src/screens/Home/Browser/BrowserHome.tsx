import React, { useMemo, useState } from 'react'
import { FlatList, ListRenderItem, ScrollView, View } from 'react-native'
import { predefinedBanners, predefinedDApps } from 'constants/predefined/dAppSites'
import { CaretRight } from 'phosphor-react-native'
import createStylesheet from './styles/BrowserHome'
import FastImage from 'react-native-fast-image'
// import { Images } from 'assets/index'
// import { Image } from 'components/Design'
import { Icon, Typography } from 'components/Design'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/index'
import { DAppInfo, PredefinedDApps } from 'types/browser'
import { BrowserItem } from 'components/Browser/BrowserItem'
import { SiteInfo, StoredSiteInfo } from 'stores/types'
import IconItem from './Shared/IconItem'
import { getHostName } from 'utils/browser'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from 'routes/index'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import i18n from 'utils/i18n/i18n'
import isaac from 'isaac'
import { browserHomeItem, browserHomeItemIconOnly, browserHomeItemWidth } from 'constants/itemHeight'
import { SliderBox } from 'react-native-image-slider-box'

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

const paginationBoxStyle = {
  position: 'absolute',
  bottom: -12,
  right: 0,
  left: 0,
  padding: 0,
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'center',
  paddingVertical: 10,
};
const dotStyle = {
  width: 6,
  height: 6,
  borderRadius: 3,
  marginHorizontal: 0,
  padding: 0,
  margin: 0,
  backgroundColor: 'rgba(128, 128, 128, 0.92)',
}

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
const BrowserHome = () => {
  const stylesheet = createStylesheet()
  const theme = useSoulWalletTheme().swThemes
  const [dApps] = useState<PredefinedDApps>(predefinedDApps)
  const [banners] = useState<PredefinedDApps>(predefinedBanners)
  const navigation = useNavigation<RootNavigationProps>()
  // const isBannerData = true
  // const historyItems = useSelector((state: RootState) => state.browser.history)
  const bookmarkItems = useSelector((state: RootState) => state.browser.bookmarks)
  const recommendedList = useMemo((): RecommendedListType[] | [] => {
  const sectionData = []
  for (let i = 0; i < 20; i += 5) {
    const section = {
      data: dApps.dapps.slice(i, i + 5),
    };
    sectionData.push(section);
  }
  return sectionData
  }, [dApps.dapps])

  // const bannerData = useMemo(() => {
  //   if (!dApps) {
  //     return undefined;
  //   }

  //   return dApps.filter(dApp => dApp.isFeatured);
  // }, [dApps])
  const bannerData = useMemo(() => {
    let totalBanners = predefinedBanners.dapps.length

    // let banners = []
    // if (!dApps) {
    //   return undefined;
    // }
    // for (let i = 0; i < totalBanners; i++) {
    //   if (dApps.dapps[i].isFeatured)
    //     banners.push(dApps.dapps[i])
    // }
    console.log('totalBanners: %s', totalBanners)
    console.log('banners: %s', banners)
    // console.log('bannerData: %s', bannerData)
    return banners
    // return dApps.filter(dApp => dApp.isFeatured);
  }, [banners])

  const isBannerData = bannerData[0] != null

  // const getBannerImages = useMemo(() => {
  //   if (!bannerData) {
  //     // return [Images.browserBanner];
  //     return [Images.backgroundImg];
  //   }

  //   return bannerData.map(dApp => dApp.previewImage);
  // }, [bannerData]);
  const getBannerImages = useMemo(() => {
    // const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));

    if (!bannerData) {
      // return [Images.browserBanner];
      return "https://exchange.soulswap.finance/images/splash.png";
    }

    // console.log('bannerData', bannerData);
    return bannerData.dapps.map(dApp => dApp.previewImage)
    // return bannerData.map(dApp => dApp.previewImage);
  }, [bannerData]);
  
  const getBannerUrls = useMemo(() => {
    // const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));

    if (!bannerData) {
      // return [Images.browserBanner];
      return "https://exchange.soulswap.finance";
    }

    // console.log('bannerUrls', bannerData.dapps.map(dApp => dApp.url));
    return bannerData.dapps.map(dApp => dApp.url)
    // return bannerData.map(dApp => dApp.previewImage);
  }, [bannerData]);
  
  const getBannerNames = useMemo(() => {
    // const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));

    if (!bannerData) {
      // return [Images.browserBanner];
      return "SoulSwap";
    }

    // console.log('bannerNames', bannerData.dapps.map(dApp => dApp.name));
    return bannerData.dapps.map(dApp => dApp.name)
    // return bannerData.map(dApp => dApp.previewImage);
  }, [bannerData]);

  const onPressSectionItem = (item: SearchItemType) => {
    navigation.navigate('BrowserTabsManager', { url: item.url, name: item.name });
  }
  
  const onPressBannerItem = (url, name) => {
    navigation.navigate('BrowserTabsManager', { url: url, name: name });
  }

  // const renderRecentItem: ListRenderItem<StoredSiteInfo> = ({ item }) => {
  //   const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));

  //   return (
  //     <IconItem
  //       data={data}
  //       url={"https://soulswap.finance/favicon.png"} // item.url
  //       onPress={() => navigation.navigate('BrowserTabsManager', { url: item.url, name: data?.name })}
  //     />
  //   );
  // };
  const renderBookmarkItem: ListRenderItem<StoredSiteInfo> = ({ item }) => {
    const data = dApps.dapps.find(dAppItem => item.url.includes(dAppItem.id));
    return (
      <IconItem
        data={data}
        url={item.url}
        defaultData={item}
        onPress={() => navigation.navigate('BrowserTabsManager', { url: item.url, name: item.name })}
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
        url={item.url || "https://soulswap.finance/favicon.png"}
        logo={item.icon || "https://soulswap.finance/favicon.png"}
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
      {/* { isBannerData && */}
            <SliderBox
            ImageComponent={FastImage}
            images={getBannerImages}
            // items={[""]}
            sliderBoxHeight={200}
            onCurrentImagePressed={(index: number) => bannerData && onPressBannerItem(getBannerUrls[index], getBannerNames[index])}
            // onCurrentImagePressed={
            //   // (index: number) => bannerData && 
            //   (index: number) => 
            //   // onPressSectionItem(bannerData[index])
            //   // (items) =>
            //   onPressBannerItem(banners[index].bannerData, banners[index].name)
            // }
            dotColor="white"
            inactiveDotColor="#90A4AE"
            autoplay
            resizeMethod={'resize'}
            resizeMode={'cover'}
            paginationBoxStyle={paginationBoxStyle}
            dotStyle={dotStyle}
            ImageComponentStyle={stylesheet.banner}
            imageLoadingColor="#2196F3"
          />
          {/* } */}
          {/* { !isBannerData &&
            <Image style={stylesheet.banner} resizeMode="cover" src={"https://exchange.soulswap.finance/images/splash.png"} />
          } */}
        {/* <FastImage style={stylesheet.banner} resizeMode="cover" source={Images.browserBanner} /> */}
        {/* <Image style={stylesheet.banner} resizeMode="cover" src={"https://exchange.soulswap.finance/images/splash.png"} /> */}
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
        {bookmarkItems && bookmarkItems.length > 0 && (
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
        )}
        <SectionHeader
          title={i18n.browser.recommended}
          actionTitle={i18n.browser.seeAll}
          onPress={() => navigation.navigate('BrowserListByTabview', { type: 'RECOMMENDED' })}
        />
        <SectionList data={recommendedList} renderItem={renderSectionItem} />
      </ScrollView>
    </View>
  )
}
export default BrowserHome