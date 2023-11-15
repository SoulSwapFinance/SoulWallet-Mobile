import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DAppInfo, DAPPCategory } from 'types/browser'
import { UserInfo, TokenInfo } from 'types/api'
import { TokenConfig } from 'types/tokenConfig'

const _baseQuery = fetchBaseQuery({ baseUrl: 'https://static-data.subwallet.app' });
const baseQuery = fetchBaseQuery({ baseUrl: 'https://api.soulswap.finance' });
// const baseQuery = fetchBaseQuery({ baseUrl: 'https://raw.githubusercontent.com/SoulSwapFinance/SoulWallet-Static-Content/main/data' });

export const browserDAPPs = createApi({
  reducerPath: 'dapps',
  baseQuery: _baseQuery,
  endpoints: builder => ({
    getDAPPs: builder.query<DAppInfo[], undefined>({
      query: () => 'dapps/list.json',
    }),
    getDAPPCategories: builder.query<DAPPCategory[], undefined>({
      query: () => 'categories/list.json',
    }),
  }),
});

export const tokensInfo = createApi({
  reducerPath: 'tokensInfo',
  baseQuery,
  endpoints: builder => ({
    getTokensInfo: builder.query<TokenInfo, undefined>({
      query: () => `tokenInfo`,
    }),
  }),
});

export const tokenConfig = createApi({
  reducerPath: 'tokenConfig',
  baseQuery: _baseQuery,
  endpoints: builder => ({
    getTokenConfig: builder.query<TokenConfig, undefined>({
      query: () => 'tokens/config.json',
    }),
  }),
});

export const { useGetDAPPsQuery, useGetDAPPCategoriesQuery } = browserDAPPs;
export const { useGetTokensInfoQuery } = tokensInfo;
export const { useGetTokenConfigQuery } = tokenConfig;