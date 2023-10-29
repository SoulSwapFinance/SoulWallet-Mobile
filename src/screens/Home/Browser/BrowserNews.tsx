/* eslint-disable react/no-unstable-nested-components */
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

  const url = 'https://blockworks.co?utm_source=soulswap'
  //  `https://blockworks.co?utm_source=soulswap`
  const imgURL = `https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/blockworks-logo.png`
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentId, setCurrentId] = useState('Home');
  const [showHeader, setShowHeader] = useState(true);
  const [currentName, setCurrentName] = useState('Blockworks');
  const [showOptions, setShowOptions] = useState(false);
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

    const style =
      {flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%",
      height: 40,
      borderWidth: 2,
      borderColor: '#9854FF',
      backgroundColor: 'background-default',
      paddingLeft: 4,
      paddingRight: 4,
      marginTop: 96,}
  
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
    
    const coingecko = {
        id: 'CoinGecko',
        url: 'https://coingecko.com?utm_source=soulswap',
        imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
        name: 'CoinGecko'
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
    
    const starsarena = {
      id: 'StarsArena',
      url: 'https://starsarena.com?utm_source=soulswap',
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
      name: 'StarsArena'
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
      coingecko,
      cointelegraph,
      coindesk,
      starsarena,
      twitter,
      youtube,
    ]


    // const onApply = useCallback(() => {
    //   onCloseModal();
    //   setSelectedItems(Object.keys(selectionMap).filter(o => selectionMap[o]));
    // }, [onCloseModal, selectionMap]);

    const toggleShowOptions = useCallback(() => {
      setShowOptions(!showOptions)
    }, [showOptions])

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
        style={{
          height: 120
        }}
      >
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            height: 40,
            borderWidth: 2,
            borderColor: '#9854FF',
            backgroundColor: 'background-default',
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 96,
          }}
          onPress={() => {
            try {
              const polyfillUrl = new URL(currentUrl)
              polyfillUrl.searchParams.set(
                'soulwallet-browser-refresh',
                Math.random().toString()
              )
              setCurrentUrl(polyfillUrl.toString())
              toggleShowOptions()
            } catch (error) {
              console.warn(error)
            }
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 24,
              paddingBottom: 32,
            }}
          >{currentName}
          </Text>
        </Button>
        {showOptions &&
          <>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[0].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[0].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[0].name}
              </Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[1].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[1].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[1].name}
              </Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[2].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[2].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[2].name}
              </Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[3].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[3].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[3].name}
              </Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[4].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[4].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[4].name}
              </Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[5].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[5].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[5].name}
              </Text>
            </Button>
            <Button
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%",
                height: 40,
                borderWidth: 2,
                backgroundColor: '#0F0F0F',
                borderLeftColor: '#9854FF',
                borderRightColor: '#9854FF',
                borderRadius: 0,
                paddingLeft: 4,
                paddingRight: 4,
              }}
              onPress={() => {
                try {
                  const polyfillUrl = new URL(currentUrl)
                  polyfillUrl.searchParams.set(
                    'soulwallet-browser-refresh',
                    Math.random().toString()
                  )
                  setCurrentUrl(supportedScreens[6].url.toString())
                  setShowOptions(false)
                  setCurrentName(supportedScreens[6].name)
                } catch (error) {
                  console.warn(error)
                }
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  paddingBottom: 32,
                }}
              >{supportedScreens[6].name}
              </Text>
            </Button>
          </>
        }
      </View>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      // todo: hides header
      headerShown: showHeader,
      header: () => (
        <NewsSelector />
      ),
    })
  }, [currentUrl, webviewRef, modalMode, navigation, url])

  return (
    <ScreenContainer 
      backgroundColor={'#0C0C0C'}
    >
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
