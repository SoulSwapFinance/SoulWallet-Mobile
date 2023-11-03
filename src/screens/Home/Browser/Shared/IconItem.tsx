import React, { useCallback, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Image, Typography } from 'components/Design'
import { DAppInfo } from 'types/browser'
// import { useSelector } from 'react-redux'
// import { RootState } from 'stores/index'
import createStylesheet from './styles/IconItem'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { StoredSiteInfo } from 'stores/types'
import { getHostName } from 'utils/browser'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from 'routes/index'

interface IconItemProps {
  data: DAppInfo[] | undefined;
  itemData: StoredSiteInfo;
  isWithText?: boolean;
  onPressItem?: () => void;
  isLoading?: boolean;
}

const IconItem: React.FC<IconItemProps> = ({ data, itemData, isWithText, onPressItem, isLoading }) => {
  const navigation = useNavigation<RootNavigationProps>();
  // const assetLogoMap = useSelector((state: RootState) => state.logoMaps.assetLogoMap);
  const dApp = data?.find(dAppItem => itemData.url.includes(dAppItem.url));
  const [image, setImage] = useState<string>("https://soulswap.finance/favicon.png")
  const theme = useSoulWalletTheme().swThemes;
  const stylesheet = createStylesheet(theme);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const icon = dApp?.icon;
    if (icon) {
      setImage(icon);
    } else {
      setImage(`https://${getHostName(itemData.url)}/favicon.ico`);
    }
  }, [dApp, itemData.url, isLoading]);

  const onLoadImageError = useCallback(() => {
    if (image.includes('avicon.ico')) {
      setImage(`https://${getHostName(itemData.url)}/favicon.png`);
      return;
    }
    setImage("https://soulswap.finance/favicon.png");
  }, [image, itemData.url]);

  const onPress = () => {
    navigation.navigate('BrowserTabsManager', { url: itemData.url, name: dApp?.title || itemData.name });
    !!onPressItem && onPressItem();
  };

  return (
    <View style={[stylesheet.container]}>
      <TouchableOpacity style={stylesheet.imageWrapper} onPress={onPress}>
        <Image src={image} onError={onLoadImageError} style={stylesheet.image} shape={'squircle'} squircleSize={44} />
        {isWithText && (
          <Typography.Text size={'xs'} style={stylesheet.title} ellipsis>
            {dApp?.title || itemData.name}
          </Typography.Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default IconItem;