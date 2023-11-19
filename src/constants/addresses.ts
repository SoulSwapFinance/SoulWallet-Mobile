import { ChainId } from "./chains"

export const ADDRESS_CHAIN_MAP: { [symbol: string]: [string, string] } = {
    'ETH': ['ethereum', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
    'WETH': ['ethereum', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
    'WAVAX': ['avalanche', '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'],
    'AVAX': ['avalanche', '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'],
    'FTM': ['ethereum', '0x4E15361FD6b4BB609Fa63C81A2be19d873717870'],
    'WFTM': ['ethereum', '0x4E15361FD6b4BB609Fa63C81A2be19d873717870'],
    'SOUL': ['fantom', '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07'],
    'AURA': ['fantom', '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07'],
    '1INCH': ['ethereum', '0x111111111117dC0aa78b770fA6A738034120C302'],
    "APE": ['ethereum', '0x4d224452801ACEd8B2F0aebE155379bb5D594381'],
    'BAT': ['ethereum', '0x0D8775F648430679A709E98d2b0Cb6250d2887EF'],
    'BUSD': ['ethereum', '0x7B4B0B9b024109D182dCF3831222fbdA81369423'],
    'BNB': ['ethereum', '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'],
    'CHZ': ['ethereum', '0x3506424F91fD33084466F402d5D97f05F8e3b4AF'],
    'CRO': ['ethereum', '0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b'],
    'DAI': ['ethereum', '0x6B175474E89094C44Da98b954EedeAC495271d0F'],
    'DPR': ['ethereum', '0xf3AE5d769e153Ef72b4e3591aC004E89F48107a1'],
    'ENJ': ['ethereum', '0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c'],
    'ENS': ['ethereum', '0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72'],
    "COMP": ['ethereum', '0xc00e94Cb662C3520282E6f5717214004A7f26888'],
    "LINK": ['ethereum', '0x514910771AF9Ca656af840dff83E8264EcF986CA'],
    "GALA": ['ethereum', '0x15D4c048F83bd7e37d49eA4C83a07267Ec4203dA'],
    "LDO": ['ethereum', '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32'],
    "KNC": ['ethereum', '0xdefa4e8a7bcba345f687a2f1456f5edd9ce97202'],
    "MATIC": ['ethereum', '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0'],
    "MKR": ['ethereum', '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'],
    "NEAR": ['ethereum', '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4'],
    "SHIB": ['ethereum', '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE'],
    "SAND": ['ethereum', '0x3845badAde8e6dFF049820680d1F14bD3903a5d0'],
    "stETH": ['ethereum', '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84'],
    "THETA": ['ethereum', '0x3883f5e181fccaF8410FA61e12b59BAd963fb645'],
    "UNI": ['ethereum', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'],
    "VERSE": ['ethereum', '0x249cA82617eC3DfB2589c4c17ab7EC9765350a18'],
    "vETH": ['ethereum', '0x4Bc3263Eb5bb2Ef7Ad9aB6FB68be80E43b43801F'],
    "WBTC": ['ethereum', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'],
    "wstETH": ['ethereum', '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0'],
  }
  
export const SOUL_ADDRESS: { [chainId in ChainId]: string } = {
    [ChainId.ETHEREUM]: '0x34862060EFF6DA2AF04D382C209a433279377d16',
    [ChainId.TELOS]: '0xef9777827a3581b64f5c7CB8954ccaE3cc2c46C0',
    [ChainId.BSC]: '',
    [ChainId.FANTOM]: '0xe2fb177009FF39F52C0134E8007FA0e4BaAcBd07',
    [ChainId.AVALANCHE]: '0x11d6DD25c1695764e64F439E32cc7746f3945543',
    [ChainId.MATIC]: '',
    [ChainId.MOONRIVER]: '',
    [ChainId.ARBITRUM]: '',
}

export const AURA_ADDRESS: { [chainId in ChainId]: string } = {
    [ChainId.ETHEREUM]: '',
    [ChainId.TELOS]: '',
    [ChainId.BSC]: '',
    [ChainId.FANTOM]: '0xec3F962238cC6D45aEc0f97D0f150e221Ef3C42C',
    [ChainId.AVALANCHE]: '0x268D3D63088821C17c59860D6B9476680a4843d2', // V2
    [ChainId.MATIC]: '',
    [ChainId.MOONRIVER]: '',
    [ChainId.ARBITRUM]: '',
}