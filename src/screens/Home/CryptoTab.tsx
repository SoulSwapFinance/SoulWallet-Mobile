import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useSubWalletTheme } from 'hooks/useSubWalletTheme';
import { sharedStyles } from 'styles/sharedStyles';
const FirstRoute = () => <View style={{ backgroundColor: '#ff4081' }} />;

const SecondRoute = () => <View style={{ backgroundColor: '#673ab7' }} />;

// const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  chains: FirstRoute,
  tokens: SecondRoute,
});

export const CryptoTab = () => {
  const theme = useSubWalletTheme().colors;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginTop: 50,
        },
        scene: {
          flex: 1,
        },
        tabTitle: {
          ...sharedStyles.largerText,
          fontWeight: '600',
        },
        tabBar: {
          backgroundColor: '#222222',
          paddingTop: 0,
          paddingBottom: 0,
        },
      }),
    [],
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'chains', title: 'Chains' },
    { key: 'tokens', title: 'Tokens' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={styles.container}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={styles.tabBar}
          inactiveColor={'#FFF'}
          indicatorStyle={{ backgroundColor: '#FFF' }}
          tabStyle={{ paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0, minHeight: 36}}
          renderLabel={({ route, color }) => (
            <Text style={[styles.tabTitle, { color }]} numberOfLines={1}>
              {route.title}
            </Text>
          )}
        />
      )}
    />
  );
};
