import { useCallback, useState } from "react"

export const getInfo = (tokenSlug) => {
    const [delay, setDelay] = useState(1_000)
    const [price, setTokenPrice] = useState('0.001')
    const [twitterName, setTwitterName] = useState('@twitter')
    const setPrice = useCallback(async() => { 
      let response = await fetch(`https://api.coingecko.com/api/v3/coins/${tokenSlug.toLowerCase()}`, {
          method: 'GET'
      })
      const data = await response.json()
      // console.log('tokenInfo: %s', await data)
      let _price = await data.market_data.current_price.usd.toString()
      let _twitterName = await data.links.twitter_screen_name.toString()
      // console.log('price: %s', _price)
      // console.log('twitter: %s', _twitterName)
      await setTokenPrice(_price)
      await setTwitterName(_twitterName)

      await setTokenPrice(await data.json())
      await setDelay(60_000 * 5) // sets: 5mins
      // console.log('delay: %s minutes', delay / 60_000)
      // console.log('tokenPrice', price)
    }, [price, setTokenPrice, delay, setDelay, twitterName, setTwitterName])
  
    // sets: soul price every 15seconds
    setTimeout(() => {
      setPrice()
    }, delay)

  return (
    [
      price, 
    ]
  )
}