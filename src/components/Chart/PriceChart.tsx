import React, { useRef, useState } from "react";
import { View } from "react-native"
import WebView from "react-native-webview"

export const ADDRESS_MAP_FANTOM: { [symbol: string]: string } = {
  'FTM': '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
  'WFTM': '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
  'SOUL': '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07',
  'AURA': '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07',
}

export const ADDRESS_MAP_ETHEREUM: { [symbol: string]: string } = {
  'ETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  'WETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',

  '1INCH': '0x111111111117dC0aa78b770fA6A738034120C302',
  "APE": '0x4d224452801ACEd8B2F0aebE155379bb5D594381',
  'BAT': '0x0D8775F648430679A709E98d2b0Cb6250d2887EF',
  'BUSD': '0x7B4B0B9b024109D182dCF3831222fbdA81369423',
  'BNB': '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
  'CHZ': '0x3506424F91fD33084466F402d5D97f05F8e3b4AF',
  'CRO': '0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b',
  'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  'DPR': '0xf3AE5d769e153Ef72b4e3591aC004E89F48107a1',
  'ENJ': '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c',
  'ENS': '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72',
  "COMP": '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  "LINK": '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  "GALA": '0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA',
  "LDO": '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32',
  "KNC": '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202',
  "MATIC": '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  "MKR": '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
  "NEAR": '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4',
  "SHIB": '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  "SAND": '0x3845badAde8e6dFF049820680d1F14bD3903a5d0',
  "stETH": '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  "THETA": '0x3883f5e181fccaF8410FA61e12b59BAd963fb645',
  "UNI": '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  "VERSE": '0x249cA82617eC3DfB2589c4c17ab7EC9765350a18',
  "vETH": '0x4Bc3263Eb5bb2Ef7Ad9aB6FB68be80E43b43801F',
  "WBTC": '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  "wstETH": '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
}

export const ADDRESS_MAP_AVALANCHE: { [symbol: string]: string } = {
  'AVAX': '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
  'WAVAX': '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
}


const PriceChart = ({ groupSymbol, networkId }) => {
    const webviewRef = useRef<WebView>(null);
    // const [tokenInfo, setTokenInfo] = useState(['ethereum', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'])
    // let chain = 'ethereum'
    let address = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    // console.log('groupSymbol: %s', groupSymbol)
    let chain = networkId.toString().substring( 0, networkId.indexOf("-"))
    chain == 
    'custom' && groupSymbol.toLowerCase() == 'avax' ? chain = 'avalanche'
    : 'custom' && (groupSymbol.toLowerCase() == 'soul' || groupSymbol.toLowerCase() == 'aura') ? chain = 'fantom'
    // if not fantom, then assume ethereum
    : chain != 'fantom' ? chain = 'ethereum' : chain = networkId.toLowerCase()
    // console.log('chain: %s', chain)
    // console.log('address: %s', address)
    // const chain = groupSymbol
   
    if (chain == 'fantom') { 
      address = ADDRESS_MAP_FANTOM[groupSymbol]
    } else if (chain == 'avalanche') {
      address = ADDRESS_MAP_AVALANCHE[groupSymbol]
    } else {
      address = ADDRESS_MAP_ETHEREUM[groupSymbol]
    }

    return( 
        <View
        style={{
          flex: 1,
          position: 'relative',
          backgroundColor: 'black',
        }}>
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
          javaScriptEnabled
        />
      </View>
        // 'https://www.notion.so/0xbuns/Embeds-a09bd09539474259ae99cba10e4819b3#cf1f781ebbce466da9c6594b636fe77c'
        )
}

export default PriceChart