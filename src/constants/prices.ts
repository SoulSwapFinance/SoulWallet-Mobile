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

export const SOUL_AVAX_SLUG = 'custom-custom-EVM-avalanchec-chain-43114-ERC20-SOUL-0x11d6DD25c1695764e64F439E32cc7746f3945543'