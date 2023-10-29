import React, { useCallback, useContext, useState } from 'react'
import { StyleProp, View } from 'react-native'
import Text from '../components/Text'
import { FontSemiBold } from 'styles/sharedStyles'
import { Button, Number } from 'components/Design'
import { SwNumberProps } from 'components/Design/Number'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/index'
import { useSoulWalletTheme } from 'hooks/useSoulWalletTheme'
import { ColorMap } from 'styles/color'
import { useUserInfo_FTM, useUserInfo_AVAX } from 'hooks/useAPI'
// import { AURA_ADDRESS } from 'constants/addresses'
// import { formatNumber } from 'utils/number'
// import { ChainId } from 'constants/chains'
import BigN from 'bignumber.js'
import { useGetBalance } from 'hooks/balance'

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


// UI NOTE: Shows your total balance.
export const BalancesVisibility = ({ value, symbol, startWithSymbol = true, subFloatNumber = false }: Props) => {
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
  
  const isShowBalance = true // useSelector((state: RootState) => state.settings.isShowBalance);
  const theme = useSoulWalletTheme().swThemes

  // const chain = ['fantom', 'avax']
  // const tokenSlug = 'custom-fantom-ERC20-AURA-0x91Dd51634f280DB77dA5D8c383a9de1e72224C4e'
  // // const auraValue = useGetBalance(chain, currentAccount.address, tokenSlug).tokenBalance
  // const { tokenBalance } = useGetBalance(chain[0], currentAccount.address, tokenSlug);
  // const auraValue = new BigN(tokenBalance.value).div(10**18).toFixed(0)
  // // const votingPower = auraValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  // const isPremium = new BigN(auraValue).gte('1000000')
  return (
    <View 
      style={wrapperStyle}
    >
        <Number
          value={value}
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
