import React, { useState } from 'react'
import { StyleProp, View } from 'react-native'
import Text from '../components/Text'
import { FontSemiBold } from 'styles/sharedStyles'
import { Number } from 'components/Design'
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

// const getVotingPower = async () => {
//   // Gets: API Data from Discourse Forum
//   const BASE_API_URL = "https://api.soulswap.finance"
//   const res = await fetch(`${BASE_API_URL}/users/${'0xFd63Bf84471Bc55DD9A83fdFA293CCBD27e1F4C8'}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Referrer-Policy': 'no-referrer',
//     },
//   })
//   const json = await res.json()
//   const votingPower = await json.votingPower
//   // console.log('votingPower: %s', votingPower)

//   return votingPower
// }

// UI NOTE: Shows your total balance.
export const BalancesVisibility = ({ value, symbol, startWithSymbol = true, subFloatNumber = false }: Props) => {
  const currentAccount = useSelector((state: RootState) => state.accountState.currentAccount);
  
  const isShowBalance = true // useSelector((state: RootState) => state.settings.isShowBalance);
  const theme = useSoulWalletTheme().swThemes
  // const [powerStatus, setPowerStatus] = useState(0)
  // const [votingPower, setVotingPower] = useState('0')

  // const handlePower = (newAmount) => {
  //   if (powerStatus === 0) {
  //     setPowerStatus(2)
  //     return setVotingPower(newAmount)
  //   } else {
  //     setPowerStatus(2)
  //     return votingPower
  //   }
  // }
  
  // const handleSetVotingPower = () => {
    const { userInfo_FTM } = useUserInfo_FTM(currentAccount?.address)
    const { userInfo_AVAX } = useUserInfo_AVAX(currentAccount?.address)
    // const ftmBalance = userInfo_FTM.votingPower // userTokenInfo?.balance.valueOf()[0]
    // const avaxBalance = userInfo_AVAX.votingPower // userTokenInfo?.balance.valueOf()[0]
    // @ts-ignore
    // const _votingPower = userInfo_FTM.votingPower + userInfo_AVAX.votingPower
    // const votingPower_raw = new BigN(userInfo_FTM.votingPower + userInfo_AVAX.votingPower).toNumber().toFixed(0)
    const votingPower = new BigN(userInfo_FTM.votingPower + userInfo_AVAX.votingPower).toNumber().toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

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
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 12,
            marginTop: 4,
            marginBottom: 4,
          }}
        >
          Aura Balance: {votingPower}
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
        </Text>

    </View>
  );
};
