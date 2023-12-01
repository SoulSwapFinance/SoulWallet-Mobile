import React, { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import i18n from 'utils/i18n/i18n';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { EmptyList } from 'components/EmptyList';
import { GlobeHemisphereWest } from 'phosphor-react-native';
import { useRefresh } from 'hooks/useRefresh';
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme';
import { MissionInfo } from 'types/missionPool';
import { MissionPoolHorizontalItem } from 'components/MissionPoolHorizontalItem';
import { missionPoolItemHeight, missionPoolSeparator } from 'constants/itemHeight';
import { LazyFlatList } from 'components/LazyFlatList';
import { ThemeTypes } from 'styles/themes';
import { MissionPoolsContext } from 'screens/Home/Browser/MissionPool/context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'routes/index';
import { MissionPoolDetailModal } from 'screens/Home/Browser/MissionPool/MissionPoolDetailModal/MissionPoolDetailModal';

const ITEM_HEIGHT = missionPoolItemHeight;
const ITEM_SEPARATOR = missionPoolSeparator;
const TOTAL_ITEM_HEIGHT = ITEM_HEIGHT + ITEM_SEPARATOR;

export const MissionPoolsByCategory: React.FC<NativeStackScreenProps<RootStackParamList>> = ({ route }) => {
  const theme = useSoulWalletTheme().swThemes;
  const { searchString } = useContext(MissionPoolsContext);
  const [selectedMissionPool, setSelectedMissionPool] = useState<MissionInfo | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const styles = createStyle(theme);
  const { missions } = useSelector((state: RootState) => state.missionPool);
  const [isRefresh] = useRefresh();
  const listByCategory = useMemo(() => {
    if (!missions || !missions.length) {
      return [];
    }

    if (route.name === 'all') {
      return missions;
    }

    return missions.filter(item => item.status === route.name);
  }, [missions, route.name]);

  const searchFunction = (items: MissionInfo[], _searchString: string) => {
    return items.filter(({ name }) => {
      return name && name.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  const renderEmpty = () => {
    return (
      <EmptyList
        title={i18n.emptyScreen.missionPoolsEmptyTitle}
        icon={GlobeHemisphereWest}
        message={i18n.emptyScreen.missionPoolsEmptyMessage}
        isRefresh={isRefresh}
      />
    );
  };

  const getItemLayout = (data: MissionInfo[] | null | undefined, index: number) => ({
    index,
    length: TOTAL_ITEM_HEIGHT,
    offset: TOTAL_ITEM_HEIGHT * index,
  });

  const renderItem = ({ item }: ListRenderItemInfo<MissionInfo>) => (
    <MissionPoolHorizontalItem
      data={item}
      onPressItem={() => {
        setSelectedMissionPool(item);
        setVisible(true);
      }}
    />
  );
  const keyExtractor = (item: MissionInfo) => item.id + item.url;
  return (
    <View style={styles.container}>
      <LazyFlatList<MissionInfo>
        searchFunction={searchFunction}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        removeClippedSubviews
        items={listByCategory}
        keyExtractor={keyExtractor}
        style={{ padding: theme.padding }}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        renderListEmptyComponent={renderEmpty}
        searchString={searchString}
        flatListStyle={{ gap: theme.padding }}
      />

      {selectedMissionPool && (
        <MissionPoolDetailModal modalVisible={visible} data={selectedMissionPool} setVisible={setVisible} />
      )}
    </View>
  );
};

function createStyle(theme: ThemeTypes) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: theme.padding,
      paddingTop: theme.padding,
    },
  });
}
