import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { COIN_BASE_URL, COIN_HOST_URL, COIN_HOST_KEY, COIN_REDUCER_PATH} from '../components/constant';


const cryptoApiHeaders = {
    'x-rapidapi-host': COIN_HOST_URL,
    'x-rapidapi-key': COIN_HOST_KEY
}

const baseUrl = COIN_BASE_URL;
const createRequest = (url) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: COIN_REDUCER_PATH,
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinID) => createRequest(`/coin/${coinID}`),
        }),
        getCryptoHistory: builder.query({
            query: (arg) =>  createRequest(`/coin/${arg.coinid}/history/${arg.period}`),
        })
        
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
}  = cryptoApi;

