import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '177d42a19fmshac5d3ce80c76a32p1318b0jsn785690e15d62'
}

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news";

const createRequest = (url) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
            query: (paramType) => createRequest(`/search?q=${paramType.category}&safeSearch=off&textFormat=Raw&freshness=Day&count=${paramType.count}`),
        })
    })
});

export const {
    useGetCryptosNewsQuery,
}  = cryptoNewsApi;