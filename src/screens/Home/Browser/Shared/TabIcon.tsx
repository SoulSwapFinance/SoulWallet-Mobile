import React, { Suspense, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import browserTitleStyle from './styles/TabIcon';
import { SVGImages } from 'assets/index';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'routes/index';

const styles = browserTitleStyle();
const TabIcon = () => {
  const tabsNumber = useSelector((state: RootState) => state.browser.tabs.length);
  const navigation = useNavigation<RootNavigationProps>();

  const onOpenBrowserTabs = useCallback(() => {
    navigation.navigate('BrowserTabsManager', { isOpenTabs: true });
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.rightHeaderButtonStyle} onPress={onOpenBrowserTabs}>
      <View style={styles.rightHeaderButtonTextOutlineStyle}>
        <View style={styles.imageSvgWrapper}>
          <Suspense>
            <SVGImages.IcHalfSquare width={19} height={19} />
          </Suspense>
        </View>
        <Text style={styles.rightHeaderButtonTextStyle}>{tabsNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabIcon;
