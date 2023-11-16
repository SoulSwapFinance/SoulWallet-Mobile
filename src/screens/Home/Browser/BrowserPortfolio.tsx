/* eslint-disable react/no-unstable-nested-components */
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import { useNavigation } from '@react-navigation/core'
import { URL } from 'react-native-url-polyfill'
// import Image from 'components/Design/Image'
// import Icon from 'components/Design/Icon'
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
// import { BrowserOptionModal, BrowserOptionModalRef } from './BrowserOptionModal';
// import { CheckCircle } from 'phosphor-react-native'
import Button from 'components/Design/Button'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/index'
import { isAccountAll } from '@soul-wallet/extension-base/src/utils'
import { AccountSettingButton } from 'components/AccountSettingButton'
import { useNavigation } from '@react-navigation/native'
import { RootNavigationProps } from 'routes/index'
// import Menu from 'components/Menu'

// todo
// import { CategorySelector } from '../Market/Components/CategorySelector/CategorySelector';

export const PortfolioScreen = ({ }: NativeStackScreenProps<{}>) => {
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount)
  const isAll = useMemo((): boolean => !!currentAccount && isAccountAll(currentAccount.address), [currentAccount]);
  const accountAddress = currentAccount.address ?? ''
  const navigation = useNavigation<RootNavigationProps>();

  const modalMode = false
  // console.log('accountAddress: %s', accountAddress)
  // const url = `https://dexscreener.com/portfolio/${accountAddress ?? ''}`
  // const url = `https://debank.com/profile/${accountAddress ?? ''}?utm_source=soulswap`
  const url = `https://app.zerion.io/${accountAddress ?? ''}/overview?utm_source=soulswap`
  //  `https://blockworks.co?utm_source=soulswap`
  // const imgURL = `https://raw.githubusercontent.com/SoulSwapFinance/assets/master/mobile/news/blockworks-logo.png`
  const [currentUrl, setCurrentUrl] = useState(url)
  // const [currentId, setCurrentId] = useState('Home')
  const [showHeader, setShowHeader] = useState(true)
  const [currentName, setCurrentName] = useState('Zerion')
  const [currentScreen, setCurrentScreen] = useState(0)

  const [showOptions, setShowOptions] = useState(false)
  // const [currentImageURL, setCurrentImageURL] = useState(imgURL)
  const webviewRef = useRef<WebView>(null);

  // const containerRef = useRef<typeof Box>(null);

  type Props = {
    currentId?: string;
    imageURL?: string;
    currentURL?: string
  }

  function PortfolioSelector(props: Props) {
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

    // const dexscreener: Screen = {
    //   id: 'DexScreener',
    //   url: `https://dexscreener.com/portfolio/${accountAddress ?? ''}?utm_source=soulswap`,
    //   imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/blockworks-logo.png',
    //   name: 'DexScreener'
    // }

    const zerion: Screen = {
      id: 'Zerion',
      url: `https://app.zerion.io/${accountAddress ?? ''}/overview?utm_source=soulswap`,
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
      name: 'Zerion'
    }

    const debank: Screen = {
      id: 'DeBank',
      url: `https://debank.com/profile/${accountAddress ?? ''}?utm_source=soulswap`,
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
      name: 'DeBank'
    }

    const soulswap: Screen = {
      id: 'SoulSwap',
      url: `https://exchange.soulswap.finance/portfolio/${accountAddress ?? ''}?utm_source=soulswap`,
      imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
      name: 'SoulSwap'
    }

    // const metamask: Screen = {
    //       id: 'MetaMask',
    //       url: `https://portfolio.metamask.io`,
    //       imageURL: 'https://raw.githubusercontent.com/SoulSwapFinance/assets/prod/mobile/news/coindesk.png',
    //       name: 'MetaMask'
    //   }


    const supportedScreens = [
      // dexscreener,
      zerion,
      debank,
      soulswap,
      // metamask,
    ]


    // const onApply = useCallback(() => {
    //   onCloseModal();
    //   setSelectedItems(Object.keys(selectionMap).filter(o => selectionMap[o]));
    // }, [onCloseModal, selectionMap]);

    const toggleShowOptions = useCallback(() => {
      setShowOptions(!showOptions)
    }, [showOptions])

    const handleScreen = useCallback((id) => {
      setCurrentScreen(id)
      setCurrentUrl(supportedScreens[id].url.toString())
      setCurrentName(supportedScreens[id].name)
    }, [showOptions])

    const showOption = (id) => {
      return currentScreen !== id
    }


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
      //   backgroundColor: '#0F0F0F',
      //   paddingLeft: 4,
      //   paddingRight: 4,
      //   marginTop: 48,
      //   // animation: 'pulse 2s infinite',
      // }}
      // style={{
      //   marginTop: 56, 
      //   height: 24,
      //   borderWidth: 4,
      //   borderColor: '#9854FF',
      // }}
      >
        <Button
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: "100%",
            height: 56,
            borderWidth: 2,
            borderColor: '#9854FF',
            backgroundColor: '#0F0F0F',
            paddingLeft: 4,
            paddingRight: 4,
            marginTop: 56,
            marginBottom: showOptions ? 0 : -24,
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
              fontWeight: 'bold',
              fontSize: 18,
              // padding: 32,
            }}
          >{currentName}
          </Text>
        </Button>
        {showOptions &&
          <>
            {showOption(0) &&
              <Button
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: "100%",
                  height: 56,
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
                    handleScreen(0)
                    setShowOptions(false)
                  } catch (error) {
                    console.warn(error)
                  }
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                  }}
                >{supportedScreens[0].name}
                </Text>
              </Button>
            }
            {showOption(1) &&
              <Button
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: "100%",
                  height: 56,
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
                    handleScreen(1)
                    setShowOptions(false)
                  } catch (error) {
                    console.warn(error)
                  }
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                  }}
                >{supportedScreens[1].name}
                </Text>
              </Button>
            }
            {showOption(2) &&
              <Button
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: "100%",
                  height: 56,
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
                    handleScreen(2)
                    setShowOptions(false)
                  } catch (error) {
                    console.warn(error)
                  }
                }}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                  }}
                >{supportedScreens[2].name}
                </Text>
              </Button>
            }
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
        <PortfolioSelector />
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
        }}
      >

        <WebView
          // style={stylesheet.colorBlack}
          // ref={webviewRef}
          originWhitelist={['*']}
          source={{ uri: currentUrl }}
          onClick={() => setShowOptions(false)}
          // injectedJavaScriptBeforeContentLoaded={injectedScripts}
          // onLoadStart={onLoadStart}
          onLoad={() => {
            try {
              const polyfillUrl = new URL(currentUrl)
              polyfillUrl.searchParams.set(
                'soulwallet-browser-refresh',
                Math.random().toString()
              )
            }
            catch (error) {
              console.warn(error)
            }
          }}
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

export default PortfolioScreen;
