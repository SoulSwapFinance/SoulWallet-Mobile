import { useCallback, useState } from "react"

export const getPrice = (symbol) => {
    const [delay, setDelay] = useState(1_000)
    const [price, setTokenPrice] = useState('0.001')
    const setPrice = useCallback(async() => { 
        let data = await fetch(`https://api.soulswap.finance/price/${symbol.toLowerCase()}`, {
            method: 'GET'
        })

        await setTokenPrice(await data.json())
        await setDelay(60_000 * 5) // sets: 5mins
        // console.log('delay: %s minutes', delay / 60_000)
        // console.log('tokenPrice', price)
      }, [price, setTokenPrice, delay, setDelay])
    
      // sets: soul price every 15seconds
      setTimeout(() => {
        setPrice()
      }, delay)

  return (
    price
  )
}

// export const SOUL_AVAX_SLUG = 'custom-avalanche-ERC20-SOUL-0x11d6DD25c1695764e64F439E32cc7746f3945543'
// export const SOUL_FTM_SLUG = 'custom-fantom-ERC20-SOUL-0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07'
// export const AURA_FTM_SLUG = 'custom-fantom-ERC20-AURA-0x91Dd51634f280DB77dA5D8c383a9de1e72224C4e'