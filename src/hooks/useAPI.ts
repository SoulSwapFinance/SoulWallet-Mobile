import { SOUL_ADDRESS } from 'constants/addresses'
import { ChainId } from 'constants/chains'
import { useEffect, useState } from 'react'
// import { useActiveWeb3React } from 'services/web3'
// import { useActiveWeb3React } from 'services/web3'

type T = Record<string, string>

// function getBaseUrl() {
//   const { chainId } = useActiveWeb3React()
//   let URL
//   chainId == 250 ?
//   URL = 'https://api.soulswap.finance' : URL = 'https://avax-api.soulswap.finance'
// }

const BASE_URL = 'https://api.soulswap.finance'
// const BASE_GAS_URL = `https://ethapi.openocean.finance/v2` 

// √ pages/exchange/aggregator
// export function useGasPrice(): { status: string; gasPrice: T } {
//     const { chainId } = useActiveWeb3React()
//     const [status, setStatus] = useState<string>('idle')
//     const [gasPrice, setGasPrice] = useState<T>(
//      {
//         standard: '',
//         fast: '',
//         instant: ''
//      }
//     )
  
//     useEffect(() => {
//       const fetchData = async () => {
//         setStatus('fetching')
//         const response = await fetch(`${BASE_GAS_URL}/${chainId}/gas-price`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Referrer-Policy': 'no-referrer',
//           },
//         })
//         const json = await response.json()
//         // console.log('price:%s', json)
//         setGasPrice(json as T)
//         setStatus('fetched')
//       }
//       if ([ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId)) 
//       fetchData()
//     }, [])
  
//     return { status, gasPrice }
// }

// unused
// export function useSwapQuote(inputAmount, fromAddress, toAddress): { status: string; swapQuote: T } {
//     const { chainId } = useActiveWeb3React()
//     const [status, setStatus] = useState<string>('idle')
//     const [swapQuote, setSwapQuote] = useState<T>(
//      {
//       infoAddress: "",
//       inputAmount: "1",
//       fromAddress: "",
//       toAddress: "",
//       SoulAmountOut: "",
//       SpookyAmountOut: "",
//       SpiritAmountOut: "",
//       OptimalDex: "",
//      }
//     )
  
//     useEffect(() => {
//       const fetchData = async () => {
//         setStatus('fetching')
//         const response = await fetch(`${BASE_URL}/aggregator/${inputAmount}/${fromAddress}/${toAddress}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Referrer-Policy': 'no-referrer',
//           },
//         })
//         const json = await response.json()
//         // console.log('price:%s', json)
//         setSwapQuote(json as T)
//         setStatus('fetched')
//       }
//       if ([ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId)) 
//       fetchData()
//     }, [])
  
//     return { status, swapQuote }
// }

