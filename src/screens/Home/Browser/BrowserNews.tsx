/* eslint-disable react/no-unstable-nested-components */
import type { FC } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { URL } from 'react-native-url-polyfill'
import Image from 'components/Design/Image'
import Icon from 'components/Design/Icon'
// import Image from 'components/Image'
// import HStack from 'components/HStack'
// import Menu from 'components/Menu'
// import Box from 'components/Box'
// import Icon from 'components/Icon'
import Text from 'components/Text'
// import Typography from 'components/Typography'
// import WebView from '../../../components/WebView'
// import { current } from '@reduxjs/toolkit'
import WebView from 'react-native-webview'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScreenContainer } from 'components/ScreenContainer'
import { SafeAreaView, View } from 'react-native'
import { BrowserOptionModal, BrowserOptionModalRef } from './BrowserOptionModal';
import { CheckCircle } from 'phosphor-react-native'
import Button from 'components/Design/Button'
// import Menu from 'components/Menu'

// todo
// import { CategorySelector } from '../Market/Components/CategorySelector/CategorySelector';

export const NewsScreen = ({ navigation }: NativeStackScreenProps<{}>) => {
  // const intl = useIntl();
  // const navigation = useNavigation();

  const modalMode = false

  const url = 'https://cryptoverse-app-beryl.vercel.app/news'
  //  `https://blockworks.co?utm_source=soulswap`
  const imgURL = `https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/blockworks-logo.png`
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentId, setCurrentId] = useState('Home');
  const [currentImageURL, setCurrentImageURL] = useState(imgURL)
  const webviewRef = useRef<WebView>(null);

  // const containerRef = useRef<typeof Box>(null);

  type Props = {
    currentId?: string;
    imageURL?: string;
    currentURL?: string
  }

  function NewsSelector(props: Props) {
    // const { selectedScreen, setSelectedURL } = props;
    // const navigation = useNavigation<ModalNavigationProps['navigation']>();
    // const getScreen = (id: string) => {
    //   return supportedScreens.find((screen) => screen.id === id);
    // }
    type Screen = {
      id: string;
      url: string;
      imageURL: string;
      name: string;
    }

    const blockworks: Screen = {
      id: 'Blockworks',
      url: 'https://blockworks.co?utm_source=soulswap',
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/blockworks-logo.png',
      name: 'Blockworks'
    }

    const cointelegraph = {
      id: 'Cointelegraph',
      url: 'https://cointelegraph.com?utm_source=soulswap',
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/cointelegraph-logo.png',
      name: 'Cointelegraph'
    }

    const coindesk = {
      id: 'CoinDesk',
      url: 'https://coindesk.com?utm_source=soulswap',
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
      name: 'CoinDesk'
    }

    const twitter = {
      id: 'Twitter',
      url: 'https://x.com?utm_source=soulswap',
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/twitter-circle.png',
      name: 'Twitter'
    }

    const youtube = {
      id: 'YouTube',
      url: 'https://m.youtube.com/@Blockbytes_?utm_source=soulswap',
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/youtube.png',
      name: 'YouTube'
    }

    const supportedScreens = [
      blockworks,
      cointelegraph,
      coindesk,
      twitter,
      youtube,
    ]

    // const [currentURL, setCurrentUrl] = useState(props?.currentURL)

    return (

      <View
      // accessibilityLabel="More options menu" {...triggerProps}
      // style={{
      //   flexDirection: 'row',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   width: "100%",
      //   height: 40,
      //   borderRadius: 12,
      //   borderWidth: 2,
      //   borderColor: '#9854FF',
      //   backgroundColor: 'background-default',
      //   paddingLeft: 4,
      //   paddingRight: 4,
      //   marginTop: 48,
      //   // animation: 'pulse 2s infinite',
      // }}
      >
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            height: 40,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#9854FF',
            backgroundColor: 'background-default',
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 64,
            // animation: 'pulse 2s infinite',
          }}
          onPress={() => {
            try {
              const polyfillUrl = new URL(currentUrl);
              polyfillUrl.searchParams.set(
                'soulwallet-browser-refresh',
                Math.random().toString(),
              );
              setCurrentUrl(polyfillUrl.toString());
            } catch (error) {
              console.warn(error);
            }
          }}
        >
          {/* <View
        > */}

          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 24,
              // paddingTop: 16,
              paddingBottom: 32,
              // lineHeight: 36,
              // fontStyle: 'header'
            }}
          >{currentId}
          </Text>
        </Button>
      </View>
    )

  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (

        // <Box
        //   ref={containerRef}
        //   bg="background-default"
        //   // justifyContent="space-between"
        //   borderBottomWidth="1px"
        //   borderBottomColor="divider"
        //   style={{
        //     display: "flex",
        //     // marginBottom: -36,
        //     marginRight: 4,
        //     marginTop: 42,
        //     flexDirection: "row",
        //     justifyContent: "space-between",
        //     // justifyContent: "flex-start",
        //   }}
        // >
        /* <Box 
          flexDirection="column"
          h="9" 
          w="100%"
          alignContent="center"
          mt={4}
          mb={16}
          // gap={12}
          style={{
            gap: 4,
          }}
          // ml={4}
        > */
        /* <CategorySelector 
            currentId={'Market Updates'} 
            imageURL={'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/icons/news.png'} 
            /> */
        <NewsSelector />
        /* </Box> */

        /* UI NOTE: Refresh controller for browser UI. */
        /* <Pressable
          onPress={() => {
            try {
              const polyfillUrl = new URL(currentUrl);
              polyfillUrl.searchParams.set(
                'soulwallet-browser-refresh',
                Math.random().toString(),
              );
              setCurrentUrl(polyfillUrl.toString());
            } catch (error) {
              console.warn(error);
            }
          }}
          style={{
            borderWidth: 3,
            borderColor: "#303046",
            borderRadius: 12,
            paddingRight: 2,
            paddingLeft: 2,
            display: 'flex',
            justifyContent: 'center',
            // marginBottom: 4,
            // marginTop: 2,
            marginLeft: -52,
            height: 36,
            width: 36,
          }}
        >
          <Icon
            name="ArrowPathOutline"
            size={26}
          // circle
          />
        </Pressable> */

        // </Box>
      ),
    });
  }, [currentUrl, webviewRef, modalMode, navigation, url]);

  return (
    // <WebView src={currentUrl} />
    <ScreenContainer backgroundColor={'#0C0C0C'}>
      <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'black',
        }}>

        <WebView
          // style={stylesheet.colorBlack}
          // ref={webviewRef}
          originWhitelist={['*']}
          source={{ uri: currentUrl }}
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
      {/* <BrowserOptionModal ref={browserOptionModalRef} visibleModal={modalVisible} setVisibleModal={setModalVisible} /> */}

    </ScreenContainer>
  );
};

export default NewsScreen;
