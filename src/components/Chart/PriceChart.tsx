import { ADDRESS_CHAIN_MAP } from "constants/addresses";
import React, { useRef, useState } from "react";
import { View } from "react-native"
import WebView from "react-native-webview"
import Button from 'components/Design/Button'
import Text from 'components/Text'
const isMapped = (symbol: string) => {
  return ADDRESS_CHAIN_MAP[symbol] != undefined
}

const PriceChart = ({ groupSymbol, networkId }) => {
  const webviewRef = useRef<WebView>(null)
  const [viewChart, setViewChart] = useState(false)
  // const [tokenInfo, setTokenInfo] = useState(['ethereum', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'])
  let chain = 'ethereum'
  let address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

  // console.log('groupSymbol: %s', groupSymbol)
  // console.log('isMapped: %s', isMapped(groupSymbol))
  if (isMapped(groupSymbol)) {
    chain = ADDRESS_CHAIN_MAP[groupSymbol][0]
    address = ADDRESS_CHAIN_MAP[groupSymbol][1]
  }


  const toggleChart = () => {
    setViewChart(!viewChart)
  }

  // if (chain == 'fantom') { 
  //   address = ADDRESS_MAP_FANTOM[groupSymbol]
  // } else if (chain == 'avalanche') {
  //   address = ADDRESS_MAP_AVALANCHE[groupSymbol]
  // } else {
  //   address = ADDRESS_MAP_ETHEREUM[groupSymbol]
  // }

  return (
    <View
      style={{
        flex: viewChart ? 10 : 0,
        position: 'relative',
        backgroundColor: 'black',
      }}>
      <Button
        // type={'secondary'}
        onPress={toggleChart}
        style={{
          backgroundColor: '#1A1A1A',
          borderLeftWidth: 6,
          borderRightWidth: 6,
          marginBottom: 4,
          borderColor: viewChart ? '#E42F2F' : '#00ff91',
        }}
      // underlayColor={'#FFFFFF'}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        >
          {`${viewChart ? 'Hide' : 'Show'} Chart`}
        </Text>
      </Button>
      {viewChart &&

        <WebView
          // style={stylesheet.colorBlack}
          ref={webviewRef}
          originWhitelist={['*']}
          // source={{ uri: `https://dexscreener.com/${tokenInfo[0]}/${tokenInfo[1]}?embed=1&theme=dark&trades=0&info=0` }}
          source={{ uri: `https://dexscreener.com/${chain}/${address}?embed=1&theme=dark&trades=0&info=0` }}
          //   source={{ uri: `https://dexscreener.com/ethereum/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2?embed=1&theme=dark&trades=0&info=0` }}
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
          javaScriptEnabled />
      }
    </View>

    // 'https://www.notion.so/0xbuns/Embeds-a09bd09539474259ae99cba10e4819b3#cf1f781ebbce466da9c6594b636fe77c'
  )
}

export default PriceChart