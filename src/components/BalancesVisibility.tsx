import React, { useCallback, useContext, useRef, useState } from 'react'
import { StyleProp, View } from 'react-native'
// import Text from 'components/Text'
import { FontSemiBold } from 'styles/sharedStyles'
import { Button, Number } from 'components/Design'
import { SwNumberProps } from 'components/Design/Number'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/index'
// import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { ColorMap } from 'styles/color'
// import { useUserInfo_FTM, useUserInfo_AVAX } from 'hooks/useAPI'
// import { AURA_ADDRESS } from 'constants/addresses'
import { formatNumber } from 'utils/number'
// import { ChainId } from 'constants/chains'
import BigN from 'bignumber.js'
import { useGetBalance } from 'hooks/balance'
import { SOUL_AVAX_SLUG, SOUL_FTM_SLUG, getPrice } from 'constants/prices'

type Props = {
  value: SwNumberProps['value'];
  symbol?: string;
  startWithSymbol?: boolean;
  subFloatNumber?: boolean;
};

const wrapperStyle: StyleProp<any> = {
  height: 46,
  backgroundColor: ColorMap.backgroundSecondary,
  borderLeftWidth: 8,
  borderRightWidth: 8,
  borderRadius: 12,
  borderColor: ColorMap.lightPurple,
  paddingLeft: 12,
  paddingRight: 12,
  margin: 8,
};

// const getVotingPower = (useCallback( => {
//   // Gets: API Data from Discourse Forum
//   const BASE_API_URL = "https://api.soulswap.finance"
//   try {
//   const res = await fetch(`${BASE_API_URL}/users/${'0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8'}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Referrer-Policy': 'no-referrer',
//     },
//   })
//   const json = await res.json()
//   const votingPower = json.votingPower
//   console.log('votingPower: %s', votingPower)

//   return votingPower
// } catch (error) {
//   console.log(error)
// }
// }, [votingPower])

const getCustomValue = (userAddress) => {
  const [total, setTotal] = useState(new BigN(0))
  
  // const chain = ['fantom', 'avax']
  const tokens = [
    {
      chain: 'fantom',
      symbol: 'SOUL',
      decimals: 18,
      slug: SOUL_FTM_SLUG
    },
    {
      chain: 'avalanche',
      symbol: 'SOUL',
      decimals: 18,
      slug: SOUL_AVAX_SLUG
    },
  ]
  // console.log('tokens: %s', tokens)

// const getTotal = useCallback((userAddress) => {
  let balancesValues = []
  let _total = useRef(new BigN(0))
  let totalValue = new BigN(0)

  for (let i = 0; i < tokens.length; i++) {
  // let totalValue = useRef(new BigN(0))
  const { tokenBalance } = useGetBalance(tokens[i].chain, userAddress, tokens[i].slug)
  const tokenPrice = getPrice(tokens[i].symbol)
  const price = new BigN(tokenPrice)
  const balance = new BigN(tokenBalance.value).div(10 ** tokens[i].decimals)
  balancesValues.push(balance.times(price))
  // console.log('balance: %s', balance.toString())
  // console.log('price: %s', price)
  // console.log('price: %s', price)
  // customValue.current = customValue.current.plus(price.times(balance))
  // new BigN(totalValue?.current.toString()).plus(price.times(balance))
  // totalValue.plus(price.times(balance))
  // console.log('ttlValue: %s', totalValue.toString())
}
for (let i = 0; i < balancesValues.length; i++) {
  // totalValue = balancesValues[i].plus(totalValue)
  // console.log('balVals: %s', balancesValues[i])
  
  // setTotal(new BigN())
  //   getTotal(userAddress)
  // _total.current.plus(balancesValues[i])
  // totalValue = totalValue.plus(balancesValues[i])
  _total.current = _total.current.plus(balancesValues[i])
}
setTimeout(() => {
  // setTotal(totalValue.plus(balancesValues[0]))
  // setInterval(
    // () => {
      totalValue = _total.current // .plus(balancesValues[i])
      setTotal(totalValue)
    // }
  // )
  // setTotal(totalValue)
}, 15000) // 30s

  return total
}

// UI NOTE: Shows your total balance.
export const BalancesVisibility = ({ value, symbol, startWithSymbol = true, subFloatNumber = false }: Props) => {
  const [customValue, setCustomValue] = useState(new BigN(0))
  // let customValue = useRef(new BigN(0
  // const [votingPower, setVotingPower] = useState('0')
  // let votingPower = '0'
  
  // const refreshVotingPower = useCallback(async () => {
  //     const BASE_API_URL = "https://api.soulswap.finance"
  
  //     const res = await fetch(`${BASE_API_URL}/users/${'0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8'}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Referrer-Policy': 'no-referrer',
  //           },
  //         })
  //         const json = await res.json()
  //         const _votingPower = json.votingPower
  //         console.log('votingPower: %s', _votingPower)
        
  //         setVotingPower(_votingPower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  // }, [votingPower], );
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  
  const totalValue = getCustomValue(currentAccount.address)
  // console.log('totalValue: %s', totalValue?.toString())


// setTimeout(async () => {
//   // await getCustomValue()
//   const value = await getCustomValue(currentAccount.address, tokens)
//   setCustomValue(value)
// }, 10_000) // 30s

  // // const auraValue = useGetBalance(chain, currentAccount.address, tokenSlug).tokenBalance

  // const auraValue = new BigN(tokenBalance.value).div(10**18).toFixed(0)
  // // const votingPower = auraValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  // const isPremium = new BigN(auraValue).gte('1000000')
  return (
    <View 
      style={wrapperStyle}
    >
        <Number
          value={
            // value
            new BigN(value).plus(new BigN(totalValue))
          }
          decimal={0}
          prefix={startWithSymbol ? (symbol ? symbol : '$') : undefined}
          suffix={!startWithSymbol ? (symbol ? symbol : '$') : undefined}
          size={38}
          textStyle={{ ...FontSemiBold, lineHeight: 20, paddingTop: 24 }}
          subFloatNumber={subFloatNumber}
          decimalOpacity={0.45}
        />
        {/* <Text
          style={{
            color: '#FFFFFF',
            fontSize: 12,
            marginTop: 4,
            marginBottom: 4,
          }}
        > */}
          {/* Status: {isPremium ? 'Premium' : 'Basic'} */}
        {/* <Number
          value={value}
          decimal={0}
          prefix={startWithSymbol ? (symbol ? symbol : '$') : undefined}
          suffix={!startWithSymbol ? (symbol ? symbol : '$') : undefined}
          size={12}
          textStyle={{ ...FontSemiBold, lineHeight: -24, paddingTop: 0 }}
          subFloatNumber={subFloatNumber}
          decimalOpacity={0.45}
        /> */}
        {/* </Text> */}
    </View>
  );
};
