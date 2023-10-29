import { ChainId } from "./chains"

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