export function usePriceUSD(tokenAddress, chainId): { status: string; price: T } {
    const [status, setStatus] = useState<string>('idle')
    const [price, setPrice] = useState<T>()
    // const URL = getBaseUrl()
    const URL = chainId == ChainId.FANTOM ? BASE_URL : `https://avax-api.soulswap.finance`
  
    useEffect(() => {
      const fetchData = async () => {
        setStatus('fetching')
        const response = await fetch(`${URL}/priceusd/${tokenAddress}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer',
          },
        })
        const json = await response.json()
        // console.log('price:%s', json)
        setPrice(json as T)
        setStatus('fetched')
      }
      if ([ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId)) 
      fetchData()
    }, [])
  
    return { status, price }
}



export function useTokenInfo(tokenAddress, chainId): { status: string; tokenInfo: T } {
    const [status, setStatus] = useState<string>('idle')
        const URL = chainId == ChainId.FANTOM ? BASE_URL : `https://avax-api.soulswap.finance`

    const [tokenInfo, setTokenInfo] = useState<T>({
        name: '',
        symbol: '',
        price: '0',
        luxorTreasuryBalance: '0',
        decimals: '18',
        supply: '0',
        mcap: '0',
        image: ''
    })  
    useEffect(() => {
      const fetchData = async () => {
        setStatus('fetching')
        const response = await fetch(`${URL}/tokens/${tokenAddress}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer',
          },
        })
        const json = await response.json()
        setTokenInfo(json as T)
        setStatus('fetched')
      }
      if ([ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId)) 
      fetchData()
    }, [])
  
    return { status, tokenInfo }
}

// export function useUserInfo(account, chainId): { status: string; userInfo: T } {
//     const [status, setStatus] = useState<string>('idle')
//     const URL = chainId == ChainId.FANTOM ? BASE_URL : `https://avax-api.soulswap.finance`
//     const [userInfo, setInfo] = useState<T>({
//         address: '',
//         nativeBalance: '0',
//         votingPower: '0',
//         protocolOwnership: '0',
//         stakedBalance: '0'
//     })  
//     useEffect(() => {
//       const fetchData = async () => {
//         setStatus('fetching')
//         const response = await fetch(`${URL}/users/${account}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'Referrer-Policy': 'no-referrer',
//           },
//         })
//         const json = await response.json()
//         setInfo(json as T)
//         setStatus('fetched')
//       }
//       if ([ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId)) 
//       fetchData()
//     }, [])
  
//     return { status, userInfo }
// }

export function useUserInfo_FTM(account): { status: string; userInfo_FTM: T } {
    const chainId = 250
    const [status, setStatus] = useState<string>('idle')
    // const URL = chainId == ChainId.FANTOM ? BASE_URL : `https://avax-api.soulswap.finance`
    const URL = 'https://api.soulswap.finance'
    const [dataFetched, setFetchedData] = useState(false)
    const [userInfo_FTM, setInfo] = useState<T>({
        address: '',
        nativeBalance: '0',
        votingPower: '0',
        protocolOwnership: '0',
        stakedBalance: '0'
    })  
    useEffect(() => {
      const fetchData = async () => {
        setStatus('fetching')
        const response = await fetch(`${URL}/users/${account}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer',
          },
        })
        const json = await response.json()
        setFetchedData(true)
        setInfo(json as T)
        setStatus('fetched')
      }
      if ([ChainId.FANTOM].includes(chainId) && !dataFetched)
      fetchData()
    }, [])
  
    return { status, userInfo_FTM }
}

export function useUserInfo_AVAX(account): { status: string; userInfo_AVAX: T } {
    const chainId = 43114
    const [status, setStatus] = useState<string>('idle')
    const [dataFetched, setFetchedData] = useState(false)

    const URL = `https://avax-api.soulswap.finance`
    const [userInfo_AVAX, setInfo] = useState<T>({
        address: '',
        nativeBalance: '0',
        votingPower: '0',
        protocolOwnership: '0',
        stakedBalance: '0'
    })  
    useEffect(() => {
      const fetchData = async () => {
        setStatus('fetching')
        const response = await fetch(`${URL}/users/${account}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer',
          },
        })
        const json = await response.json()
        setFetchedData(true)
        setInfo(json as T)
        setStatus('fetched')
      }
      if ([ChainId.AVALANCHE].includes(chainId) && !dataFetched)
      fetchData()
    }, [])
  
    return { status, userInfo_AVAX }
}

// √ features/summoner, features/defarms, features/bonds, etc.
export function useUserTokenInfo(userAddress, tokenAddress, chainId): { status: string; userTokenInfo: T } {
    const [status, setStatus] = useState<string>('idle')
    const URL = chainId == ChainId.FANTOM ? BASE_URL : `https://avax-api.soulswap.finance`

    const [userTokenInfo, setInfo] = useState<T>({
        name: '',
        price: '0',
        value: '0',
        balance: '0',
        decimals: '18',
        supply: '0',
        mcap: '0',
        img:''
    })  
    useEffect(() => {
      const fetchData = async () => {
        setStatus('fetching')
        const response = await fetch(`${URL}/users/${userAddress}/${tokenAddress}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Referrer-Policy': 'no-referrer',
          },
        })
        const json = await response.json()
        setInfo(json as T)
        setStatus('fetched')
      }
      if ([ChainId.AVALANCHE, ChainId.FANTOM].includes(chainId)) 
      fetchData()
    }, [])
  
    return { status, userTokenInfo }
}